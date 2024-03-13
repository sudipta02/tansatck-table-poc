import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";

import { labels, priorities, statuses } from "../data/data";
import { DataTableColumnHeader } from "./data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";

export const columns = [
  {
    accessorKey: "id",
    header: ({ column, header }) => (
      <DataTableColumnHeader column={column} title="Task" header={header} />
    ),
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        {row.getValue("id")}
      </div>
    ),
    // enableSorting: false,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
    enableHiding: false,
  },
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <div className="flex justify-center">
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
          className="translate-y-[2px]"
        />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
    size: 50,
  },
  {
    accessorKey: "date",
    header: ({ column, header }) => (
      <DataTableColumnHeader column={column} title="Date" header={header} />
    ),
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        {row.getValue("date")}
      </div>
    ),
    // size: 220,
    // enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "destination_id",
    header: ({ column, header }) => (
      <DataTableColumnHeader
        column={column}
        title="Destination ID"
        header={header}
      />
    ),
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        {row.getValue("destination_id")}
      </div>
    ),
    // enableSorting: false,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
    enableHiding: false,
  },
  {
    accessorKey: "destination_name",
    header: ({ column, header }) => (
      <DataTableColumnHeader
        column={column}
        title="Destination Name"
        header={header}
      />
    ),
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        {row.getValue("destination_name")}
      </div>
    ),
    // enableSorting: false,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
    enableHiding: false,
  },
  {
    accessorKey: "source_name",
    header: ({ column, header }) => (
      <DataTableColumnHeader
        column={column}
        title="Source Name"
        header={header}
      />
    ),
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        {row.getValue("source_name")}
      </div>
    ),
    // enableSorting: false,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
    enableHiding: false,
  },
  {
    accessorKey: "source_id",
    header: ({ column, header }) => (
      <DataTableColumnHeader
        column={column}
        title="Source ID"
        header={header}
      />
    ),
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        {row.getValue("source_id")}
      </div>
    ),
    // enableSorting: false,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
    enableHiding: false,
  },
  {
    accessorKey: "title",
    header: ({ column, header }) => (
      <DataTableColumnHeader column={column} title="Title" header={header} />
    ),
    cell: ({ row }) => {
      const label = labels.find((label) => label.value === row.original.label);

      return (
        <div className="flex space-x-2 ml-2">
          {label && <Badge variant="secondary">{label.label}</Badge>}
          {/* <span className="truncate font-normal max-w-[300px]">
            {row.getValue("title")}
          </span> */}
        </div>
      );
    },
    // size: 500,
    enableResizing: true,
  },
  {
    accessorKey: "status",
    header: ({ column, table, header }) => (
      <DataTableColumnHeader
        column={column}
        title="Status"
        options={statuses}
        table={table}
        header={header}
      />
    ),
    cell: ({ row }) => {
      const status = statuses.find(
        (status) => status.value === row.getValue("status")
      );

      if (!status) {
        return null;
      }

      return (
        <div className="flex items-center ml-2">
          {status.icon && (
            <status.icon className="mr-2 h-4 w-4 text-muted-foreground" />
          )}
          <span>{status.label}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
    enableResizing: true,
  },
  {
    accessorKey: "priority",
    header: ({ column, table, header }) => (
      <DataTableColumnHeader
        column={column}
        title="Priority"
        options={priorities}
        table={table}
        header={header}
      />
    ),
    cell: ({ row }) => {
      const priority = priorities.find(
        (priority) => priority.value === row.getValue("priority")
      );

      if (!priority) {
        return null;
      }

      return (
        <div className="flex items-center ml-2">
          {priority.icon && (
            <priority.icon className="mr-2 h-4 w-4 text-muted-foreground" />
          )}
          <span>{priority.label}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
    enableResizing: true,
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        <DataTableRowActions row={row} />
      </div>
    ),
    size: 50,
  },
];
