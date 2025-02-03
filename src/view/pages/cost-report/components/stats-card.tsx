interface StatsCardProps {
  title: string;
  value: string;
}

export function StatsCard({ title, value }: StatsCardProps) {
  return (
    <div className="flex flex-col gap-2 p-6 border rounded-md flex-1">
      <h2 className="font-bold text-2xl font-title">
        {title}
      </h2>
      <p className="text-xl">{value}</p>
    </div>
  );
}
