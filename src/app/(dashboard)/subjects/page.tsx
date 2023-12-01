"use client";

import { Button } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import PageHeader from "~/components/page-header";
import SubjectModal from "./subject-modal";
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
  const [pageProps, setPageProps] = useState<RouterInputs["subject"]["list"]>({
    page: 1,
  });

  const { data, isLoading, isError, refetch } =
    api.subject.list.useQuery(pageProps);

  const createSubject = api.subject.create.useMutation({
    onMutate(variables) {
      const id = notifications.show({
        loading: true,
        title: "يرجى الانتظار",
        message: "جارى أضافة المادة",
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
          message: "تم أضافة المادة",
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
          message: `تعذر أضافة المادة بسبب :` + error.message,
          color: "red",
          autoClose: 5000,
          withCloseButton: true,
        });
    },
  });

  return (
    <main className="space-y-8">
      <PageHeader title="المواد">
        <SubjectModal
          title="أضافة مادة جديدة"
          onSubmit={(data, close) =>
            createSubject.mutate(
              { name: data.name },
              {
                onSuccess() {
                  close();
                },
              },
            )
          }
        >
          <Button leftSection={<IconPlus />}>إضافة مادة</Button>
        </SubjectModal>
      </PageHeader>

      <DataTable
        columns={columns}
        data={data?.items}
        additionalContext={{ subjectsRefetch: refetch }}
      ></DataTable>
    </main>
  );
}
