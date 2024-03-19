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

const getCommonPinningStyles = (column, tableElement) => {
  const isPinned = column.getIsPinned();
  const isLastLeftPinnedColumn =
    isPinned === "left" && column.getIsLastColumn("left");
  const isFirstRightPinnedColumn =
    isPinned === "right" && column.getIsFirstColumn("right");

  const getBoxShadow = () => {
    if (isLastLeftPinnedColumn && tableElement === "th") {
      return "-4px 0 4px -4px rgba(0,0,0,0.3) inset, inset 0px -1px 0px 0px rgba(0,0,0,0.1)";
    }
    if (isFirstRightPinnedColumn && tableElement === "th") {
      return "4px 0 4px -4px rgba(0,0,0,0.3) inset, inset -1px -1px 0px 0px rgba(0,0,0,0.1)";
    }
    if (isLastLeftPinnedColumn && tableElement === "td") {
      return "-4px 0 4px -4px rgba(0,0,0,0.3) inset";
    }
    if (isFirstRightPinnedColumn && tableElement === "td") {
      return "4px 0 4px -4px rgba(0,0,0,0.3) inset";
    }
  };

  return {
    // boxShadow: isLastLeftPinnedColumn
    //   ? "-4px 0 4px -4px gray inset"
    //   : isFirstRightPinnedColumn
    //   ? "4px 0 4px -4px gray inset"
    //   : undefined,
    boxShadow: getBoxShadow(),
    left: isPinned === "left" ? `${column.getStart("left")}px` : undefined,
    right: isPinned === "right" ? `${column.getAfter("right")}px` : undefined,
    opacity: isPinned ? 1 : 1,
    position: isPinned ? "sticky" : "relative",
    width: column.getSize(),
    zIndex: isPinned ? 1 : 0,
  };
};

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
    <div className="space-y-4 ">
      <DataTableToolbar table={table} />
      <div
        className="rounded-md border overflow-auto box-shadow-custom table-container"
        ref={tableContainerRef}
      >
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
                  const { column } = header;
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
                        ...getCommonPinningStyles(column, "th"),
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
                    const { column } = cell;
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
                          ...getCommonPinningStyles(column, "td"),
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
