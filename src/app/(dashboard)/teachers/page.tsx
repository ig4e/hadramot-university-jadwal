"use client";

import { Button } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import Link from "next/link";
import { useState } from "react";
import { DataTable, InnerDataTable } from "~/components/data-table";
import PageHeader from "~/components/page-header";
import { api } from "~/trpc/react";
import { RouterInputs } from "~/trpc/shared";
import { columns } from "./columns";
import { usePaginatedTable } from "~/hooks/use-paginated-table";

export default function Home() {
  const [pageProps, setPageProps] = useState<RouterInputs["teacher"]["list"]>({
    page: 1,
    include: {
      subjects: true,
    },
  });

  const { data, isLoading, isError } = api.teacher.list.useQuery(pageProps);

  const table = usePaginatedTable({
    pageCount: data?.pageInfo.totalPages,
    data: data?.items as any,
    columns: columns,
    onPaginationChange({ pageIndex, pageSize }) {
      setPageProps((state) => ({
        ...state,
        page: pageIndex > 0 ? pageIndex : 1,
        limit: pageSize,
      }));
    },
    pagination: {
      pageIndex: pageProps.page,
      pageSize: pageProps.limit,
    },
  });

  return (
    <main className="space-y-8">
      <PageHeader title="المعلمين">
        <Link href="/teachers/create">
          <Button leftSection={<IconPlus />}>إضافة معلم</Button>
        </Link>
      </PageHeader>

      <InnerDataTable table={table} isLoading={isLoading}></InnerDataTable>
    </main>
  );
}
