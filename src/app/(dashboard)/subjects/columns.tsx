"use client";

import { Badge, Button, Menu } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { Prisma } from "@prisma/client";
import { IconDotsVertical } from "@tabler/icons-react";
import { RowData } from "@tanstack/react-table";
import { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";
import DangerModal from "~/components/danger-modal";
import { api } from "~/trpc/react";
import SubjectModal from "./subject-modal";
import {
  DocumentDuplicateIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/20/solid";

const subject = Prisma.validator<Prisma.SubjectDefaultArgs>()({});

export type Subject = Prisma.SubjectGetPayload<typeof subject>;

declare module "@tanstack/react-table" {
  interface CellContext<TData extends RowData, TValue> {
    refetch: () => void;
  }
}

export const columns: ColumnDef<Subject>[] = [
  {
    accessorKey: "id",
    header: "الرقم التسلسلى",
  },
  {
    accessorKey: "name",
    header: "الأسم",
  },
  {
    id: "actions",
    cell: ({ row, refetch }) => {
      const [notificationIDs, setNotificationIDs] = useState<{
        [index: string]: string;
      }>({});

      const subject = row.original;

      const updateSubject = api.subject.update.useMutation({
        onMutate(variables) {
          const id = notifications.show({
            loading: true,
            title: "يرجى الانتظار",
            message: "جارى تعديل المادة",
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
              message: "تم تعديل المادة",
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
              message: `تعذر تعديل المادة بسبب :` + error.message,
              color: "red",
              autoClose: 5000,
              withCloseButton: true,
            });
        },
      });

      const deleteSubject = api.subject.delete.useMutation({
        onMutate(variables) {
          const id = notifications.show({
            loading: true,
            title: "يرجى الانتظار",
            message: "جارى حذف المادة",
            autoClose: false,
            withCloseButton: false,
          });

          setNotificationIDs((state) => ({ ...state, [variables]: id }));
        },
        onSuccess(data, variables, context) {
          const notificationId = notificationIDs[variables];
          if (notificationId)
            notifications.update({
              id: notificationId,
              loading: false,
              title: "نجاح!",
              message: "تم حذف المادة",
              color: "green",
              autoClose: 5000,
              withCloseButton: true,
            });

          refetch();
        },
        onError(error, variables, context) {
          const notificationId = notificationIDs[variables];
          if (notificationId)
            notifications.update({
              id: notificationId,
              loading: false,
              title: "فشل!",
              message: `تعذر حذف المادة بسبب :` + error.message,
              color: "red",
              autoClose: 5000,
              withCloseButton: true,
            });
        },
      });

      return (
        <div className="flex w-full justify-end">
          <Menu position="bottom-end" keepMounted>
            <Menu.Target>
              <Button variant="light" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <IconDotsVertical className="h-4 w-4" />
              </Button>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Label>الأوامر</Menu.Label>
              <Menu.Item
                onClick={() =>
                  navigator.clipboard.writeText(String(subject.id))
                }
                leftSection={<DocumentDuplicateIcon className="h-4 w-4" />}
              >
                نسخ الرقم التسلسلى
              </Menu.Item>
              <Menu.Divider />
              <SubjectModal
                title="تعديل المادة"
                initialValues={{ name: subject.name }}
                onSubmit={(data, close) => {
                  updateSubject.mutate(
                    { id: subject.id, name: data.name },
                    {
                      onSuccess() {
                        close();
                      },
                    },
                  );
                }}
              >
                <Menu.Item
                  leftSection={<PencilSquareIcon className="h-4 w-4" />}
                >
                  تعديل
                </Menu.Item>
              </SubjectModal>
              <DangerModal
                title="حذف المادة"
                description="هل انت متأكد من حذف هذة المادة؟"
                onSubmit={(result) => {
                  if (result) {
                    deleteSubject.mutate(subject.id);
                  }
                }}
              >
                <Menu.Item
                  leftSection={<TrashIcon className="h-4 w-4" />}
                  color="red"
                >
                  حذف
                </Menu.Item>
              </DangerModal>
            </Menu.Dropdown>
          </Menu>
        </div>
      );
    },
  },
];
