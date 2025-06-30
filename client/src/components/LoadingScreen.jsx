import { useState, useEffect } from "react"
import { Heart, Sparkles } from "lucide-react"



const LoadingScreen = ({ onComplete, duration = 5000 }) => {
   const [progress, setProgress] = useState(0)
  const [currentText, setCurrentText] = useState(0)
  const [isComplete, setIsComplete] = useState(false)

  const loadingTexts = [
    "Preparing your intimate experience...",
    "Curating the perfect collection...",
    "Unveiling elegance and beauty...",
    "Almost ready to enchant you...",
  ]

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + 100 / (duration / 50)
        if (newProgress >= 100) {
          clearInterval(progressInterval)
          setIsComplete(true)
          setTimeout(() => onComplete?.(), 500)
          return 100
        }
        return newProgress
      })
    }, 50)

    const textInterval = setInterval(() => {
      setCurrentText((prev) => (prev + 1) % loadingTexts.length)
    }, duration / 4)

    return () => {
      clearInterval(progressInterval)
      clearInterval(textInterval)
    }
  }, [duration, onComplete])

  return (
    <div
      className={`fixed inset-0 z-50 bg-gradient-to-br from-pink-50 via-rose-50 to-red-50 flex items-center justify-center overflow-hidden transition-opacity duration-500 ${isComplete ? "opacity-0 pointer-events-none" : "opacity-100"}`}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Floating Sparkles */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          >
            <Sparkles
              className="w-3 h-3 text-pink-300/40 fill-pink-300/40"
              style={{
                transform: `rotate(${Math.random() * 360}deg) scale(${0.5 + Math.random() * 0.5})`,
              }}
            />
          </div>
        ))}

        {/* Elegant Curves */}
        <div className="absolute inset-0">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <linearGradient id="curve1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgba(255, 192, 203, 0.1)" />
                <stop offset="100%" stopColor="rgba(220, 20, 60, 0.1)" />
              </linearGradient>
              <linearGradient id="curve2" x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="rgba(255, 182, 193, 0.1)" />
                <stop offset="100%" stopColor="rgba(199, 21, 133, 0.1)" />
              </linearGradient>
            </defs>
            <path
              d="M0,50 Q25,20 50,50 T100,30 L100,100 L0,100 Z"
              fill="url(#curve1)"
              className="animate-pulse"
              style={{ animationDuration: "4s" }}
            />
            <path
              d="M0,70 Q25,40 50,70 T100,50 L100,100 L0,100 Z"
              fill="url(#curve2)"
              className="animate-pulse"
              style={{ animationDuration: "6s", animationDelay: "1s" }}
            />
          </svg>
        </div>
      </div>

      {/* Main Loading Content */}
      <div className="relative z-10 text-center max-w-md mx-auto px-6">
        {/* Logo with Elegant Animation */}
        <div className="mb-12 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-pink-400/30 to-red-400/30 rounded-full blur-2xl animate-pulse scale-125" />
          <div className="relative transform hover:scale-105 transition-transform duration-300">
            <img
              src="/logo.png"
              alt="Luscious Lingerie Logo"
              width={220}
              height={110}
              className="object-contain mx-auto"
            />
          </div>
        </div>

        {/* Sophisticated Loading Animation */}
        <div className="mb-10 relative">
          <div className="w-32 h-32 mx-auto relative">
            {/* Outer Decorative Ring */}
            <div
              className="absolute inset-0 rounded-full border-2 border-pink-200/50"
              style={{
                borderTopColor: "rgba(255, 192, 203, 0.8)",
                borderRightColor: "rgba(220, 20, 60, 0.6)",
                animation: "elegantSpin 4s ease-in-out infinite",
              }}
            />
            {/* Middle Ring */}
            <div
              className="absolute inset-4 rounded-full border-2 border-red-200/50"
              style={{
                borderBottomColor: "rgba(199, 21, 133, 0.8)",
                borderLeftColor: "rgba(255, 182, 193, 0.6)",
                animation: "elegantSpin 3s ease-in-out infinite reverse",
              }}
            />
            {/* Inner Glow */}
            <div className="absolute inset-8 rounded-full bg-gradient-to-r from-pink-100/50 to-red-100/50 animate-pulse" />
            {/* Center Heart */}
            <div className="absolute inset-0 flex items-center justify-center">
              <Heart className="w-8 h-8 text-pink-500 fill-pink-500 animate-pulse" />
            </div>
          </div>
        </div>

        {/* Elegant Progress Bar */}
        <div className="mb-8">
          <div className="w-full bg-gradient-to-r from-pink-100 to-red-100 rounded-full h-3 overflow-hidden shadow-inner">
            <div
              className="h-full bg-gradient-to-r from-pink-500 via-red-400 to-red-600 rounded-full transition-all duration-300 ease-out relative"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-pulse" />
              <div className="absolute right-0 top-0 w-2 h-full bg-white/60 rounded-full animate-pulse" />
            </div>
          </div>
          <div className="mt-3 text-sm font-medium text-pink-600 tracking-wide">{Math.round(progress)}% Complete</div>
        </div>

        {/* Dynamic Loading Text */}
        <div className="mb-6 h-8">
          <p
            className="text-lg font-light text-gray-700 transition-all duration-700 ease-in-out italic"
            key={currentText}
            style={{
              animation: "textFlow 1.5s ease-in-out",
            }}
          >
            {loadingTexts[currentText]}
          </p>
        </div>

        {/* Decorative Divider */}
        <div className="flex justify-center items-center space-x-6 text-pink-400 mb-6">
          <div className="w-12 h-px bg-gradient-to-r from-transparent via-pink-400 to-transparent" />
          <Heart className="w-4 h-4 fill-pink-400 animate-pulse" />
          <div className="w-12 h-px bg-gradient-to-l from-transparent via-pink-400 to-transparent" />
        </div>

        {/* Brand Essence */}
        <div className="text-center">
          <p className="text-xs text-gray-500 font-light tracking-widest uppercase">Where Elegance Meets Desire</p>
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes elegantSpin {
          0% {
            transform: rotate(0deg) scale(1);
            opacity: 0.7;
          }
          50% {
            transform: rotate(180deg) scale(1.05);
            opacity: 1;
          }
          100% {
            transform: rotate(360deg) scale(1);
            opacity: 0.7;
          }
        }
        
        @keyframes textFlow {
          0% {
            opacity: 0;
            transform: translateY(15px);
          }
          20% {
            opacity: 1;
            transform: translateY(0);
          }
          80% {
            opacity: 1;
            transform: translateY(0);
          }
          100% {
            opacity: 0;
            transform: translateY(-15px);
          }
        }
      `}</style>
    </div>
  )

}

export default LoadingScreen