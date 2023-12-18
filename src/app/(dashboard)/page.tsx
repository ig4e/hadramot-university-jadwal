"use client";

import { ActionIcon, Button } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { IconFileImport } from "@tabler/icons-react";
import Link from "next/link";
import DangerModal from "~/components/danger-modal";
import PageHeader from "~/components/page-header";

export default function Home() {
  return (
    <main className="">
      <PageHeader title="الجداول">
        <Link href="/tables/create">
          <Button leftSection={<IconPlus />}>إضافة جدول</Button>
        </Link>
      </PageHeader>
    </main>
  );
}
