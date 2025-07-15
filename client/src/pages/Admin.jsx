import CustomersTab from "@/components/admin/CustomersTab";
import OrdersTab from "@/components/admin/OrdersTab";
import OverviewTab from "@/components/admin/OverviewTab";
import ProductsTab from "@/components/admin/ProductsTab";
import { useEffect, useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import PageHeader from "@/components/categories/PageHeader"
import { useApp } from "@/context/AppContext"
import { useProduct } from "@/context/ProductContext"
import { useOrder } from "@/context/OrderContext"
import { toast } from "react-toastify"



const Admin = () => {
  const [productSearchTerm, setProductSearchTerm] = useState("")
  const [orderSearchTerm, setOrderSearchTerm] = useState("")


  const [productFilters, setProductFilters] = useState({
    category: "all",
    stockStatus: "all",
    salesRange: "all",
  })
  const [orderSort, setOrderSort] = useState({
    field: "orderDate",
    direction: "desc",
  })


  const [isAddOpen, setIsAddOpen] = useState(false)
  const [isEditProductOpen, setIsEditProductOpen] = useState(false)
  const [updating, setUpdating] = useState(false)


  const { customers, loggedIn } = useApp()
  const { fetchAllOrders, orders, handleUpdateStatus: updateOrderStatus } = useOrder()
  const { createProduct, products, editProduct } = useProduct()

  useEffect(() => {
    if (loggedIn) {
      fetchAllOrders()
    }
  }, [loggedIn])


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
  }

  const [newProd, setNewProd] = useState(emptyProd)
  const [editProd, setEditProd] = useState(emptyProd)

  // Filter products
  const filteredProducts = products.filter((product) => {
    const searchLower = productSearchTerm.toLowerCase()

    const matchesSearch =
      product.name.toLowerCase().includes(searchLower) ||
      product.category.toLowerCase().includes(searchLower) ||
      product.description.toLowerCase().includes(searchLower)

    const matchesCategory = productFilters.category === "all" || product.category === productFilters.category

    let matchesStock = true
    if (productFilters.stockStatus !== "all") {
      const stock = product.stock || 0
      switch (productFilters.stockStatus) {
        case "in_stock":
          matchesStock = stock > 10
          break
        case "low_stock":
          matchesStock = stock > 0 && stock <= 10
          break
        case "out_of_stock":
          matchesStock = stock === 0
          break
      }
    }

    let matchesSales = true
    if (productFilters.salesRange !== "all") {
      const sales = product.sales || 0
      switch (productFilters.salesRange) {
        case "high":
          matchesSales = sales >= 100
          break
        case "medium":
          matchesSales = sales >= 20 && sales < 100
          break
        case "low":
          matchesSales = sales < 20
          break
      }
    }

    return matchesSearch && matchesCategory && matchesStock && matchesSales
  })


  const filteredOrders = orders.filter((order) => {
    const searchLower = orderSearchTerm.toLowerCase()
    return (
      order._id.toLowerCase().includes(searchLower) ||
      order.user.name.toLowerCase().includes(searchLower) ||
      order.user.email.toLowerCase().includes(searchLower) ||
      order.user.phoneNo.toLowerCase().includes(searchLower) ||
      order.status.toLowerCase().includes(searchLower)
    )
  })

  const sortedOrders = [...filteredOrders].sort((a, b) => {
    let aValue, bValue

    switch (orderSort.field) {
      case "orderDate":
        aValue = new Date(a.orderDate)
        bValue = new Date(b.orderDate)
        break
      case "amount_paid":
        aValue = a.amount_paid
        bValue = b.amount_paid
        break
      case "status":
        aValue = a.status
        bValue = b.status
        break
      case "customer":
        aValue = a.user.name.toLowerCase()
        bValue = b.user.name.toLowerCase()
        break
      default:
        aValue = new Date(a.orderDate)
        bValue = new Date(b.orderDate)
    }

    if (orderSort.direction === "asc") {
      return aValue > bValue ? 1 : -1
    } else {
      return aValue < bValue ? 1 : -1
    }
  })


  const handleSave = async () => {
    try {
      const res = await createProduct(newProd)
      if (res?.message) {
        toast.success(res.message)
      } else {
        toast.success("Product created successfully")
      }
      setIsAddOpen(false)
      setNewProd(emptyProd)
    } catch (error) {
      console.error(error)
      toast.error("Failed to create product")
    }
  }

  const handleEditClick = (product) => {
    setEditProd(product)
    setIsEditProductOpen(true)
  }

  const handleUpdateSubmit = async () => {
    try {
      const res = await editProduct(editProd.id, editProd)
      if (res?.message) {
        toast.success(res.message)
      } else {
        toast.success("Product updated successfully")
      }
      setIsEditProductOpen(false)
      setEditProd(emptyProd)
    } catch (err) {
      console.error(err)
      toast.error("Failed to update product")
    }
  }

  // Order handlers
  const handleOrderUpdateStatus = async (orderId, newStatus) => {
    try {
      setUpdating(true)
      const result = await updateOrderStatus(orderId, newStatus)
      return result
    } catch (error) {
      console.error(error)
    } finally {
      setUpdating(false)
    }
  }

  // Stats calculation
  const totalRevenue = orders.reduce((acc, order) => acc + order.amount_paid, 0)
  const stats = {
    totalRevenue,
    totalOrders: orders?.length,
    totalProducts: products.length,
    totalCustomers: customers.length,
  }

  // Utility functions
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
      <PageHeader />
      <div className="container mx-auto p-6">
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-[400px]">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="customers">Customers</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <OverviewTab stats={stats} recentOrders={sortedOrders} getStatusVariant={getStatusVariant} />
          </TabsContent>

          <TabsContent value="products">
            <ProductsTab
              newProduct={newProd}
              setNewProduct={setNewProd}
              editProduct={editProd}
              setEditProduct={setEditProd}
              isAddOpen={isAddOpen}
              setIsAddOpen={setIsAddOpen}
              isEditOpen={isEditProductOpen}
              setIsEditOpen={setIsEditProductOpen}
              onSave={handleSave}
              onEditClick={handleEditClick}
              onUpdateSubmit={handleUpdateSubmit}
              searchTerm={productSearchTerm}
              setSearchTerm={setProductSearchTerm}
              filters={productFilters}
              setFilters={setProductFilters}
              filteredProducts={filteredProducts}
              totalProducts={products.length}
              getProductStatusVariant={getProductStatusVariant}
            />
          </TabsContent>

          <TabsContent value="orders">
            <OrdersTab
              searchTerm={orderSearchTerm}
              setSearchTerm={setOrderSearchTerm}
              sortConfig={orderSort}
              setSortConfig={setOrderSort}
              sortedOrders={sortedOrders}
              totalOrders={orders.length}
              updating={updating}
              onUpdateStatus={handleOrderUpdateStatus}
            />
          </TabsContent>

          <TabsContent value="customers">
            <CustomersTab customers={customers} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default Admin