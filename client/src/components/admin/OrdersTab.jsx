import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import OrderFilters from "./OrderFilters"
import OrderTable from "./OrderTable"


const OrdersTab = ({
  searchTerm,
  setSearchTerm,
  sortConfig,
  setSortConfig,
  sortedOrders,
  totalOrders,
  updating,
  onUpdateStatus,
}) => {
   return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-gray-900">Orders Management</h2>
        <Button className="bg-gradient-to-r from-pink-500 to-red-800 text-white">
          <Download className="w-4 h-4 mr-2" />
          Export Orders
        </Button>
      </div>

      <OrderFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        sortConfig={sortConfig}
        setSortConfig={setSortConfig}
        filteredCount={sortedOrders.length}
        totalCount={totalOrders}
      />

      <OrderTable orders={sortedOrders} searchTerm={searchTerm} updating={updating} onUpdateStatus={onUpdateStatus} />
    </div>
  )
}

export default OrdersTab