import React, { useRef, useEffect, useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

const CameraColorPickerModal = ({ open, onClose, onPickColor }) => {
  const videoRef = useRef(null)
  const canvasRef = useRef(null)
  const [isVideoReady, setIsVideoReady] = useState(false)
  const [liveColor, setLiveColor] = useState("#000000")

  useEffect(() => {
    const startCamera = async () => {
      if (open) {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ video: true })
          if (videoRef.current) {
            videoRef.current.srcObject = stream
          }
        } catch (err) {
          console.error("Camera error:", err)
        }
      }
    }
    startCamera()
  }, [open])

  useEffect(() => {
    let interval
    if (isVideoReady && open) {
      interval = setInterval(() => {
        const video = videoRef.current
        const canvas = canvasRef.current
        if (!video || !canvas) return
        const ctx = canvas.getContext("2d")
        canvas.width = video.videoWidth
        canvas.height = video.videoHeight
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
        const x = Math.floor(canvas.width / 2)
        const y = Math.floor(canvas.height / 2)
        const [r, g, b] = ctx.getImageData(x, y, 1, 1).data
        const hex = `#${[r, g, b].map((c) => c.toString(16).padStart(2, "0")).join("").toUpperCase()}`
        setLiveColor(hex)
      }, 200) // every 200ms
    }

    return () => clearInterval(interval)
  }, [isVideoReady, open])

  const handleLoadedMetadata = () => setIsVideoReady(true)

  const handleCapture = () => {
    onPickColor(liveColor)
    onClose()
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Pick a Color</DialogTitle>
        </DialogHeader>

        <div className="relative w-full">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            onLoadedMetadata={handleLoadedMetadata}
            className="w-full rounded-md"
          />
          <div className="absolute left-1/2 top-1/2 w-4 h-4 -translate-x-1/2 -translate-y-1/2 bg-red-500 rounded-full border-2 border-white shadow-md z-10" />
        </div>

        <canvas ref={canvasRef} style={{ display: "none" }} />

        <div className="mt-4 flex items-center justify-center space-x-4">
          <div
            className="w-10 h-10 rounded-full border shadow"
            style={{ backgroundColor: liveColor }}
          />
          <span className="font-mono">{liveColor}</span>
        </div>

        <div className="flex justify-center mt-4">
          <Button onClick={handleCapture}>Capture Color</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default CameraColorPickerModal
