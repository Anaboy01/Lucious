import { useApp } from "@/context/AppContext";
import React from "react";
import { toast } from "react-toastify"; 
import { Button } from "./ui/button";
import { Copy } from "lucide-react";



const OrderReceipt = ({ order }) => {
  const {
    _id,
    user,
    cartList,
    amount_paid,
    address,
    orderDate,
    status,
    transaction,
  } = order;

  const {user: loggedInUser} = useApp();
   const isAdmin = loggedInUser?.isAdmin;

const handleCopy = () => {
  const textToCopy = `
👤 *Customer Info*
Name: ${user?.name}
Phone: ${user?.phoneNo}
Email: ${user?.email}

🏠 *Delivery Address*
${address?.address}, ${address?.lga}, ${address?.state}

💳 *Amount Paid*: ₦${amount_paid.toLocaleString()}
`.trim();

  navigator.clipboard.writeText(textToCopy)
    .then(() => {
      toast?.success("Customer details copied!");
    })
    .catch(err => {
      console.error("Copy failed:", err);
      toast?.error("Failed to copy to clipboard.");
    });
};


  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-xl mt-10">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-pink-600">Order Receipt</h2>
       {isAdmin && (
         <Button
          onClick={handleCopy}
          className="px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition"
        >
         <Copy/>
        </Button>
       )}
      </div>

      {/* Order Info */}
      <div className="mb-4 text-sm text-gray-700">
        <p><strong>Order ID:</strong> {_id}</p>
        <p><strong>Order Date:</strong> {new Date(orderDate).toLocaleString()}</p>
        <p><strong>Status:</strong> <span className="capitalize">{status}</span></p>
      </div>

      {/* User Info */}
      <div className="mb-4 text-sm text-gray-700">
        <h4 className="font-semibold text-gray-800 mb-1">Customer Info:</h4>
        <p><strong>Name:</strong> {user?.name}</p>
        <p><strong>Email:</strong> {user?.email}</p>
        <p><strong>Phone:</strong> {user?.phoneNo}</p>
      </div>

      {/* Address */}
      {address && (
        <div className="mb-4 text-sm text-gray-700">
          <h4 className="font-semibold text-gray-800 mb-1">Shipping Address:</h4>
          <p>{address.address}, {address.lga}, {address.state}</p>
        </div>
      )}

      {/* Items */}
      <div className="mb-6">
        <h4 className="font-semibold text-gray-800 mb-2">Items Ordered:</h4>
        <div className="divide-y border rounded-lg overflow-hidden">
          {cartList.map((item, index) => (
            <div key={index} className="p-4 flex items-center justify-between">
              <div>
                <p className="font-semibold text-gray-800">{item.name}</p>
                <p className="text-sm text-gray-600">Color: {item.color}, Size: {item.size}</p>
                <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
              </div>
              <div className="text-sm font-medium text-pink-600">
                ₦{item.price.toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Payment Info */}
      <div className="text-sm text-gray-700">
        <h4 className="font-semibold text-gray-800 mb-2">Payment Summary:</h4>
        <p><strong>Paid:</strong> ₦{amount_paid.toLocaleString()}</p>
        <p><strong>Method:</strong> {transaction?.type || "Flutterwave"}</p>
        <p><strong>Status:</strong> {transaction?.txn?.status}</p>
        <p><strong>Transaction ID:</strong> {transaction?.txn?.transaction_id}</p>
        <p><strong>Reference:</strong> {transaction?.txn?.tx_ref}</p>
      </div>
    </div>
  );
};

export default OrderReceipt;
