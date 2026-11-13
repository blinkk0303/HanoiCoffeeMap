import {Badge} from "@/components/ui/badge"
import type { User } from "@/types/user";


interface StatusBadgeProps {
    status: User['is_active'];  
}
const StatusBadge = ({ status }: StatusBadgeProps) => {
  if (status === undefined) {
    return (
      <Badge variant="outline" className="bg-gray-100 text-gray-600">
        Unknown
      </Badge>
    );
  }

  return (
    <Badge
      variant="outline"
      className={
        status
          ? "bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300"
          : "bg-gray-100 text-gray-600 border-gray-200"
      }
    >
      {status ? "active" : "inactive"}
    </Badge>
  );
};

export default StatusBadge;