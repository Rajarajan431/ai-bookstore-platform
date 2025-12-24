import { Order } from "@/types/order";
import OrderStatusBadge from "./order-status-badge";
import OrderItems from "./order-items";

export default function OrderCard({ order }: { order: Order }) {
  return (
    <div className="border rounded-xl bg-white shadow-sm p-5">
      <div className="flex justify-between items-center mb-3">
        <div>
          <p className="font-semibold">Order #{order.id}</p>
          <p className="text-sm text-gray-500">
            {new Date(order.createdAt).toLocaleDateString()}
          </p>
        </div>

        <OrderStatusBadge status={order.status} />
      </div>

      <OrderItems items={order.items} />

      <div className="flex justify-end font-semibold mt-4">
        Total: ₹ {order.total}
      </div>
    </div>
  );
}
