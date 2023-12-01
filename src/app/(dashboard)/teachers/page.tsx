"use client";

import { Button } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import Link from "next/link";
import { useState } from "react";
import { DataTable } from "~/components/data-table";
import PageHeader from "~/components/page-header";
import { api } from "~/trpc/react";
import { RouterInputs } from "~/trpc/shared";
import { columns } from "./columns";

export default function Home() {
  const [pageProps, setPageProps] = useState<RouterInputs["teacher"]["list"]>({
    page: 1,
    include: {
      subjects: true,
    },
  });

  const { data, isLoading, isError } = api.teacher.list.useQuery(pageProps);

  return (
    <main className="space-y-8">
      <PageHeader title="المعلمين">
        <Link href="/teachers/create">
          <Button leftSection={<IconPlus />}>إضافة معلم</Button>
        </Link>
      </PageHeader>

      <DataTable columns={columns} data={data?.items as any}></DataTable>
    </main>
  );
}
