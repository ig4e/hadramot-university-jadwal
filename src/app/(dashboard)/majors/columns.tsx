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
import MajorModal from "./major-modal";
import {
  DocumentDuplicateIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/20/solid";

const major = Prisma.validator<Prisma.MajorDefaultArgs>()({});

export type Major = Prisma.MajorGetPayload<typeof major>;

declare module "@tanstack/react-table" {
  interface CellContext<TData extends RowData, TValue> {
    refetch: () => void;
  }
}

export const columns: ColumnDef<Major>[] = [
  {
    accessorKey: "id",
    header: "الرقم التسلسلى",
  },
  {
    accessorKey: "name",
    header: "الأسم",
  },
  {
    accessorKey: "studentsCount",
    header: "سعة الطلاب",
  },
  {
    id: "actions",
    cell: ({ row, refetch }) => {
      const [notificationIDs, setNotificationIDs] = useState<{
        [index: string]: string;
      }>({});

      const major = row.original;

      const updateMajor = api.major.update.useMutation({
        onMutate(variables) {
          const id = notifications.show({
            loading: true,
            title: "يرجى الانتظار",
            message: "جارى تعديل التخصص",
            autoClose: false,
            withCloseButton: false,
          });

          setNotificationIDs((state) => ({ ...state, [variables.id]: id }));
        },
        onSuccess(data, variables, context) {
          const notificationId = notificationIDs[variables.id];
          if (notificationId)
            notifications.update({
              id: notificationId,
              loading: false,
              title: "نجاح!",
              message: "تم تعديل التخصص",
              color: "green",
              autoClose: 5000,
              withCloseButton: true,
            });

          refetch();
        },
        onError(error, variables, context) {
          const notificationId = notificationIDs[variables.id];
          if (notificationId)
            notifications.update({
              id: notificationId,
              loading: false,
              title: "فشل!",
              message: `تعذر تعديل التخصص بسبب :` + error.message,
              color: "red",
              autoClose: 5000,
              withCloseButton: true,
            });
        },
      });

      const deleteMajor = api.major.delete.useMutation({
        onMutate(variables) {
          const id = notifications.show({
            loading: true,
            title: "يرجى الانتظار",
            message: "جارى حذف التخصص",
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
              message: "تم حذف التخصص",
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
              message: `تعذر حذف التخصص بسبب :` + error.message,
              color: "red",
              autoClose: 5000,
              withCloseButton: true,
            });
        },
      });

      return (
        <div className="flex w-full justify-end pe-4">
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
                onClick={() => navigator.clipboard.writeText(String(major.id))}
                leftSection={<DocumentDuplicateIcon className="h-4 w-4" />}
              >
                نسخ الرقم التسلسلى
              </Menu.Item>
              <Menu.Divider />
              <MajorModal
                title="تعديل التخصص"
                initialValues={{
                  name: major.name,
                  studentsCount: major.studentsCount,
                }}
                onSubmit={(data, close) => {
                  updateMajor.mutate(
                    {
                      id: major.id,
                      name: data.name,
                      studentsCount: data.studentsCount,
                    },
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
              </MajorModal>
              <DangerModal
                title="حذف التخصص"
                description="هل انت متأكد من حذف هذة التخصص؟"
                onSubmit={(result) => {
                  if (result) {
                    deleteMajor.mutate(major.id);
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
