"use client";

import { ChevronLeftIcon } from "@heroicons/react/20/solid";
import { Button, NumberInput } from "@mantine/core";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import PageHeader from "~/components/page-header";

function page() {
  const router = useRouter();
  return (
    <main className="">
      <PageHeader title="تعديل معلم">
        <Link href="/teachers">
          <Button leftSection={<ChevronLeftIcon className="h-5 w-5" />}>
            رجوع
          </Button>
        </Link>
      </PageHeader>

      <div className="max-w-sm">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            router.push(`/teachers/edit/${e.currentTarget.teacherId.value}`);
          }}
          className="space-y-2"
        >
          <NumberInput
            name="teacherId"
            label={"رقم المعلم التسلسلي"}
            hideControls
            required
          ></NumberInput>

          <Button type="submit">ذهاب</Button>
        </form>
      </div>
    </main>
  );
}

export default page;
