"use client";

import { Button } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import PageHeader from "~/components/page-header";
import MajorModal from "./major-modal";
import { useState } from "react";
import { RouterInputs } from "~/trpc/shared";
import { api } from "~/trpc/react";
import { DataTable } from "~/components/data-table";
import { columns } from "./columns";
import { notifications } from "@mantine/notifications";

export default function Home() {
  const [notificationIDs, setNotificationIDs] = useState<{
    [index: string]: string;
  }>({});

  const [pageProps, setPageProps] = useState<RouterInputs["major"]["list"]>({
    page: 1,
  });

  const { data, isLoading, isError, refetch } =
    api.major.list.useQuery(pageProps);

  const createMajor = api.major.create.useMutation({
    onMutate(variables) {
      const id = notifications.show({
        loading: true,
        title: "يرجى الانتظار",
        message: "جارى أضافة التخصص",
        autoClose: false,
        withCloseButton: false,
      });

      setNotificationIDs((state) => ({ ...state, [variables.name]: id }));
    },
    onSuccess(data, variables, context) {
      const notificationId = notificationIDs[variables.name];
      if (notificationId)
        notifications.update({
          id: notificationId,
          loading: false,
          title: "نجاح!",
          message: "تم أضافة التخصص",
          color: "green",
          autoClose: 5000,
          withCloseButton: true,
        });

      refetch();
    },
    onError(error, variables, context) {
      const notificationId = notificationIDs[variables.name];
      if (notificationId)
        notifications.update({
          id: notificationId,
          loading: false,
          title: "فشل!",
          message: `تعذر أضافة التخصص بسبب :` + error.message,
          color: "red",
          autoClose: 5000,
          withCloseButton: true,
        });
    },
  });

  return (
    <main className="space-y-8">
      <PageHeader title="التخصصات">
        <MajorModal
          title="أضافة تخصص جديد"
          onSubmit={(data, close) =>
            createMajor.mutate(
              { name: data.name, studentsCount: data.studentsCount },
              {
                onSuccess() {
                  close();
                },
              },
            )
          }
        >
          <Button leftSection={<IconPlus />}>إضافة تخصص</Button>
        </MajorModal>
      </PageHeader>

      <DataTable
        isLoading={isLoading}
        columns={columns}
        data={data?.items}
        additionalContext={{ refetch }}
        pageInfo={data?.pageInfo}
        onPageChange={(page) => {
          console.log(page);
          setPageProps((pageProps) => ({ ...pageProps, page }));
        }}
      ></DataTable>
    </main>
  );
}
