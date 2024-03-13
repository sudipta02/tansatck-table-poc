import * as React from "react";
import {
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { DataTablePagination } from "../components/data-table-pagination";
import { DataTableToolbar } from "../components/data-table-toolbar";
import { useVirtualizer } from "@tanstack/react-virtual";

import "./table.css";

export function DataTable({ columns, data }) {
  const [rowSelection, setRowSelection] = React.useState({});
  const [columnVisibility, setColumnVisibility] = React.useState({});
  const [columnFilters, setColumnFilters] = React.useState([]);
  const [sorting, setSorting] = React.useState([]);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
    },
    initialState: {
      columnPinning: {
        left: ["select"],
        right: ["actions"],
      },
    },
    defaultColumn: {
      size: 200,
      minSize: 50,
      maxSize: 600,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    columnResizeMode: "onChange",
    enableColumnResizing: true,
    enableColumnPinning: true,
  });

  const visibleColumns = table.getVisibleLeafColumns();
  const tableContainerRef = React.useRef(null);

  const columnVirtualizer = useVirtualizer({
    count: visibleColumns.length,
    estimateSize: (index) => visibleColumns[index].getSize(),
    getScrollElement: () => tableContainerRef.current,
    horizontal: true,
    overscan: 3,
  });
  const virtualColumns = columnVirtualizer.getVirtualItems();

  let virtualPaddingLeft;
  let virtualPaddingRight;

  if (columnVirtualizer && virtualColumns?.length) {
    virtualPaddingLeft = virtualColumns[0]?.start ?? 0;
    virtualPaddingRight =
      columnVirtualizer.getTotalSize() -
      (virtualColumns[virtualColumns.length - 1]?.end ?? 0);
  }
  const totalTableWidth = table.getTotalSize();

  return (
    <div className="space-y-4">
      <DataTableToolbar table={table} />
      <div className="rounded-md border overflow-auto" ref={tableContainerRef}>
        <table
          style={{
            width: totalTableWidth,
            // borderTop: "solid 1px #424242",
            // borderLeft: "solid 1px #424242",
          }}
        >
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {virtualPaddingLeft ? (
                  //fake empty column to the left for virtualization scroll padding
                  <th style={{ display: "flex", width: virtualPaddingLeft }} />
                ) : null}
                {virtualColumns.map((vc) => {
                  const header = headerGroup.headers[vc.index];
                  return (
                    <th
                      key={header.id}
                      // colSpan={header.colSpan}
                      // className={`w-[${dynamicWidth}px] bg-slate-300`}
                      style={{
                        width: header.getSize(),
                        // display: "flex",
                        // borderRight: "solid 2px rgba(0,0,0,0.1)",
                        // boxShadow: "1px 0px 0.3px 0.3px rgba(0,0,0,0.1)",
                        // borderBottom: "solid 1px #424242",
                      }}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                      <div
                        onMouseDown={header.getResizeHandler()}
                        onTouchStart={header.getResizeHandler()}
                        // onDoubleClick={() => header.column.resetSize()}
                        className={`resizer ${
                          header.column.getIsResizing() ? "isResizing" : ""
                        }`}
                      />
                    </th>
                  );
                })}
                {virtualPaddingRight ? (
                  //fake empty column to the right for virtualization scroll padding
                  <th style={{ display: "flex", width: virtualPaddingRight }} />
                ) : null}
              </tr>
            ))}
          </thead>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => {
                    const dynamicWidth = cell.column.getSize();
                    // console.log({ cellWidth: dynamicWidth });
                    return (
                      <td
                        key={cell.id}
                        // className={`w-[${dynamicWidth}px] bg-orange-100`}
                        style={{
                          width: cell.column.getSize(),
                          padding: "5px 0",
                          // borderRight: "solid 1px #424242",
                          // borderBottom: "solid 1px #424242",
                        }}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    );
                  })}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </table>
      </div>
      <DataTablePagination table={table} />
    </div>
  );
}
