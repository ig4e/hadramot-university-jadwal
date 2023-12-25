"use client";

import { PencilSquareIcon, TrashIcon } from "@heroicons/react/20/solid";
import { Badge, Button, Menu } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { Prisma, Teacher } from "@prisma/client";
import { IconDotsVertical } from "@tabler/icons-react";
import { ColumnDef, RowData } from "@tanstack/react-table";
import Link from "next/link";
import { useState } from "react";
import DangerModal from "~/components/danger-modal";
import { api } from "~/trpc/react";

declare module "@tanstack/react-table" {
  interface CellContext<TData extends RowData, TValue> {
    refetch: () => void;
  }
}

const teacherWithSubjects = Prisma.validator<Prisma.TeacherDefaultArgs>()({
  include: { subjects: true, workDates: true },
});

export type TeacherWithSubjects = Prisma.TeacherGetPayload<
  typeof teacherWithSubjects
>;

export const columns: ColumnDef<TeacherWithSubjects>[] = [
  {
    accessorKey: "id",
    header: "الرقم التسلسلى",
  },
  {
    accessorKey: "name",
    header: "الأسم",
  },
  {
    accessorKey: "subjects",
    header: "المواد",
    cell: ({ getValue }) => {
      const subjects = getValue<TeacherWithSubjects["subjects"]>();

      return (
        <div className="flex flex-wrap gap-2">
          {subjects.map((subject) => (
            <Badge>{subject.name}</Badge>
          ))}
        </div>
      );
    },
  },
  {
    accessorKey: "workDates",
    header: "مواعيد العمل",
    cell: ({ getValue }) => {
      const workDates = getValue<TeacherWithSubjects["workDates"]>();

      return (
        <div className="flex flex-wrap gap-2">
          {workDates.map((workDate) => (
            <Badge variant={"outline"}>{workDate.endsAt}-{workDate.startsAt}</Badge>
          ))}
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row, refetch }) => {
      const teacher = row.original;
      const [notificationIDs, setNotificationIDs] = useState<{
        [index: string]: string;
      }>({});

      const deleteTeacher = api.teacher.delete.useMutation({
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
                  navigator.clipboard.writeText(String(teacher.id))
                }
              >
                نسخ الرقم التسلسلى
              </Menu.Item>
              <Menu.Divider />
              <Menu.Item
                component={Link}
                href={`/teachers/edit/${teacher.id}`}
                leftSection={<PencilSquareIcon className="h-4 w-4" />}
              >
                تعديل
              </Menu.Item>
              <DangerModal
                title="حذف المعلم"
                description="هل انت متأكد من حذف هذا المعلم؟"
                onSubmit={(result) => {
                  if (result) {
                    deleteTeacher.mutate(teacher.id);
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
