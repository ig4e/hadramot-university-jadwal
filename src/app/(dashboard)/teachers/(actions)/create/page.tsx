"use client";
import { ChevronLeftIcon } from "@heroicons/react/20/solid";
import { Button } from "@mantine/core";
import Link from "next/link";
import PageHeader from "~/components/page-header";
import { TeacherForm } from "../teacher-form";
import { api } from "~/trpc/react";
import { notifications } from "@mantine/notifications";
import { useState } from "react";
import { useRouter } from "next/navigation";

function TeacherCreatePage() {
  const [notificationIDs, setNotificationIDs] = useState<{
    [index: string]: string;
  }>({});

  const router = useRouter();

  const createTeacher = api.teacher.create.useMutation({
    onMutate(variables) {
      const id = notifications.show({
        loading: true,
        title: "يرجى الانتظار",
        message: "جارى أضافة المعلم",
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
          message: "تم أضافة المعلم",
          color: "green",
          autoClose: 5000,
          withCloseButton: true,
        });

      router.push("/teachers");
    },
    onError(error, variables, context) {
      const notificationId = notificationIDs[variables.name];
      if (notificationId)
        notifications.update({
          id: notificationId,
          loading: false,
          title: "فشل!",
          message: `تعذر أضافة المعلم بسبب :` + error.message,
          color: "red",
          autoClose: 5000,
          withCloseButton: true,
        });
    },
  });

  return (
    <div>
      <PageHeader title="أضافة معلم">
        <Link href="/teachers">
          <Button leftSection={<ChevronLeftIcon className="h-5 w-5" />}>
            رجوع
          </Button>
        </Link>
      </PageHeader>

      <TeacherForm
        onSubmit={(values) => {
          createTeacher.mutate(values);
        }}
      ></TeacherForm>
    </div>
  );
}

export default TeacherCreatePage;
