import { OrderItem } from "@/types/order";

export default function OrderItems({
  items,
}: {
  items: OrderItem[];
}) {
  return (
    <div className="divide-y mt-3">
      {items.map((item) => (
        <div
          key={item.id}
          className="py-2 flex justify-between text-sm"
        >
          <div>
            <p className="font-medium">{item.book.title}</p>
            <p className="text-gray-500">
              Qty: {item.quantity}
            </p>
          </div>

          <div className="font-medium">
            ₹ {item.price * item.quantity}
          </div>
        </div>
      ))}
    </div>
  );
}
