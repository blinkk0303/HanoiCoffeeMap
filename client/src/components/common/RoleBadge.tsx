import {Badge} from "@/components/ui/badge"
import type { UserRole } from "@/types/user";

interface RoleBadgeProps {
  role: UserRole;
}

const roleStyles: Record<UserRole, string> = {
  ADMIN: "bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300",
  USER: "bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
  OWNER: "bg-purple-50 text-purple-700 dark:bg-purple-950 dark:text-purple-300",
};

const RoleBadge = ({role} : RoleBadgeProps) => {
    return (
        <Badge variant="outline" className={`px-2 py-1 rounded-full text-sm font-semibold ${roleStyles[role]}`}>
            {role.toLocaleLowerCase()}
        </Badge>
    )
}

export default RoleBadge;


