"use client";

import { Group, LoadingOverlay, Table } from "@mantine/core";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { RouterInputs, RouterOutputs } from "~/trpc/shared";
import { Pagination } from "@mantine/core";

// import {
//   Table,
//   TableBody,
//   Table.Td,
//   TableHead,
//   TableHeader,
//   Table.Tr,
// } from "~/components/ui/table";

interface DataTableProps<TData, TValue, AContext> {
  isLoading?: boolean | undefined;
  columns: ColumnDef<TData, TValue>[];
  data?: TData[] | undefined;
  additionalContext?: AContext;
  pageInfo?: RouterOutputs["subject"]["list"]["pageInfo"];
  onPageChange?: (page: number) => void;
}

export function DataTable<TData, TValue, AContext>({
  columns,
  data = [],
  isLoading = false,
  additionalContext,
  pageInfo,
  onPageChange,
}: DataTableProps<TData, TValue, AContext>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="relative space-y-4">
      <div className="rounded-md border bg-neutral-100">
        <LoadingOverlay
          visible={isLoading}
          zIndex={1000}
          overlayProps={{ radius: "md", blur: 2 }}
        ></LoadingOverlay>

        <Table stickyHeader>
          <Table.Thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <Table.Tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <Table.Th key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </Table.Th>
                  );
                })}
              </Table.Tr>
            ))}
          </Table.Thead>
          <Table.Tbody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <Table.Tr
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <Table.Td key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, {
                        ...cell.getContext(),
                        ...(additionalContext || {}),
                      })}
                    </Table.Td>
                  ))}
                </Table.Tr>
              ))
            ) : (
              <Table.Tr>
                <Table.Td colSpan={columns.length} className="h-24 text-center">
                  لا توجد نتائج.
                </Table.Td>
              </Table.Tr>
            )}
          </Table.Tbody>
        </Table>
      </div>

      {pageInfo && (
        <div className="flex w-full items-center justify-center">
          <Pagination
            disabled={isLoading}
            total={pageInfo.totalPages}
            onChange={(v) => onPageChange?.(v)}
          />
        </div>
      )}
    </div>
  );
}
