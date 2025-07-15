import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search } from "lucide-react"

import React from 'react'

const OrderFilters = ({searchTerm,
  setSearchTerm,
  sortConfig,
  setSortConfig,
  filteredCount,
  totalCount,}) => {

     const clearSearchAndSort = () => {
    setSearchTerm("")
    setSortConfig({ field: "orderDate", direction: "desc" })
  }

  return (
    <Card className="bg-white/70 backdrop-blur-sm border-pink-100">
      <CardContent className="p-6">
        <div className="space-y-4">
          {/* Search and Sort Controls */}
          <div className="flex items-center space-x-4">
            <div className="flex-1 relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search orders by ID, customer name, email, phone, or status..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Label className="text-sm font-medium whitespace-nowrap">Sort by:</Label>
              <Select
                value={sortConfig.field}
                onValueChange={(value) => setSortConfig((prev) => ({ ...prev, field: value }))}
              >
                <SelectTrigger className="w-[140px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="orderDate">Date</SelectItem>
                  <SelectItem value="amount_paid">Amount</SelectItem>
                  <SelectItem value="status">Status</SelectItem>
                  <SelectItem value="customer">Customer</SelectItem>
                </SelectContent>
              </Select>
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  setSortConfig((prev) => ({
                    ...prev,
                    direction: prev.direction === "asc" ? "desc" : "asc",
                  }))
                }
              >
                {sortConfig.direction === "asc" ? "↑" : "↓"}
              </Button>
            </div>
          </div>

          {/* Results Summary */}
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>
              Showing {filteredCount} of {totalCount} orders
              {sortConfig.field !== "orderDate" && (
                <span className="ml-2">
                  • Sorted by {sortConfig.field} ({sortConfig.direction === "asc" ? "ascending" : "descending"})
                </span>
              )}
            </span>
            <Button variant="outline" size="sm" onClick={clearSearchAndSort}>
              Clear Search & Sort
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
 
}

export default OrderFilters