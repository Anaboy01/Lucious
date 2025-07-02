
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, X } from "lucide-react"



const ProductSearch = ({ searchTerm, onSearchChange, onClearSearch }) => {
  return (
    <div className="relative">
      <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      <Input
        placeholder="Search products..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="pl-10 pr-10"
      />
      {searchTerm && (
        <Button
          variant="ghost"
          size="sm"
          onClick={onClearSearch}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0 hover:bg-gray-100"
        >
          <X className="w-4 h-4" />
        </Button>
      )}
    </div>
  )
}

export default ProductSearch