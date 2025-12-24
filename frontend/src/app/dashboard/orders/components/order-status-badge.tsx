import { cn } from "@/lib/utils";

const statusStyles: Record<string, string> = {
  PENDING: "bg-yellow-100 text-yellow-700",
  PAID: "bg-blue-100 text-blue-700",
  SHIPPED: "bg-purple-100 text-purple-700",
  COMPLETED: "bg-green-100 text-green-700",
  CANCELLED: "bg-red-100 text-red-700",
};

export default function OrderStatusBadge({
  status,
}: {
  status: string;
}) {
  return (
    <span
      className={cn(
        "px-3 py-1 rounded-full text-xs font-semibold",
        statusStyles[status]
      )}
    >
      {status}
    </span>
  );
}
