import { PendingOrder } from "@/types/analytics";

export default function PendingOrders({
  orders,
}: {
  orders: PendingOrder[];
}) {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <h2 className="mb-4 font-semibold">Pending Orders</h2>

      {orders && orders.length === 0 ? (
        <p className="text-sm text-muted-foreground">No pending orders</p>
      ) : (
        <ul className="space-y-3">
          {orders.map((order) => (
            <li
              key={order.id}
              className="flex justify-between text-sm"
            >
              <span>Order #{order.id}</span>
              <span>₹{order.total}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
