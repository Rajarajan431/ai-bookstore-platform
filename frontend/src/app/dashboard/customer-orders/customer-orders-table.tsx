"use client";

import { useAppDispatch } from "@/store/hooks";
import { changeOrderStatus } from "@/store/slices/sellerOrderSlice";
import OrderStatusBadge from "./order-status-badge";
import OrderStatusSelect from "./order-status-select";
import { SellerOrderItem } from "@/types/order";

interface Props {
  orders: SellerOrderItem[];
}

export default function CustomerOrdersTable({ orders }: Props) {
  const dispatch = useAppDispatch();

  return (
    <div className="bg-white rounded-xl border shadow-sm">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold">Customer Orders</h2>
        <p className="text-sm text-muted-foreground">
          Manage customer orders for your books
        </p>
      </div>

      <table className="w-full text-sm">
        <thead className="bg-muted/40">
          <tr>
            <th className="p-4 text-left">Book</th>
            <th className="p-4 text-left">Customer</th>
            <th className="p-4 text-left">Price</th>
            <th className="p-4 text-left">Status</th>
            <th className="p-4 text-left">Action</th>
          </tr>
        </thead>

        <tbody>
          {orders.map((order) => (
            <tr key={order.id} className="border-t">
              <td className="p-4 font-medium">
                {order.book.title}
              </td>

              <td className="p-4">
                <p>{order.order.buyer.name}</p>
                <p className="text-xs text-muted-foreground">
                  {order.order.buyer.email}
                </p>
              </td>

              <td className="p-4">
                ₹{order.price} × {order.quantity}
              </td>

              <td className="p-4">
                <OrderStatusBadge status={order.status} />
              </td>

              <td className="p-4">
                <OrderStatusSelect
                  value={order.status}
                  onChange={(status) =>
                    dispatch(
                      changeOrderStatus({
                        id: order.id,
                        status,
                      })
                    )
                  }
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
