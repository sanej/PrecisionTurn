import { Card } from '@/components/ui/card';

export function LoadingCard() {
  return (
    <Card className="p-4 bg-white">
      <div className="h-4 w-24 bg-gray-100 rounded animate-pulse" />
      <div className="mt-2 flex justify-between items-end">
        <div className="h-8 w-16 bg-gray-100 rounded animate-pulse" />
        <div className="h-4 w-12 bg-gray-100 rounded animate-pulse" />
      </div>
    </Card>
  );
}