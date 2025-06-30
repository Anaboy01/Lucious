import FeatureCard from "../ui/FeatureCard";

import { Truck, Shield, RotateCcw } from "lucide-react"


const FeaturesSection = () => {
   const features = [
    {
      icon: Truck,
      title: "Free Shipping",
      desc: "Free shipping on orders over ₦200,000",
      gradient: "from-pink-500 to-red-800",
    },
    {
      icon: Shield,
      title: "Secure Shopping",
      desc: "Your privacy and security guaranteed",
      gradient: "from-red-700 to-pink-600",
    },
    {
      icon: RotateCcw,
      title: "Easy Returns",
      desc: "30-day hassle-free returns",
      gradient: "from-pink-600 to-red-700",
    },
  ]

  return (
    <section className="py-16 px-4 animate-fadeInUp" style={{ animationDelay: "2.8s" }}>
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={feature.title} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeaturesSection