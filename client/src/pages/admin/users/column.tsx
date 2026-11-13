import { createColumnHelper } from "@tanstack/react-table"
import { type DataTableFeatures } from "../../../components/data-table-features"
import { User } from "@/types/user"
import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowUpDown } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import RoleBadge from "@/components/common/RoleBadge";
import StatusBadge from "@/components/common/StatusBadge";


// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.


// Use `accessor` for data columns and `display` for columns without one.
const columnHelper = createColumnHelper<DataTableFeatures, User>()

export const columns = columnHelper.columns([
  columnHelper.display({
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        indeterminate={
          table.getIsSomePageRowsSelected() && !table.getIsAllPageRowsSelected()
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  }),

  columnHelper.accessor("full_name", {
    header: "Tên đầy đủ",
  }),
  columnHelper.accessor("email", {
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  }),
  columnHelper.accessor("role", {
    header: "Vai trò",
    cell: ({row}) => {
      return <RoleBadge role={row.original.role} />;
    }
  }),
  columnHelper.accessor("is_active", {
    header: "Trạng thái",
    cell: ({row}) => {
      return (
      <StatusBadge status={row.original.is_active} />
      )
    }
  }),
  columnHelper.display({
    id: "actions",
  cell: ({ row }) => {
    const user = row.original
    return (
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          }
        />
        <DropdownMenuContent align="end">
          <DropdownMenuGroup>
            <DropdownMenuLabel>Thao tác</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(user.id)}>
              Xem chi tiết
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>Sửa</DropdownMenuItem>
            <DropdownMenuItem variant="destructive">Xóa</DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    )
    },
  }),
])

