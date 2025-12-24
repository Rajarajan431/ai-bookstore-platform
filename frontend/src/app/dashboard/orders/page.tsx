import OrdersClient from "./orders-client";

export default function OrdersPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">My Orders</h1>
      <OrdersClient />
    </div>
  );
}
