import {
  IconEdit,
  IconLayersIntersect,
  IconListDetails,
  IconMicrophone,
  IconMicroscope,
  IconPlus,
  IconSchool,
  IconTable,
  IconWall,
} from "@tabler/icons-react";
import { MainNavItem, SidebarNavItem } from "~/types/nav";

export const dashboardRoutes: SidebarNavItem[] = [
  {
    title: "الجداول",
    href: "/tables",
    items: [
      {
        title: "عرض الجداول",
        href: "/",
        items: [],
        icon: IconTable,
      },
      {
        title: "أنشاء جدول",
        href: "/tables/create",
        items: [],
        icon: IconPlus,
        sub: true,
      },
      {
        title: "تعديل جدول",
        href: "/tables/edit",
        items: [],
        icon: IconEdit,
        sub: true,
      },
    ],
    icon: IconListDetails,
  },

  {
    title: "المعلمين",
    href: "/teachers",
    items: [
      {
        title: "عرض المعلمين",
        href: "/teachers",
        items: [],
        icon: IconSchool,
      },
      {
        title: "أنشاء معلم",
        href: "/teachers/create",
        items: [],
        icon: IconPlus,
        sub: true,
      },
      {
        title: "تعديل معلم",
        href: "/teachers/edit",
        items: [],
        icon: IconEdit,
        sub: true,
      },
    ],
    icon: IconSchool,
  },

  {
    title: "التحكم",
    items: [
      {
        title: "التخصصات",
        href: "/majors",
        items: [],
        icon: IconLayersIntersect,
      },
      {
        title: "المواد الدراسية",
        href: "/subjects",
        items: [],
        icon: IconMicroscope,
      },
      {
        title: "القاعات",
        href: "/halls",
        items: [],
        icon: IconWall,
      },
    ],
  },
];
