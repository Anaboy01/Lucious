import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Eye } from "lucide-react"
import { Link } from "react-router-dom"



const OrderTable = ({
    orders, searchTerm, updating, onUpdateStatus
}) => {
   return (
    <Card className="bg-white/70 backdrop-blur-sm border-pink-100">
      <CardContent className="p-6">
        <div className="overflow-x-auto">
          <Table className="min-w-full">
            <TableHeader>
              <TableRow>
                <TableHead className="min-w-[120px]">Order ID</TableHead>
                <TableHead className="min-w-[150px]">Customer</TableHead>
                <TableHead className="min-w-[120px]">Phone No</TableHead>
                <TableHead className="min-w-[80px]">Items</TableHead>
                <TableHead className="min-w-[100px]">Total</TableHead>
                <TableHead className="min-w-[120px]">Status</TableHead>
                <TableHead className="min-w-[150px]">Date</TableHead>
                <TableHead className="min-w-[80px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order._id}>
                  <TableCell className="font-medium text-sm min-w-[120px]">
                    <span className="break-all">{`${order._id.slice(0, 8)}...`}</span>
                  </TableCell>
                  <TableCell className="min-w-[150px]">
                    <div className="min-w-0">
                      <span className="text-sm break-words line-clamp-1">{order.user.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="min-w-[120px]">
                    <span className="text-sm break-all">{order.user.phoneNo}</span>
                  </TableCell>
                  <TableCell className="min-w-[80px]">
                    <span className="text-sm">{order.cartList.length}</span>
                  </TableCell>
                  <TableCell className="font-medium text-sm min-w-[100px]">
                    <span className="break-words">₦{order.amount_paid}</span>
                  </TableCell>
                  <TableCell className="min-w-[120px]">
                    <Select
                      disabled={updating}
                      defaultValue={order.status}
                      onValueChange={async (newStatus) => {
                        await onUpdateStatus(order._id, newStatus)
                      }}
                    >
                      <SelectTrigger className="w-[110px] h-8">
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
                  <TableCell className="min-w-[150px]">
                    <span className="text-xs break-words">
                      {new Date(order.orderDate).toLocaleString("en-NG", {
                        weekday: "short",
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </TableCell>
                  <TableCell className="min-w-[80px]">
                    <div className="flex items-center justify-center">
                      <Link to={`/orderReciept/${order._id}`}>
                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                          <Eye className="w-4 h-4" />
                        </Button>
                      </Link>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        {orders.length === 0 && searchTerm && (
          <div className="text-center py-8 text-muted-foreground">No orders found matching "{searchTerm}"</div>
        )}
      </CardContent>
      <style jsx>{`
        .line-clamp-1 {
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </Card>
  )
}

export default OrderTable