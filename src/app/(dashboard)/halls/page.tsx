import { Button } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import PageHeader from "~/components/page-header";

export default function Home() {
  return (
    <main className="">
      <PageHeader title="القاعات">
        <Button leftSection={<IconPlus />}>إضافة قاعة</Button>
      </PageHeader>
    </main>
  );
}
