import ProductFilters from "./ProductFilters";
import ProductForm from "./ProductForm";
import ProductTable from "./ProductTable";
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Plus } from "lucide-react"
import { Link } from "react-router-dom"



const ProductsTab = ({
  newProduct,
  setNewProduct,
  editProduct,
  setEditProduct,
  isAddOpen,
  setIsAddOpen,
  isEditOpen,
  setIsEditOpen,
  onSave,
  onEditClick,
  onUpdateSubmit,
  searchTerm,
  setSearchTerm,
  filters,
  setFilters,
  filteredProducts,
  totalProducts,
  getProductStatusVariant,
}) => {
  return (
    <div className="space-y-6">
      <div className="flex items-start flex-col lg:flex-row gap-2 lg:items-center justify-between">
        <h2 className="text-3xl font-bold text-gray-900">Products Management</h2>
        <div className="flex items-start flex-col lg:flex-row gap-2 lg:items-center justify-center">
          <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-pink-500 to-red-800 text-white">
                <Plus className="w-4 h-4 mr-2" />
                Add Product
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] border-pink-300 ring-pink-200 overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Add New Product</DialogTitle>
              </DialogHeader>
              <ProductForm
                product={newProduct}
                setProduct={setNewProduct}
                onSave={onSave}
                onCancel={() => setIsAddOpen(false)}
                isEdit={false}
              />
            </DialogContent>
          </Dialog>
          <Link to="/bulk">
            <Button className="bg-gradient-to-r from-pink-500 to-red-800 text-white">
              <Plus className="w-4 h-4 mr-2" />
              Bulk
            </Button>
          </Link>
        </div>
      </div>

      <ProductFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filters={filters}
        setFilters={setFilters}
        filteredCount={filteredProducts.length}
        totalCount={totalProducts}
      />

      <ProductTable
        products={filteredProducts}
        searchTerm={searchTerm}
        editProduct={editProduct}
        setEditProduct={setEditProduct}
        isEditOpen={isEditOpen}
        setIsEditOpen={setIsEditOpen}
        onEditClick={onEditClick}
        onUpdateSubmit={onUpdateSubmit}
        getProductStatusVariant={getProductStatusVariant}
      />
    </div>
  )
}

export default ProductsTab