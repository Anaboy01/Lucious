import CategoriesSection from "@/components/home/CategoriesSection";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import FeaturesSection from "@/components/home/FeaturesSection";
import FloatingNavbar from "@/components/home/FloatingNavbar";
import Footer from "@/components/home/Footer";
import HeroSection from "@/components/home/HeroSection";
import LoadingScreen from "@/components/LoadingScreen";
import { useState } from "react";

const Home = () => {
  const [isLoading, setIsLoading] = useState(true)

  const handleLoadingComplete = () => {
    setIsLoading(false)
  }

  if (isLoading) {
    return <LoadingScreen onComplete={handleLoadingComplete} duration={4000} />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-red-50 animate-fadeIn">
      <FloatingNavbar />
      <HeroSection />
      <FeaturedProducts />
      <CategoriesSection />
      <FeaturesSection />
     
      <Footer />

      {/* Custom CSS for animations */}
      <style >{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out forwards;
        }

        .animate-fadeInUp {
          opacity: 0;
          animation: fadeInUp 0.8s ease-out forwards;
        }

        .animate-slideUp {
          opacity: 0;
          animation: slideUp 1s ease-out forwards;
        }
      `}</style>
    </div>
  )

}

export default Home
