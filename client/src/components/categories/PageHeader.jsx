import { Button } from "@/components/ui/button"
import { Heart, ShoppingBag, ArrowLeft } from "lucide-react"
import { Link } from "react-router-dom"


const PageHeader = ({ title, showBackButton = false, backHref = "/" }) => {
  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-pink-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {showBackButton && (
              <Link href={backHref} className="flex items-center space-x-2">
                <ArrowLeft className="w-5 h-5 text-red-700" />
                <span className="text-red-700">Back to Shop</span>
              </Link>
            )}
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-red-800 rounded-full flex items-center justify-center">
                <Heart className="w-4 h-4 text-white fill-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-red-800 bg-clip-text text-transparent">
                {title}
              </h1>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon">
              <Heart className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <ShoppingBag className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default PageHeader