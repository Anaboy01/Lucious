import React, { useEffect, useRef, useState } from 'react';

const CameraColorPicker = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [color, setColor] = useState('#FFFFFF');
  const [isVideoReady, setIsVideoReady] = useState(false);

  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error('Camera access error:', err);
      }
    };

    startCamera();
  }, []);

  const handleLoadedMetadata = () => {
    setIsVideoReady(true);
  };

  const handleCapture = () => {
    if (!isVideoReady) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Center point
    const centerX = Math.floor(canvas.width / 2);
    const centerY = Math.floor(canvas.height / 2);

    const [r, g, b] = ctx.getImageData(centerX, centerY, 1, 1).data;
    const hex = `#${[r, g, b].map(c => c.toString(16).padStart(2, '0')).join('').toUpperCase()}`;

    setColor(hex);
  };

  return (
    <div className="flex flex-col items-center gap-4 relative w-full max-w-[400px]">
      <div className="relative w-full">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          onLoadedMetadata={handleLoadedMetadata}
          className="w-full rounded-md"
        />
        {/* Capture point (center dot) */}
        <div className="absolute left-1/2 top-1/2 w-4 h-4 -translate-x-1/2 -translate-y-1/2 bg-red-500 rounded-full border-2 border-white shadow-md pointer-events-none z-10" />
      </div>

      <canvas ref={canvasRef} style={{ display: 'none' }} />

      <button
        onClick={handleCapture}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Capture Color
      </button>

      <div className="flex items-center gap-2 mt-2">
        <div
          style={{
            width: 40,
            height: 40,
            backgroundColor: color,
            border: '1px solid #ccc',
          }}
        />
        <span className="font-mono text-lg">{color}</span>
      </div>
    </div>
  );
};

export default CameraColorPicker;
