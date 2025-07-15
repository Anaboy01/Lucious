import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Eye, Edit, Trash2 } from "lucide-react"
import { Link } from "react-router-dom"
import ProductForm from "./ProductForm"


const ProductTable = ({
  products,
  searchTerm,
  editProduct,
  setEditProduct,
  isEditOpen,
  setIsEditOpen,
  onEditClick,
  onUpdateSubmit,
  getProductStatusVariant,
}) => {
 return (
    <Card className="bg-white/70 backdrop-blur-sm border-pink-100">
      <CardContent className="p-6">
        <style jsx>{`
          .line-clamp-2 {
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
        `}</style>
        <div className="overflow-x-auto">
          <Table className="min-w-full">
            <TableHeader>
              <TableRow>
                <TableHead className="min-w-[200px]">Product</TableHead>
                <TableHead className="min-w-[100px]">Category</TableHead>
                <TableHead className="min-w-[80px]">Price</TableHead>
                <TableHead className="min-w-[80px]">Stock</TableHead>
                <TableHead className="min-w-[80px]">Sales</TableHead>
                <TableHead className="min-w-[100px]">Status</TableHead>
                <TableHead className="min-w-[120px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="min-w-[200px]">
                    <div className="flex items-center space-x-3">
                      <img
                        src={product.coverImage || "/placeholder.svg"}
                        alt={product.name}
                        width={40}
                        height={40}
                        className="rounded-lg object-cover flex-shrink-0"
                      />
                      <div className="min-w-0 flex-1">
                        <span className="font-medium text-sm leading-tight break-words line-clamp-2">
                          {product.name}
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="min-w-[100px]">
                    <span className="text-sm break-words">{product.category}</span>
                  </TableCell>
                  <TableCell className="min-w-[80px]">
                    <span className="text-sm font-medium">₦{product.price}</span>
                  </TableCell>
                  <TableCell className="min-w-[80px]">
                    <span className="text-sm">{product.stock}</span>
                  </TableCell>
                  <TableCell className="min-w-[80px]">
                    <span className="text-sm">{product.sales}</span>
                  </TableCell>
                  <TableCell className="min-w-[100px]">
                    <Badge variant={getProductStatusVariant(product.status)} className="text-xs">
                      {product.status?.replace("_", " ")}
                    </Badge>
                  </TableCell>
                  <TableCell className="min-w-[120px]">
                    <div className="flex items-center space-x-1">
                      <Link to={`/product/${product.id}`}>
                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                          <Eye className="w-4 h-4" />
                        </Button>
                      </Link>
                      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
                        <DialogTrigger asChild>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-8 w-8 p-0"
                            onClick={() => onEditClick(product)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl max-h-[90vh] border-pink-300 ring-pink-200 overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle>Edit Product</DialogTitle>
                          </DialogHeader>
                          <ProductForm
                            product={editProduct}
                            setProduct={setEditProduct}
                            onSave={onUpdateSubmit}
                            onCancel={() => setIsEditOpen(false)}
                            isEdit={true}
                          />
                        </DialogContent>
                      </Dialog>
                      <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        {products.length === 0 && searchTerm && (
          <div className="text-center py-8 text-muted-foreground">No products found matching "{searchTerm}"</div>
        )}
      </CardContent>
    </Card>
  )
}


export default ProductTable