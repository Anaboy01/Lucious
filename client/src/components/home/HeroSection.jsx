import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Heart, Star } from "lucide-react"



const HeroSection = () => {
 return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-24">
      {/* Interactive Background Image with Parallax */}
      <div className="absolute inset-0 w-full h-full" style={{ transform: "translateZ(0)" }}>
        <img
          src="/hero-model.png"
          alt="Elegant woman in wine lingerie"
          fill
          className="w-full h-full object-cover object-center transition-transform duration-1000 ease-out"
        
          style={{ transform: "scale(1.1)" }}
        />
        {/* Dynamic Blur Overlay */}
        <div className="absolute inset-0 backdrop-blur-[1px] bg-black/20 transition-all duration-1000"></div>
      </div>

      {/* Animated Gradient Overlay */}
      <div
        className="absolute inset-0 opacity-80"
        style={{
          background: `
        radial-gradient(circle at 20% 20%, rgba(255, 192, 203, 0.4) 0%, transparent 50%),
        radial-gradient(circle at 80% 80%, rgba(220, 20, 60, 0.5) 0%, transparent 50%),
        linear-gradient(135deg, rgba(255, 0, 144, 0.3) 0%, rgba(199, 21, 133, 0.4) 50%, rgba(139, 0, 139, 0.5) 100%)
      `,
          animation: "gradientShift 8s ease-in-out infinite",
        }}
      ></div>

      {/* Floating Interactive Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Floating Hearts */}
        {[...Array(8)].map((_, i) => (
          <div
            key={`heart-${i}`}
            className="absolute animate-float opacity-20"
            style={{
              left: `${10 + i * 12}%`,
              top: `${20 + (i % 3) * 25}%`,
              animationDelay: `${i * 0.8}s`,
              animationDuration: `${4 + (i % 3)}s`,
            }}
          >
            <Heart className="w-6 h-6 text-pink-300 fill-pink-300/50" style={{ transform: `rotate(${i * 45}deg)` }} />
          </div>
        ))}

        {/* Animated Sparkles */}
        {[...Array(15)].map((_, i) => (
          <div
            key={`sparkle-${i}`}
            className="absolute animate-twinkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          >
            <div
              className="w-2 h-2 bg-white rounded-full opacity-60"
              style={{
                boxShadow: "0 0 6px rgba(255, 255, 255, 0.8)",
              }}
            />
          </div>
        ))}

        {/* Flowing Silk Ribbons */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <linearGradient id="ribbon1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(255, 192, 203, 0.3)" />
              <stop offset="50%" stopColor="rgba(255, 182, 193, 0.2)" />
              <stop offset="100%" stopColor="rgba(220, 20, 60, 0.3)" />
            </linearGradient>
            <linearGradient id="ribbon2" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgba(199, 21, 133, 0.3)" />
              <stop offset="50%" stopColor="rgba(255, 105, 180, 0.2)" />
              <stop offset="100%" stopColor="rgba(255, 192, 203, 0.3)" />
            </linearGradient>
          </defs>
          <path
            d="M0,30 Q25,10 50,30 T100,20 L100,25 Q75,45 50,25 T0,35 Z"
            fill="url(#ribbon1)"
            className="animate-wave"
            style={{ animationDuration: "6s" }}
          />
          <path
            d="M0,70 Q25,90 50,70 T100,80 L100,75 Q75,55 50,75 T0,65 Z"
            fill="url(#ribbon2)"
            className="animate-wave"
            style={{ animationDuration: "8s", animationDelay: "2s" }}
          />
        </svg>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex items-center justify-center min-h-screen py-20">
          <div className="text-center relative z-20 max-w-4xl mx-auto px-4">
            {/* Floating Badge with Hover Effect */}
            <Badge className="inline-flex items-center space-x-2 bg-white/25 backdrop-blur-md rounded-full px-6 py-3 mb-8 border border-white/40 shadow-lg animate-fadeInUp hover:scale-105 hover:bg-white/35 transition-all duration-300 cursor-pointer group">
              <div className="w-2 h-2 bg-pink-300 rounded-full animate-pulse group-hover:bg-pink-400"></div>
              <span className="text-white font-medium group-hover:text-pink-100">New Exclusive Collection</span>
              <div className="w-2 h-2 bg-pink-300 rounded-full animate-pulse group-hover:bg-pink-400"></div>
            </Badge>

            {/* Interactive Main Headline with Text Effects */}
            <div className="relative mb-8">
              <h2
                className="text-5xl lg:text-7xl font-bold text-white leading-tight drop-shadow-lg animate-fadeInUp cursor-default"
                style={{ animationDelay: "0.2s" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.02)"
                  e.currentTarget.style.textShadow = "0 0 30px rgba(255, 192, 203, 0.8)"
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)"
                  e.currentTarget.style.textShadow = "0 4px 6px rgba(0, 0, 0, 0.3)"
                }}
              >
                <span className="inline-block hover:animate-pulse">Unleash</span>{" "}
                <span className="inline-block hover:animate-pulse">Your</span>
                <br />
                <span className="inline-block hover:animate-pulse">Inner</span>{" "}
                <span className="inline-block hover:animate-pulse">Goddess</span>
              </h2>

              {/* Decorative Underline */}
              <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-pink-300 to-transparent animate-pulse"></div>
            </div>

            {/* Enhanced Subheadline */}
            <p
              className="text-xl lg:text-2xl text-pink-100 mb-4 font-light drop-shadow-md animate-fadeInUp hover:text-pink-50 transition-colors duration-300"
              style={{ animationDelay: "0.4s" }}
            >
              <span className="inline-block hover:scale-105 transition-transform duration-200">Seductive.</span>{" "}
              <span className="inline-block hover:scale-105 transition-transform duration-200">Sophisticated.</span>{" "}
              <span className="inline-block hover:scale-105 transition-transform duration-200">Sensational.</span>
            </p>

            <p
              className="text-lg text-pink-200/90 mb-12 max-w-xl mx-auto drop-shadow-sm animate-fadeInUp hover:text-pink-200 transition-colors duration-300"
              style={{ animationDelay: "0.6s" }}
            >
              Discover lingerie that makes you feel absolutely irresistible. Every curve celebrated, every moment
              unforgettable.
            </p>

            {/* Enhanced CTA Buttons with Creative Effects */}
            <div
              className="flex flex-col sm:flex-row gap-6 mb-16 justify-center animate-fadeInUp"
              style={{ animationDelay: "0.8s" }}
            >
              <Button
                className="group relative bg-white text-pink-600 hover:bg-pink-50 px-10 py-4 text-lg font-semibold rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300 overflow-hidden"
                onMouseEnter={(e) => {
                  const ripple = document.createElement("div")
                  ripple.className = "absolute inset-0 bg-gradient-to-r from-pink-400/20 to-red-400/20 animate-ping"
                  e.currentTarget.appendChild(ripple)
                  setTimeout(() => ripple.remove(), 600)
                }}
              >
                <span className="relative z-10 group-hover:text-pink-700 transition-colors duration-200">
                  Shop Seductive Sets
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-pink-500/0 via-pink-500/10 to-pink-500/0 transform -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              </Button>

              <Button
                variant="outline"
                className="group relative border-2 border-white text-white hover:bg-white hover:text-pink-600 px-10 py-4 text-lg font-semibold rounded-full bg-white/10 backdrop-blur-sm transform hover:scale-105 transition-all duration-300 overflow-hidden"
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = "0 0 30px rgba(255, 255, 255, 0.5)"
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
                }}
              >
                <span className="relative z-10">Explore Collections</span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              </Button>
            </div>

            {/* Interactive Feature Pills */}
            <div className="flex flex-wrap gap-4 mb-8 justify-center animate-fadeInUp" style={{ animationDelay: "1s" }}>
              {["Premium Silk & Lace", "Perfect Fit Guarantee", "Discreet Packaging"].map((text, index) => (
                <Badge
                  key={text}
                  variant="secondary"
                  className="bg-white/15 backdrop-blur-md rounded-full px-6 py-3 border border-white/30 shadow-lg hover:bg-white/25 hover:scale-105 hover:border-white/50 transition-all duration-300 cursor-pointer group text-white"
                  style={{ animationDelay: `${1 + index * 0.1}s` }}
                >
                  <span className="group-hover:text-pink-100 transition-colors duration-200">{text}</span>
                </Badge>
              ))}
            </div>

            {/* Enhanced Social Proof with Hover Effects */}
            <div
              className="flex items-center justify-center space-x-8 text-pink-200 animate-fadeInUp"
              style={{ animationDelay: "1.2s" }}
            >
              <div className="text-center group cursor-pointer hover:scale-110 transition-transform duration-300">
                <div className="text-2xl font-bold text-white drop-shadow-md group-hover:text-pink-100 transition-colors duration-200">
                  50K+
                </div>
                <div className="text-sm group-hover:text-pink-100 transition-colors duration-200">Happy Customers</div>
              </div>
              <div className="w-px h-12 bg-pink-300/40"></div>
              <div className="text-center group cursor-pointer hover:scale-110 transition-transform duration-300">
                <div className="flex items-center justify-center mb-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 text-yellow-300 fill-yellow-300 drop-shadow-sm group-hover:scale-110 transition-transform duration-200"
                      style={{ animationDelay: `${i * 0.1}s` }}
                    />
                  ))}
                </div>
                <div className="text-sm group-hover:text-pink-100 transition-colors duration-200">4.9/5 Rating</div>
              </div>
              <div className="w-px h-12 bg-pink-300/40"></div>
              <div className="text-center group cursor-pointer hover:scale-110 transition-transform duration-300">
                <div className="text-2xl font-bold text-white drop-shadow-md group-hover:text-pink-100 transition-colors duration-200">
                  24/7
                </div>
                <div className="text-sm group-hover:text-pink-100 transition-colors duration-200">Support</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Styles for Enhanced Animations */}
      <style jsx>{`
    @keyframes gradientShift {
      0%, 100% { 
        filter: hue-rotate(0deg) brightness(1); 
      }
      50% { 
        filter: hue-rotate(30deg) brightness(1.1); 
      }
    }
    
    @keyframes float {
      0%, 100% { 
        transform: translateY(0px) rotate(0deg); 
        opacity: 0.3;
      }
      50% { 
        transform: translateY(-20px) rotate(180deg); 
        opacity: 0.7;
      }
    }
    
    @keyframes twinkle {
      0%, 100% { 
        opacity: 0.3; 
        transform: scale(0.8);
      }
      50% { 
        opacity: 1; 
        transform: scale(1.2);
      }
    }
    
    @keyframes wave {
      0%, 100% { 
        transform: translateX(0) scaleY(1); 
      }
      50% { 
        transform: translateX(10px) scaleY(1.1); 
      }
    }
    
    .animate-float {
      animation: float 4s ease-in-out infinite;
    }
    
    .animate-twinkle {
      animation: twinkle 2s ease-in-out infinite;
    }
    
    .animate-wave {
      animation: wave 6s ease-in-out infinite;
    }
  `}</style>
    </section>
  )

}

export default HeroSection