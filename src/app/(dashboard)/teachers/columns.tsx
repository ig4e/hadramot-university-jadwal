"use client";

import { Badge, Button, Menu } from "@mantine/core";
import { Prisma, Teacher } from "@prisma/client";
import { IconDotsVertical } from "@tabler/icons-react";
import { ColumnDef } from "@tanstack/react-table";

const teacherWithSubjects = Prisma.validator<Prisma.TeacherDefaultArgs>()({
  include: { subjects: true },
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
    id: "actions",
    cell: ({ row }) => {
      const teacher = row.original;

      return (
        <Menu>
          <Menu.Target>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <IconDotsVertical className="h-4 w-4" />
            </Button>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Label>Actions</Menu.Label>
            <Menu.Item
              onClick={() => navigator.clipboard.writeText(String(teacher.id))}
            >
              نسخ الرقم التسلسلى
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item>View customer</Menu.Item>
            <Menu.Item>View payment details</Menu.Item>
          </Menu.Dropdown>
        </Menu>
      );
    },
  },
];
