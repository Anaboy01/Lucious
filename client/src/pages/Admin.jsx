import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import {
  Plus,
  Package,
  ShoppingCart,
  Users,
  DollarSign,
  Eye,
  Edit,
  Trash2,
  Search,
  Filter,
  Download,
  Bell,
  Settings,
  LogOut,
  Heart,
  X,
  Upload,
} from "lucide-react"
import { Link } from "react-router-dom"
import PageHeader from "@/components/categories/PageHeader"



const Admin = () => {
const [searchTerm, setSearchTerm] = useState("")
  const [isAddProductOpen, setIsAddProductOpen] = useState(false)
  const [isEditProductOpen, setIsEditProductOpen] = useState(false)

  // Sample data
  const stats = {
    totalRevenue: 45678000.9,
    totalOrders: 234,
    totalProducts: 89,
    totalCustomers: 1456,
  }

  const recentOrders = [
    {
      id: "ORD-001",
      customer: "Sarah Johnson",
      email: "sarah@email.com",
      total: 129000.99,
      status: "pending",
      date: "2024-01-15",
      items: 2,
    },
    {
      id: "ORD-002",
      customer: "Emma Wilson",
      email: "emma@email.com",
      total: 89000.99,
      status: "shipped",
      date: "2024-01-14",
      items: 1,
    },
    {
      id: "ORD-003",
      customer: "Lisa Brown",
      email: "lisa@email.com",
      total: 199000.99,
      status: "delivered",
      date: "2024-01-13",
      items: 3,
    },
    {
      id: "ORD-004",
      customer: "Anna Davis",
      email: "anna@email.com",
      total: 75000.99,
      status: "processing",
      date: "2024-01-12",
      items: 1,
    },
  ]

  const products = [
    {
      id: 1,
      name: "Silk Dreams Bra Set",
      price: 89000.99,
      stock: 25,
      category: "Bras",
      status: "active",
      image: "/placeholder.svg?height=100&width=100",
      sales: 45,
    },
    {
      id: 2,
      name: "Lace Whisper Collection",
      price: 65000.99,
      stock: 12,
      category: "Sets",
      status: "active",
      image: "/placeholder.svg?height=100&width=100",
      sales: 32,
    },
    {
      id: 3,
      name: "Velvet Rose Lingerie",
      price: 95000.99,
      stock: 8,
      category: "Lingerie",
      status: "low_stock",
      image: "/placeholder.svg?height=100&width=100",
      sales: 28,
    },
    {
      id: 4,
      name: "Midnight Elegance Set",
      price: 78000.99,
      stock: 0,
      category: "Sets",
      status: "out_of_stock",
      image: "/placeholder.svg?height=100&width=100",
      sales: 15,
    },
  ]

  const getStatusVariant = (status) => {
    switch (status) {
      case "pending":
        return "secondary"
      case "processing":
        return "default"
      case "shipped":
        return "outline"
      case "delivered":
        return "default"
      case "cancelled":
        return "destructive"
      default:
        return "secondary"
    }
  }

  const getProductStatusVariant = (status) => {
    switch (status) {
      case "active":
        return "default"
      case "low_stock":
        return "secondary"
      case "out_of_stock":
        return "destructive"
      case "inactive":
        return "outline"
      default:
        return "secondary"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-red-50">
      {/* Header */}
      <PageHeader/>

      <div className="container mx-auto p-6">
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-[400px]">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="customers">Customers</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold text-gray-900">Dashboard Overview</h2>
              <Button className="bg-gradient-to-r from-pink-500 to-red-800 text-white">
                <Download className="w-4 h-4 mr-2" />
                Export Report
              </Button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-white/70 backdrop-blur-sm border-pink-100">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">₦{stats.totalRevenue.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">+20.1% from last month</p>
                </CardContent>
              </Card>

              <Card className="bg-white/70 backdrop-blur-sm border-pink-100">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
                  <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.totalOrders}</div>
                  <p className="text-xs text-muted-foreground">+12% from last month</p>
                </CardContent>
              </Card>

              <Card className="bg-white/70 backdrop-blur-sm border-pink-100">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Products</CardTitle>
                  <Package className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.totalProducts}</div>
                  <p className="text-xs text-muted-foreground">+3 new this week</p>
                </CardContent>
              </Card>

              <Card className="bg-white/70 backdrop-blur-sm border-pink-100">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.totalCustomers}</div>
                  <p className="text-xs text-muted-foreground">+15% from last month</p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Orders */}
            <Card className="bg-white/70 backdrop-blur-sm border-pink-100">
              <CardHeader>
                <CardTitle>Recent Orders</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order ID</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentOrders.slice(0, 5).map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="font-medium">{order.id}</TableCell>
                        <TableCell>{order.customer}</TableCell>
                        <TableCell>₦{order.total}</TableCell>
                        <TableCell>
                          <Badge variant={getStatusVariant(order.status)}>{order.status}</Badge>
                        </TableCell>
                        <TableCell>{order.date}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Products Tab */}
          <TabsContent value="products" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold text-gray-900">Products Management</h2>
              <Dialog open={isAddProductOpen} onOpenChange={setIsAddProductOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-gradient-to-r from-pink-500 to-red-800 text-white">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Product
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Add New Product</DialogTitle>
                  </DialogHeader>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Product Form */}
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Product Name</Label>
                        <Input id="name" placeholder="Enter product name" />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea id="description" placeholder="Enter product description" rows={4} />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="price">Price</Label>
                          <Input id="price" type="number" placeholder="0.00" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="compare-price">Compare Price</Label>
                          <Input id="compare-price" type="number" placeholder="0.00" />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="category">Category</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="bras">Bras</SelectItem>
                            <SelectItem value="panties">Panties</SelectItem>
                            <SelectItem value="sets">Sets</SelectItem>
                            <SelectItem value="sleepwear">Sleepwear</SelectItem>
                            <SelectItem value="lingerie">Lingerie</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="stock">Stock Quantity</Label>
                          <Input id="stock" type="number" placeholder="0" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="sku">SKU</Label>
                          <Input id="sku" placeholder="Product SKU" />
                        </div>
                      </div>
                    </div>

                    {/* Product Images and Variants */}
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>Product Images</Label>
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                          <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                          <p className="text-gray-600">Drop images here or click to upload</p>
                          <p className="text-sm text-gray-400">PNG, JPG up to 10MB</p>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label>Available Colors</Label>
                        <div className="grid grid-cols-2 gap-2">
                          {["Rose Pink", "Wine Red", "Blush", "Deep Rose", "Black", "White"].map((color) => (
                            <div key={color} className="flex items-center space-x-2">
                              <Checkbox id={`color-${color}`} />
                              <Label htmlFor={`color-${color}`} className="text-sm">
                                {color}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label>Available Sizes</Label>
                        <div className="grid grid-cols-3 gap-2">
                          {["XS", "S", "M", "L", "XL", "XXL"].map((size) => (
                            <div key={size} className="flex items-center space-x-2">
                              <Checkbox id={`size-${size}`} />
                              <Label htmlFor={`size-${size}`} className="text-sm">
                                {size}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end space-x-2 pt-4">
                    <Button variant="outline" onClick={() => setIsAddProductOpen(false)}>
                      Cancel
                    </Button>
                    <Button className="bg-gradient-to-r from-pink-500 to-red-800 text-white">Save Product</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            {/* Search and Filter */}
            <Card className="bg-white/70 backdrop-blur-sm border-pink-100">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="flex-1 relative">
                    <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <Input
                      placeholder="Search products..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Button variant="outline">
                    <Filter className="w-4 h-4 mr-2" />
                    Filter
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Products Table */}
            <Card className="bg-white/70 backdrop-blur-sm border-pink-100">
              <CardContent className="p-6">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Product</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Stock</TableHead>
                      <TableHead>Sales</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {products.map((product) => (
                      <TableRow key={product.id}>
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <img
                              src={product.image || "/placeholder.svg"}
                              alt={product.name}
                              width={50}
                              height={50}
                              className="rounded-lg object-cover"
                            />
                            <span className="font-medium">{product.name}</span>
                          </div>
                        </TableCell>
                        <TableCell>{product.category}</TableCell>
                        <TableCell>₦{product.price}</TableCell>
                        <TableCell>{product.stock}</TableCell>
                        <TableCell>{product.sales}</TableCell>
                        <TableCell>
                          <Badge variant={getProductStatusVariant(product.status)}>
                            {product.status.replace("_", " ")}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Button size="sm" variant="ghost">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Dialog open={isEditProductOpen} onOpenChange={setIsEditProductOpen}>
                              <DialogTrigger asChild>
                                <Button size="sm" variant="ghost">
                                  <Edit className="w-4 h-4" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                                <DialogHeader>
                                  <DialogTitle>Edit Product</DialogTitle>
                                </DialogHeader>
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                  {/* Edit Product Form - Pre-filled */}
                                  <div className="space-y-4">
                                    <div className="space-y-2">
                                      <Label htmlFor="edit-name">Product Name</Label>
                                      <Input id="edit-name" defaultValue="Silk Dreams Bra Set" />
                                    </div>

                                    <div className="space-y-2">
                                      <Label htmlFor="edit-description">Description</Label>
                                      <Textarea
                                        id="edit-description"
                                        defaultValue="Luxurious silk bra set with delicate lace details."
                                        rows={4}
                                      />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                      <div className="space-y-2">
                                        <Label htmlFor="edit-price">Price</Label>
                                        <Input id="edit-price" type="number" defaultValue="89.99" />
                                      </div>
                                      <div className="space-y-2">
                                        <Label htmlFor="edit-compare-price">Compare Price</Label>
                                        <Input id="edit-compare-price" type="number" defaultValue="120.00" />
                                      </div>
                                    </div>

                                    <div className="space-y-2">
                                      <Label htmlFor="edit-category">Category</Label>
                                      <Select defaultValue="bras">
                                        <SelectTrigger>
                                          <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                          <SelectItem value="bras">Bras</SelectItem>
                                          <SelectItem value="panties">Panties</SelectItem>
                                          <SelectItem value="sets">Sets</SelectItem>
                                          <SelectItem value="sleepwear">Sleepwear</SelectItem>
                                          <SelectItem value="lingerie">Lingerie</SelectItem>
                                        </SelectContent>
                                      </Select>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                      <div className="space-y-2">
                                        <Label htmlFor="edit-stock">Stock Quantity</Label>
                                        <Input id="edit-stock" type="number" defaultValue="25" />
                                      </div>
                                      <div className="space-y-2">
                                        <Label htmlFor="edit-sku">SKU</Label>
                                        <Input id="edit-sku" defaultValue="SLK-BRA-001" />
                                      </div>
                                    </div>

                                    <div className="space-y-2">
                                      <Label htmlFor="edit-status">Status</Label>
                                      <Select defaultValue="active">
                                        <SelectTrigger>
                                          <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                          <SelectItem value="active">Active</SelectItem>
                                          <SelectItem value="inactive">Inactive</SelectItem>
                                          <SelectItem value="low_stock">Low Stock</SelectItem>
                                          <SelectItem value="out_of_stock">Out of Stock</SelectItem>
                                        </SelectContent>
                                      </Select>
                                    </div>
                                  </div>

                                  {/* Current Images and Variants */}
                                  <div className="space-y-4">
                                    <div className="space-y-2">
                                      <Label>Product Images</Label>
                                      <div className="grid grid-cols-2 gap-4">
                                        <div className="relative">
                                          <img
                                            src="/placeholder.svg?height=150&width=150"
                                            alt="Product image"
                                            width={150}
                                            height={150}
                                            className="rounded-lg object-cover w-full"
                                          />
                                          <Button
                                            size="sm"
                                            variant="destructive"
                                            className="absolute top-2 right-2 h-6 w-6 p-0"
                                          >
                                            <X className="w-4 h-4" />
                                          </Button>
                                        </div>
                                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 flex items-center justify-center">
                                          <Plus className="w-8 h-8 text-gray-400" />
                                        </div>
                                      </div>
                                    </div>

                                    <div className="space-y-2">
                                      <Label>Available Colors</Label>
                                      <div className="grid grid-cols-2 gap-2">
                                        {["Rose Pink", "Wine Red", "Blush", "Deep Rose", "Black", "White"].map(
                                          (color) => (
                                            <div key={color} className="flex items-center space-x-2">
                                              <Checkbox
                                                id={`edit-color-${color}`}
                                                defaultChecked={["Rose Pink", "Wine Red", "Blush"].includes(color)}
                                              />
                                              <Label htmlFor={`edit-color-${color}`} className="text-sm">
                                                {color}
                                              </Label>
                                            </div>
                                          ),
                                        )}
                                      </div>
                                    </div>

                                    <div className="space-y-2">
                                      <Label>Available Sizes</Label>
                                      <div className="grid grid-cols-3 gap-2">
                                        {["XS", "S", "M", "L", "XL", "XXL"].map((size) => (
                                          <div key={size} className="flex items-center space-x-2">
                                            <Checkbox
                                              id={`edit-size-${size}`}
                                              defaultChecked={["S", "M", "L", "XL"].includes(size)}
                                            />
                                            <Label htmlFor={`edit-size-${size}`} className="text-sm">
                                              {size}
                                            </Label>
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="flex justify-end space-x-2 pt-4">
                                  <Button variant="outline" onClick={() => setIsEditProductOpen(false)}>
                                    Cancel
                                  </Button>
                                  <Button className="bg-gradient-to-r from-pink-500 to-red-800 text-white">
                                    Update Product
                                  </Button>
                                </div>
                              </DialogContent>
                            </Dialog>
                            <Button size="sm" variant="ghost">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Orders Tab */}
          <TabsContent value="orders" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold text-gray-900">Orders Management</h2>
              <Button className="bg-gradient-to-r from-pink-500 to-red-800 text-white">
                <Download className="w-4 h-4 mr-2" />
                Export Orders
              </Button>
            </div>

            {/* Search and Filter */}
            <Card className="bg-white/70 backdrop-blur-sm border-pink-100">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="flex-1 relative">
                    <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <Input placeholder="Search orders..." className="pl-10" />
                  </div>
                  <Select>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="All Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="processing">Processing</SelectItem>
                      <SelectItem value="shipped">Shipped</SelectItem>
                      <SelectItem value="delivered">Delivered</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Orders Table */}
            <Card className="bg-white/70 backdrop-blur-sm border-pink-100">
              <CardContent className="p-6">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order ID</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Items</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentOrders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="font-medium">{order.id}</TableCell>
                        <TableCell>{order.customer}</TableCell>
                        <TableCell>{order.email}</TableCell>
                        <TableCell>{order.items}</TableCell>
                        <TableCell className="font-medium">₦{order.total}</TableCell>
                        <TableCell>
                          <Select defaultValue={order.status}>
                            <SelectTrigger className="w-[120px]">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="pending">Pending</SelectItem>
                              <SelectItem value="processing">Processing</SelectItem>
                              <SelectItem value="shipped">Shipped</SelectItem>
                              <SelectItem value="delivered">Delivered</SelectItem>
                              <SelectItem value="cancelled">Cancelled</SelectItem>
                            </SelectContent>
                          </Select>
                        </TableCell>
                        <TableCell>{order.date}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Button size="sm" variant="ghost">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="ghost">
                              <Edit className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Customers Tab */}
          <TabsContent value="customers" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold text-gray-900">Customer Management</h2>
              <Button className="bg-gradient-to-r from-pink-500 to-red-800 text-white">
                <Download className="w-4 h-4 mr-2" />
                Export Customers
              </Button>
            </div>

            <Card className="bg-white/70 backdrop-blur-sm border-pink-100">
              <CardContent className="p-6">
                <div className="text-center py-12">
                  <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-600 mb-2">Customer Management</h3>
                  <p className="text-gray-500">Customer management features coming soon...</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )

}

export default Admin