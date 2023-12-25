"use client";

import { Button, Pagination } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconPlus } from "@tabler/icons-react";
import { useState } from "react";
import { InnerDataTable } from "~/components/data-table";
import PageHeader from "~/components/page-header";
import { api } from "~/trpc/react";
import { RouterInputs } from "~/trpc/shared";
import { columns } from "./columns";
import MajorModal from "./major-modal";
import { usePaginatedTable } from "~/hooks/use-paginated-table";

export default function Home() {
  const [notificationIDs, setNotificationIDs] = useState<{
    [index: string]: string;
  }>({});

  const [pageProps, setPageProps] = useState<RouterInputs["major"]["list"]>({
    page: 1,
  });

  const { data, isLoading, isFetching, isError, refetch, isPreviousData } =
    api.major.list.useQuery(
      {
        page: pageProps.page,
        limit: pageProps.limit,
        where: pageProps.where,
      },
      { keepPreviousData: true },
    );

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

  const table = usePaginatedTable({
    pageCount: data?.pageInfo.totalPages,
    data: data?.items,
    columns,
    onPaginationChange({ pageIndex, pageSize }) {
      setPageProps((state) => ({ ...state, page: pageIndex, limit: pageSize }));
    },
    pagination: {
      pageIndex: pageProps.page,
      pageSize: pageProps.limit,
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

      <InnerDataTable
        isLoading={isLoading || isPreviousData}
        table={table}
        additionalContext={{ refetch }}
      />
    </main>
  );
}
