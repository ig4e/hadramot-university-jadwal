"use client";

import { ChevronLeftIcon } from "@heroicons/react/20/solid";
import { Button, LoadingOverlay } from "@mantine/core";
import Link from "next/link";
import React, { useState } from "react";
import PageHeader from "~/components/page-header";
import { DaysIndex, TeacherForm } from "../../teacher-form";
import { api } from "~/trpc/react";
import { useParams, useRouter } from "next/navigation";
import { notifications } from "@mantine/notifications";
import { Prisma } from "@prisma/client";

const teacher = Prisma.validator<Prisma.TeacherDefaultArgs>()({
  include: { subjects: true, workDates: { include: { day: true } } },
});
type Teacher = Prisma.TeacherGetPayload<typeof teacher>;

function page() {
  const [notificationIDs, setNotificationIDs] = useState<{
    [index: string]: string;
  }>({});

  const router = useRouter();

  const { id: teacherId } = useParams();

  const { data, isLoading, isError } = api.teacher.get.useQuery(
    {
      where: { id: Number(teacherId) },
      include: { subjects: true, workDates: { include: { day: true } } },
    },
    {
      enabled: !!teacherId,

      onSuccess(data) {
        if (!data) {
          notifications.show({
            loading: false,
            title: "فشل!",
            message: `تعذر الحصول على المعلم`,
            color: "red",
            autoClose: 5000,
            withCloseButton: true,
          });
          router.push("/teachers");
        }
      },
    },
  );

  const teacherData = data as unknown as Teacher;

  const editTeacher = api.teacher.update.useMutation({
    onMutate(variables) {
      const id = notifications.show({
        loading: true,
        title: "يرجى الانتظار",
        message: "جارى تعديل المعلم",
        autoClose: false,
        withCloseButton: false,
      });

      setNotificationIDs((state) => ({ ...state, [variables.where.id!]: id }));
    },
    onSuccess(data, variables, context) {
      const notificationId = notificationIDs[variables.where.id!];
      if (notificationId)
        notifications.update({
          id: notificationId,
          loading: false,
          title: "نجاح!",
          message: "تم تعديل المعلم",
          color: "green",
          autoClose: 5000,
          withCloseButton: true,
        });

      router.push("/teachers");
    },
    onError(error, variables, context) {
      const notificationId = notificationIDs[variables.where.id!];
      if (notificationId)
        notifications.update({
          id: notificationId,
          loading: false,
          title: "فشل!",
          message: `تعذر تعديل المعلم بسبب :` + error.message,
          color: "red",
          autoClose: 5000,
          withCloseButton: true,
        });
    },
  });

  return (
    <div>
      <PageHeader title="تعديل معلم">
        <Link href="/teachers">
          <Button leftSection={<ChevronLeftIcon className="h-5 w-5" />}>
            رجوع
          </Button>
        </Link>
      </PageHeader>

      <div className="relative">
        <LoadingOverlay visible={isLoading}></LoadingOverlay>

        <TeacherForm
          initialValues={{
            name: teacherData?.name,
            subjectIDs: teacherData?.subjects.map(({ id }) => id) || [],
            workDates:
              teacherData?.workDates.map((workDate) => ({
                ...workDate,
                day: workDate.day.name as DaysIndex,
              })) || [],
          }}
          onSubmit={(values) => {
            editTeacher.mutate({ where: { id: teacherData.id! }, ...values });
          }}
        ></TeacherForm>
      </div>
    </div>
  );
}

export default page;
