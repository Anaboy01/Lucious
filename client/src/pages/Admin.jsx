import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
} from "lucide-react";
import { Link } from "react-router-dom";
import PageHeader from "@/components/categories/PageHeader";
import { useApp } from "@/context/AppContext";
import { useProduct } from "@/context/ProductContext";
import { toast } from "react-toastify";

const Admin = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddOpen, setIsAddOpen] = useState(false);

  const [isEditProductOpen, setIsEditProductOpen] = useState(false);
  const { customers } = useApp();
  const { createProduct, products, editProduct } = useProduct();

  const emptyProd = {
    name: "",
    description: "",
    price: 0,
    originalPrice: 0,
    coverImage: "",
    images: [""],
    category: "",
    rating: 0,
    features: [""],
    colors: [{ colorName: "", colorValue: "" }],
    sizes: [{ size: "", amountOfSiize: 0 }],
  };
  const [newProd, setNewProd] = useState(emptyProd);
    const [editProd, setEditProd] = useState(emptyProd);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProd((p) => ({
      ...p,
      [name]: ["price", "originalPrice", "rating"].includes(name)
        ? Number(value)
        : value,
    }));
  };

  const handleArrChange = (field, idx, key, val) => {
    setNewProd((p) => {
      const arr = [...p[field]];
      arr[idx] = {
        ...arr[idx],
        [key]: key === "amountOfSiize" ? Number(val) : val,
      };
      return { ...p, [field]: arr };
    });
  };

  const addArrItem = (field, template) => {
    setNewProd((p) => ({ ...p, [field]: [...p[field], template] }));
  };

  const removeArrItem = (field, index) => {
    setNewProd((p) => ({
      ...p,
      [field]: p[field].filter((_, i) => i !== index),
    }));
  };

  const handleSave = async () => {
   try {
     const res = await createProduct(newProd);
  if (res?.message) {
      toast.success(res.message);
    } else {
      toast.success("Product created successfully");
    }
    setIsAddOpen(false);
    setNewProd(emptyProd);
   } catch (error) {
     console.error(error);
    toast.error("Failed to create product");
   }
  };

  const handleEditClick = (product) => {
  setEditProd(product);
  console.log(product)
  setIsEditProductOpen(true);
};

const handleEditChange = (e) => {
  const { name, value } = e.target;
  setEditProd((p) => ({ ...p, [name]: value }));
};

const editArrChange = (field, i, key, val) => {
  const arr = [...editProd[field]];
  arr[i][key] = val;
  setEditProd((p) => ({ ...p, [field]: arr }));
};

const removeEditArrItem = (field, i) => {
  const arr = [...editProd[field]];
  arr.splice(i, 1);
  setEditProd((p) => ({ ...p, [field]: arr }));
};

const addEditArrItem = (field, template) => {
  setEditProd((p) => ({ ...p, [field]: [...p[field], template] }));
};

const handleUpdateSubmit = async () => {
  try {
    const res = await editProduct(editProd.id, editProd); 

    if (res?.message) {
      toast.success(res.message);
    } else {
      toast.success("Product updated successfully");
    }
    setIsEditProductOpen(false);
    setEditProd(emptyProd);
  } catch (err) {
    console.error(err);
    toast.error("Failed to update product");
  }
};


  const stats = {
    totalRevenue: 45678000.9,
    totalOrders: 234,
    totalProducts: products.length,
    totalCustomers: customers.length,
  };

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
  ];

  const getStatusVariant = (status) => {
    switch (status) {
      case "pending":
        return "secondary";
      case "processing":
        return "default";
      case "shipped":
        return "outline";
      case "delivered":
        return "default";
      case "cancelled":
        return "destructive";
      default:
        return "secondary";
    }
  };

  const getProductStatusVariant = (status) => {
    switch (status) {
      case "active":
        return "default";
      case "low_stock":
        return "secondary";
      case "out_of_stock":
        return "destructive";
      case "inactive":
        return "outline";
      default:
        return "secondary";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-red-50">
      {/* Header */}
      <PageHeader />

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
              <h2 className="text-3xl font-bold text-gray-900">
                Dashboard Overview
              </h2>
              <Button className="bg-gradient-to-r from-pink-500 to-red-800 text-white">
                <Download className="w-4 h-4 mr-2" />
                Export Report
              </Button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-white/70 backdrop-blur-sm border-pink-100">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Revenue
                  </CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    ₦{stats.totalRevenue.toLocaleString()}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    +20.1% from last month
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white/70 backdrop-blur-sm border-pink-100">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Orders
                  </CardTitle>
                  <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.totalOrders}</div>
                  <p className="text-xs text-muted-foreground">
                    +12% from last month
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white/70 backdrop-blur-sm border-pink-100">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Products
                  </CardTitle>
                  <Package className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {stats.totalProducts}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    +3 new this week
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white/70 backdrop-blur-sm border-pink-100">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Customers
                  </CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {stats.totalCustomers}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    +15% from last month
                  </p>
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
                        <TableCell className="font-medium">
                          {order.id}
                        </TableCell>
                        <TableCell>{order.customer}</TableCell>
                        <TableCell>₦{order.total}</TableCell>
                        <TableCell>
                          <Badge variant={getStatusVariant(order.status)}>
                            {order.status}
                          </Badge>
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
            <div className="flex items-start flex-col lg:flex-row gap-2 lg:items-center justify-between">
              <h2 className="text-3xl font-bold text-gray-900">
                Products Management
              </h2>
              <div className="flex items-start flex-col lg:flex-row gap-2 lg:items-center justify-center">
                <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-gradient-to-r from-pink-500 to-red-800 text-white">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Product
                    </Button>
                  </DialogTrigger>
                  {/* Replace your static Add Product form with: */}
                  <DialogContent className="max-w-4xl max-h-[90vh]  border-pink-300 ring-pink-200 overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Add New Product</DialogTitle>
                    </DialogHeader>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {/* Left Column */}
                      <div className="space-y-4">
                        <div>
                          <Label>Name</Label>
                          <Input
                            name="name"
                            value={newProd.name}
                            onChange={handleChange}
                          />
                        </div>
                        <div>
                          <Label>Description</Label>
                          <Textarea
                            name="description"
                            value={newProd.description}
                            onChange={handleChange}
                            rows={4}
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label>Price</Label>
                            <Input
                              name="price"
                              type="number"
                              value={newProd.price}
                              onChange={handleChange}
                            />
                          </div>
                          <div>
                            <Label>Original Price</Label>
                            <Input
                              name="originalPrice"
                              type="number"
                              value={newProd.originalPrice}
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                        <div>
                          <Label>Cover Image URL</Label>
                          <Input
                            name="coverImage"
                            value={newProd.coverImage}
                            onChange={handleChange}
                          />
                        </div>
                        <div>
                          <Label>Category</Label>
                          <Select
                            name="category"
                            value={newProd.category}
                            onValueChange={(val) =>
                              setNewProd((prev) => ({
                                ...prev,
                                category: val,
                              }))
                            }
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="set">Set</SelectItem>
                              <SelectItem value="bras">Bras</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label>Rating</Label>
                          <Input
                            name="rating"
                            type="number"
                            step="0.1"
                            min="0"
                            max="5"
                            value={newProd.rating}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      {/* Right arrays */}
                      <div className="space-y-4">
                        {/* Images */}
                        <div>
                          <Label>Images</Label>
                          {newProd.images.map((url, i) => (
                            <div className="flex">
                              <Input
                                key={i}
                                value={url}
                                onChange={(e) => {
                                  const arr = [...newProd.images];
                                  arr[i] = e.target.value;
                                  setNewProd((p) => ({ ...p, images: arr }));
                                }}
                              />

                              <Button
                                size="icon"
                                variant="ghost"
                                onClick={() => removeArrItem("images", i)}
                              >
                                X
                              </Button>
                            </div>
                          ))}
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => addArrItem("images", "")}
                          >
                            Add Image
                          </Button>
                        </div>
                        {/* Features */}
                        <div>
                          <Label>Features</Label>
                          {newProd.features.map((f, i) => (
                            <div className="flex">
                              <Input
                                key={i}
                                value={f}
                                onChange={(e) => {
                                  const arr = [...newProd.features];
                                  arr[i] = e.target.value;
                                  setNewProd((p) => ({ ...p, features: arr }));
                                }}
                              />

                              <Button
                                size="icon"
                                variant="ghost"
                                onClick={() => removeArrItem("features", i)}
                              >
                                X
                              </Button>
                            </div>
                          ))}
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => addArrItem("features", "")}
                          >
                            Add Feature
                          </Button>
                        </div>
                        {/* Colors */}
                        <div>
                          <Label>Colors</Label>
                          {newProd.colors.map((c, i) => (
                            <div key={i} className="flex space-x-2">
                              <Input
                                placeholder="Name"
                                value={c.colorName}
                                onChange={(e) =>
                                  handleArrChange(
                                    "colors",
                                    i,
                                    "colorName",
                                    e.target.value
                                  )
                                }
                              />
                              <Input
                                placeholder="#hex"
                                value={c.colorValue}
                                onChange={(e) =>
                                  handleArrChange(
                                    "colors",
                                    i,
                                    "colorValue",
                                    e.target.value
                                  )
                                }
                              />

                              <Button
                                size="icon"
                                variant="ghost"
                                onClick={() => removeArrItem("colors", i)}
                              >
                                X
                              </Button>
                            </div>
                          ))}
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              addArrItem("colors", {
                                colorName: "",
                                colorValue: "",
                              })
                            }
                          >
                            Add Color
                          </Button>
                        </div>
                        {/* Sizes */}
                        <div>
                          <Label>Sizes</Label>
                          {newProd.sizes.map((s, i) => (
                            <div key={i} className="flex space-x-2">
                              <Input
                                placeholder="Size"
                                value={s.size}
                                onChange={(e) =>
                                  handleArrChange(
                                    "sizes",
                                    i,
                                    "size",
                                    e.target.value
                                  )
                                }
                              />
                              <Input
                                placeholder="Qty"
                                type="number"
                                value={s.amountOfSiize}
                                onChange={(e) =>
                                  handleArrChange(
                                    "sizes",
                                    i,
                                    "amountOfSiize",
                                    e.target.value
                                  )
                                }
                              />

                              <Button
                                size="icon"
                                variant="ghost"
                                onClick={() => removeArrItem("sizes", i)}
                              >
                                X
                              </Button>
                            </div>
                          ))}
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              addArrItem("sizes", {
                                size: "",
                                amountOfSiize: 0,
                              })
                            }
                          >
                            Add Size
                          </Button>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-end mt-4 space-x-2">
                      <Button
                        variant="outline"
                        onClick={() => setIsAddOpen(false)}
                      >
                        Cancel
                      </Button>
                      <Button
                        className="bg-gradient-to-r from-pink-500 to-red-800 text-white"
                        onClick={handleSave}
                      >
                        Save Product
                      </Button>
                    </div>
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
                              src={product.coverImage || "/placeholder.svg"}
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
                          <Badge
                            variant={getProductStatusVariant(product.status)}
                          >
                            {product.status.replace("_", " ")}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Link to={`/product/${product.id}`}>
                              <Button size="sm" variant="ghost">
                                <Eye className="w-4 h-4" />
                              </Button>
                            </Link>
                           <Dialog open={isEditProductOpen} onOpenChange={setIsEditProductOpen}>
  <DialogTrigger asChild>
    <Button size="sm" variant="ghost" onClick={() => handleEditClick(product)}>
      <Edit className="w-4 h-4"  />
    </Button>
  </DialogTrigger>
  <DialogContent className="max-w-4xl max-h-[90vh] border-pink-300 ring-pink-200 overflow-y-auto">
    <DialogHeader>
      <DialogTitle>Edit Product</DialogTitle>
    </DialogHeader>
    {console.log(editProd)}

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* LEFT FORM */}
      <div className="space-y-4">
        <div>
          <Label>Name</Label>
          <Input name="name" value={editProd.name} onChange={handleEditChange} />
        </div>

        <div>
          <Label>Description</Label>
          <Textarea
            name="description"
            value={editProd.description}
            onChange={handleEditChange}
            rows={4}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Price</Label>
            <Input
              name="price"
              type="number"
              value={editProd.price}
              onChange={handleEditChange}
            />
          </div>
          <div>
            <Label>Original Price</Label>
            <Input
              name="originalPrice"
              type="number"
              value={editProd.originalPrice}
              onChange={handleEditChange}
            />
          </div>
        </div>

        <div>
          <Label>Cover Image URL</Label>
          <Input
            name="coverImage"
            value={editProd.coverImage}
            onChange={handleEditChange}
          />
        </div>

        <div>
          <Label>Category</Label>
          <Select
            name="category"
            value={editProd.category}
            onValueChange={(val) =>
              setEditProd((prev) => ({ ...prev, category: val }))
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="set">Set</SelectItem>
              <SelectItem value="bras">Bras</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>Rating</Label>
          <Input
            name="rating"
            type="number"
            value={editProd.rating}
            onChange={handleEditChange}
          />
        </div>
      </div>

      {/* RIGHT - Arrays */}
      <div className="space-y-4">
        {/* IMAGES */}
        <div>
          <Label>Images</Label>
          {editProd.images.map((url, i) => (
            <div key={i} className="flex">
              <Input
                value={url}
                onChange={(e) => {
                  const arr = [...editProd.images];
                  arr[i] = e.target.value;
                  setEditProd((p) => ({ ...p, images: arr }));
                }}
              />
              <Button
                size="icon"
                variant="ghost"
                onClick={() => removeEditArrItem("images", i)}
              >
                X
              </Button>
            </div>
          ))}
          <Button
            variant="outline"
            size="sm"
            onClick={() => addEditArrItem("images", "")}
          >
            Add Image
          </Button>
        </div>

        {/* FEATURES */}
        <div>
          <Label>Features</Label>
          {editProd.features.map((f, i) => (
            <div key={i} className="flex">
              <Input
                value={f}
                onChange={(e) => {
                  const arr = [...editProd.features];
                  arr[i] = e.target.value;
                  setEditProd((p) => ({ ...p, features: arr }));
                }}
              />
              <Button
                size="icon"
                variant="ghost"
                onClick={() => removeEditArrItem("features", i)}
              >
                X
              </Button>
            </div>
          ))}
          <Button
            variant="outline"
            size="sm"
            onClick={() => addEditArrItem("features", "")}
          >
            Add Feature
          </Button>
        </div>

        {/* COLORS */}
        <div>
          <Label>Colors</Label>
          {editProd.colors.map((c, i) => (
            <div key={i} className="flex space-x-2">
              <Input
                placeholder="Name"
                value={c.colorName}
                onChange={(e) =>
                  editArrChange("colors", i, "colorName", e.target.value)
                }
              />
              <Input
                placeholder="#hex"
                value={c.colorValue}
                onChange={(e) =>
                  editArrChange("colors", i, "colorValue", e.target.value)
                }
              />
              <Button
                size="icon"
                variant="ghost"
                onClick={() => removeEditArrItem("colors", i)}
              >
                X
              </Button>
            </div>
          ))}
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              addEditArrItem("colors", { colorName: "", colorValue: "" })
            }
          >
            Add Color
          </Button>
        </div>

        {/* SIZES */}
        <div>
          <Label>Sizes</Label>
          {editProd.sizes.map((s, i) => (
            <div key={i} className="flex space-x-2">
              <Input
                placeholder="Size"
                value={s.size}
                onChange={(e) =>
                  editArrChange("sizes", i, "size", e.target.value)
                }
              />
              <Input
                placeholder="Qty"
                type="number"
                value={s.amountOfSiize}
                onChange={(e) =>
                  editArrChange("sizes", i, "amountOfSiize", e.target.value)
                }
              />
              <Button
                size="icon"
                variant="ghost"
                onClick={() => removeEditArrItem("sizes", i)}
              >
                X
              </Button>
            </div>
          ))}
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              addEditArrItem("sizes", { size: "", amountOfSiize: 0 })
            }
          >
            Add Size
          </Button>
        </div>
      </div>
    </div>

    <div className="flex justify-end mt-4 space-x-2">
      <Button variant="outline" onClick={() => setIsEditProductOpen(false)}>
        Cancel
      </Button>
      <Button
        className="bg-gradient-to-r from-pink-500 to-red-800 text-white"
        onClick={handleUpdateSubmit} // Your update function here
      >
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
              <h2 className="text-3xl font-bold text-gray-900">
                Orders Management
              </h2>
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
                        <TableCell className="font-medium">
                          {order.id}
                        </TableCell>
                        <TableCell>{order.customer}</TableCell>
                        <TableCell>{order.email}</TableCell>
                        <TableCell>{order.items}</TableCell>
                        <TableCell className="font-medium">
                          ₦{order.total}
                        </TableCell>
                        <TableCell>
                          <Select defaultValue={order.status}>
                            <SelectTrigger className="w-[120px]">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="pending">Pending</SelectItem>
                              <SelectItem value="processing">
                                Processing
                              </SelectItem>
                              <SelectItem value="shipped">Shipped</SelectItem>
                              <SelectItem value="delivered">
                                Delivered
                              </SelectItem>
                              <SelectItem value="cancelled">
                                Cancelled
                              </SelectItem>
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
          {/* Customers Tab */}
          <TabsContent value="customers" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold text-gray-900">
                Customer Management
              </h2>
              <div className="text-pink-700 font-semibold text-lg">
                Total Customers: {customers?.length || 0}
              </div>
            </div>

            <Card className="bg-white/70 backdrop-blur-sm border-pink-100">
              <CardContent className="p-6 overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Customer Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Customer ID</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {customers?.map((customer) => (
                      <TableRow key={customer._id}>
                        <TableCell className="font-medium">
                          {customer.name}
                        </TableCell>
                        <TableCell>{customer.email}</TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {customer._id}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
