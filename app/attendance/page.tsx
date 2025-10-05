"use client";

import React, { useCallback, useEffect, useRef, useState } from 'react'
import * as faceapi from 'face-api.js'

const Page = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const [loadingModels, setLoadingModels] = useState(false)
  const [running, setRunning] = useState(false)
  const [message, setMessage] = useState<string>('')

  const stopStream = useCallback(() => {
    const video = videoRef.current
    const stream = video?.srcObject as MediaStream | null
    if (stream) {
      stream.getTracks().forEach(t => t.stop())
    }
    if (video) {
      video.srcObject = null
    }
  }, [])

  useEffect(() => {
    return () => {
      stopStream()
    }
  }, [stopStream])

  const loadModels = useCallback(async () => {
    setLoadingModels(true)
    const LOCAL_URL = '/models'
    const NPM_CDN = 'https://cdn.jsdelivr.net/npm/face-api.js@0.22.2/weights'
    const GH_CDN = 'https://cdn.jsdelivr.net/gh/justadudewhohacks/face-api.js@0.22.2/weights'
    try {
      console.log('[face] loading models from', LOCAL_URL)
      await Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri(LOCAL_URL),
        faceapi.nets.faceLandmark68Net.loadFromUri(LOCAL_URL),
        faceapi.nets.faceRecognitionNet.loadFromUri(LOCAL_URL),
      ])
      console.log('[face] models loaded (local)')
    } catch (e1) {
      console.warn('[face] local models not found, trying npm CDN', e1)
      try {
        await Promise.all([
          faceapi.nets.tinyFaceDetector.loadFromUri(NPM_CDN),
          faceapi.nets.faceLandmark68Net.loadFromUri(NPM_CDN),
          faceapi.nets.faceRecognitionNet.loadFromUri(NPM_CDN),
        ])
        console.log('[face] models loaded (npm CDN)')
      } catch (e2) {
        console.warn('[face] npm CDN failed, trying GitHub CDN', e2)
        await Promise.all([
          faceapi.nets.tinyFaceDetector.loadFromUri(GH_CDN),
          faceapi.nets.faceLandmark68Net.loadFromUri(GH_CDN),
          faceapi.nets.faceRecognitionNet.loadFromUri(GH_CDN),
        ])
        console.log('[face] models loaded (GitHub CDN)')
      }
    } finally {
      setLoadingModels(false)
    }
  }, [])

  const start = useCallback(async () => {
    try {
      setMessage('')
      await loadModels()
      if (!window.isSecureContext) {
        console.warn('[face] insecure context; HTTPS required for camera on mobile')
      }
      console.log('[face] requesting camera...')
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: { ideal: 'user' } }, audio: false })
      console.log('[face] camera started')
      if (!videoRef.current) return
      videoRef.current.srcObject = stream
      await videoRef.current.play()
      setRunning(true)

      const options = new faceapi.TinyFaceDetectorOptions({ inputSize: 224, scoreThreshold: 0.5 })
      console.log('[face] detecting face...')
      let detected = false
      const detectOnce = async () => {
        if (!videoRef.current) return
        const result = await faceapi.detectSingleFace(videoRef.current, options)
          .withFaceLandmarks().withFaceDescriptor()
        if (result) {
          detected = true
          console.log('[face] descriptor length', result.descriptor.length)
          setMessage('Face detected! Attendance marked.')
          stopStream()
          setRunning(false)
        }
        if (!detected) requestAnimationFrame(detectOnce)
      }
      requestAnimationFrame(detectOnce)
    } catch (e) {
      console.error('[face] error', e)
      setMessage('Could not start camera or detect face.')
      stopStream()
      setRunning(false)
    }
  }, [loadModels, stopStream])

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-xl font-bold text-blue-700 mb-4">Attendance</h1>
      <button
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        onClick={start}
        disabled={loadingModels || running}
      >
        {running ? 'Running...' : (loadingModels ? 'Loading models...' : 'Start Face Attendance')}
      </button>
      {message && <div className="mt-3 text-sm text-green-700">{message}</div>}
      <div className="mt-4">
        <video
          ref={videoRef}
          playsInline
          muted
          className="w-full max-w-full h-auto rounded border"
          style={{ transform: 'scaleX(-1)' }}
        />
      </div>
    </div>
  )
}

export default Page