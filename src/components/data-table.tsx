"use client";
import _ from "lodash";

import { LoadingOverlay, Pagination, Table } from "@mantine/core";
import {
  ColumnDef,
  Table as RTable,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { memo } from "react";

interface DataTableProps<TData, TValue, AContext> {
  isLoading?: boolean | undefined;
  columns: ColumnDef<TData, TValue>[];
  data?: TData[] | undefined;
  additionalContext?: AContext;
}

interface ExternalTableProps<T, AContext> {
  table: RTable<T>;
  isLoading?: boolean | undefined;
  additionalContext?: AContext;
}

export function InnerDataTable<T, AContext>({
  table,
  isLoading,
  additionalContext,
}: ExternalTableProps<T, AContext>) {
  return (
    <div className="space-y-4">
      <div className="relative overflow-x-auto rounded-xl border-2 border-slate-300  bg-neutral-200/50 dark:border-zinc-700 dark:bg-neutral-950">
        <LoadingOverlay
          visible={isLoading}
          zIndex={10}
          overlayProps={{ radius: "md", blur: 2 }}
        ></LoadingOverlay>

        <Table stickyHeader pt={"md"}>
          <Table.Thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <Table.Tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <Table.Th key={header.id} className="">
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
                <Table.Td
                  colSpan={table.getAllColumns().length}
                  className="h-24 text-center"
                >
                  لا توجد نتائج.
                </Table.Td>
              </Table.Tr>
            )}
          </Table.Tbody>
        </Table>
      </div>

      {table.getPageCount() > 0 && (
        <div className="flex w-full items-center justify-center">
          <Pagination
            total={table.getPageCount() || 1}
            onChange={(page) => table.setPageIndex(page)}
          />
        </div>
      )}
    </div>
  );
}

export function DataTable<TData, TValue, AContext>({
  columns,
  data = [],
  isLoading = false,
  additionalContext,
}: DataTableProps<TData, TValue, AContext>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <InnerDataTable
      table={table}
      additionalContext={additionalContext}
      isLoading={isLoading}
    />
  );
}
