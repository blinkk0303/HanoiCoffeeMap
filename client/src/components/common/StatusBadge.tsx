import {Badge} from "@/components/ui/badge"
import {cn} from "@/lib/utils"


const STATUS_CONFIG = {
  // User status
  true: {
    label: "Active",
    className: "bg-green-50 text-green-700 border-green-200 dark:bg-green-950 dark:text-green-300",
  },
  false: {
    label: "Inactive",
    className: "bg-gray-100 text-gray-600 border-gray-200 dark:bg-gray-800 dark:text-gray-400",
  },

  // Cafe operating status
  OPEN: {
    label: "Mở cửa",
    className: "bg-green-50 text-green-700 border-green-200 dark:bg-green-950 dark:text-green-300",
  },
  CLOSED: {
    label: "Đóng cửa",
    className: "bg-gray-100 text-gray-600 border-gray-200",
  },
  MAINTENANCE: {
    label: "Tạm đóng cửa",
    className: "bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-950 dark:text-yellow-300",
  },

  // Cafe approval status
  PENDING: {
    label: "Chờ duyệt",
    className: "bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-950 dark:text-yellow-300",
  },
  APPROVED: {
    label: "Đã duyệt",
    className: "bg-green-50 text-green-700 border-green-200 dark:bg-green-950 dark:text-green-300",
  },
  REJECTED: {
    label: "Từ chối",
    className: "bg-red-50 text-red-700 border-red-200 dark:bg-red-950 dark:text-red-300",
  },
} as const;

// Tự động trích xuất union type từ các key của STATUS_CONFIG
export type StatusKey = keyof typeof STATUS_CONFIG;

interface StatusBadgeProps {
    status: StatusKey | boolean | (string & {}) | null | undefined;
    className?: string;
}

export const StatusBadge = ({status, className}: StatusBadgeProps) => {
  const normalizedKey = typeof status === "boolean"? String(status): status?.toUpperCase();
  const config = normalizedKey ? STATUS_CONFIG[normalizedKey as StatusKey] : undefined;

  if(!config){
    return (
      <Badge variant="outline" className={cn("bg-gray-100 text-gray-600 px-2.5 py-0.5 rounded-full text-xs font-semibold",className)}>
        Unknown
      </Badge>
    );
  }

  return (
    <Badge variant="outline" className={cn("px-2.5 py-0.5 rounded-full text-xs font-semibold",config.className,className)}>
      {config.label}
    </Badge>
  )

}