import {
  ColumnDef,
  PaginationState,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useEffect, useState } from "react";

interface _PaginationState {
  pageIndex: number;
  pageSize?: number;
}

interface TableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data?: TData[] | undefined;
  pageCount?: number;
  pagination: _PaginationState;
  onPaginationChange: (pagination: _PaginationState) => void;
}

export function usePaginatedTable<TData, TValue>({
  data,
  columns,
  pageCount,
  onPaginationChange,
  pagination: paginationProp,
}: TableProps<TData, TValue>) {
  const [pagination, setPagination] = useState<PaginationState>({
    ...(paginationProp as PaginationState),
  });

  useEffect(() => {
    onPaginationChange(pagination);
  }, [pagination]);

  const table = useReactTable({
    data: data ?? [],
    columns: columns,
    pageCount: pageCount ?? -1,
    state: {
      pagination: pagination as PaginationState,
    },
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    debugTable: true,
  });

  return table;
}
