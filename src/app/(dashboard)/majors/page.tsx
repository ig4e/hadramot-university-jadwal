import { ActionIcon, Button } from "@mantine/core";
import { IconFileImport, IconPlus } from "@tabler/icons-react";
import PageHeader from "~/components/page-header";

export default function Home() {
  return (
    <main className="">
      <PageHeader title="التخصصات">
        <Button leftSection={<IconPlus />}>إضافة تخصص</Button>
      </PageHeader>
    </main>
  );
}
