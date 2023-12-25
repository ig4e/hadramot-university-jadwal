import { ChevronLeftIcon } from "@heroicons/react/20/solid";
import { ActionIcon, Button } from "@mantine/core";
import { IconFileImport } from "@tabler/icons-react";
import Link from "next/link";
import PageHeader from "~/components/page-header";

export default function Home() {
  return (
    <main className="">
      <PageHeader title="أنشاء جدول">
        <Link href="/">
          <Button leftSection={<ChevronLeftIcon className="h-5 w-5" />}>
            رجوع
          </Button>
        </Link>
      </PageHeader>
    </main>
  );
}
