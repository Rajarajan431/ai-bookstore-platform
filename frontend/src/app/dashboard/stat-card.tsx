import { Card, CardContent } from "@/components/ui/card";
import * as Icons from "lucide-react";

interface Props {
  title: string;
  value: string | number;
  icon: keyof typeof Icons;
}

export default function StatCard({ title, value, icon }: Props) {
  const Icon = Icons[icon] as Icons.LucideIcon;

  return (
    <Card className="hover:shadow-md transition">
      <CardContent className="p-6 flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="text-2xl font-bold">{value}</p>
        </div>

        <div className="rounded-full bg-muted p-3">
          <Icon className="w-5 h-5 text-primary" />
        </div>
      </CardContent>
    </Card>
  );
}
