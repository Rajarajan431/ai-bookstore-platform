import { cn } from "@/lib/utils";

interface Props {
  status: "PENDING" | "SHIPPED" | "DELIVERED" | "CANCELLED";
}

export default function OrderStatusBadge({ status }: Props) {
  const styles = {
    PENDING: "bg-yellow-100 text-yellow-700",
    SHIPPED: "bg-blue-100 text-blue-700",
    DELIVERED: "bg-green-100 text-green-700",
    CANCELLED: "bg-red-100 text-red-700",
  };

  return (
    <span
      className={cn(
        "px-3 py-1 rounded-full text-xs font-medium",
        styles[status]
      )}
    >
      {status}
    </span>
  );
}
