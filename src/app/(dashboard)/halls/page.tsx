"use client";

import { Button } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import PageHeader from "~/components/page-header";
import HallModal from "./hall-modal";
import { useMemo, useState } from "react";
import { RouterInputs } from "~/trpc/shared";
import { api } from "~/trpc/react";
import { DataTable, InnerDataTable } from "~/components/data-table";
import { columns } from "./columns";
import { notifications } from "@mantine/notifications";
import { usePaginatedTable } from "~/hooks/use-paginated-table";

export default function Home() {
  const [notificationIDs, setNotificationIDs] = useState<{
    [index: string]: string;
  }>({});

  const [pageProps, setPageProps] = useState<RouterInputs["hall"]["list"]>({
    page: 1,
  });

  const {
    data: rawData,
    isLoading,
    isError,
    refetch,
  } = api.hall.list.useQuery(pageProps);

  const data = useMemo(() => rawData, [rawData]);

  const createSubject = api.hall.create.useMutation({
    onMutate(variables) {
      const id = notifications.show({
        loading: true,
        title: "يرجى الانتظار",
        message: "جارى أضافة القاعة",
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
          message: "تم أضافة القاعة",
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
          message: `تعذر أضافة القاعة بسبب :` + error.message,
          color: "red",
          autoClose: 5000,
          withCloseButton: true,
        });
    },
  });

  const table = usePaginatedTable({
    pageCount: data?.pageInfo.totalPages,
    data: data?.items,
    columns,
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
      <PageHeader title="القاعات">
        <HallModal
          title="أضافة قاعة جديدة"
          onSubmit={(data, close) =>
            createSubject.mutate(
              { name: data.name, studentsCount: data.studentsCount },
              {
                onSuccess() {
                  close();
                },
              },
            )
          }
        >
          <Button leftSection={<IconPlus />}>إضافة قاعة</Button>
        </HallModal>
      </PageHeader>

      <InnerDataTable
        table={table}
        isLoading={isLoading}
        additionalContext={{ refetch }}
      ></InnerDataTable>
    </main>
  );
}
