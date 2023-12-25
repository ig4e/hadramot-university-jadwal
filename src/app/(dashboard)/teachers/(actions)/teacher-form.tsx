"use client";
import {
  ActionIcon,
  Button,
  Group,
  Loader,
  MultiSelect,
  Tabs,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import "dayjs/locale/ar";
import { TimeInput } from "~/components/ui/time-picker";

import { useForm, zodResolver } from "@mantine/form";
import { IconPlus, IconTrash } from "@tabler/icons-react";
import { useDebounce } from "@uidotdev/usehooks";
import { useEffect, useState } from "react";
import { z } from "zod";
import { convertNumberToTimeString, timeStringToNumber } from "~/lib/utils";
import { api } from "~/trpc/react";

const schema = z.object({
  name: z.string().min(2, { message: "الاسم يجب ان يكون حرفين على الاقل" }),
  subjectIDs: z
    .string()
    .array()
    .min(1, { message: "يجب ان يكون لدي المعلم مادة واحدة على الاقل" }),
  workDates: z
    .object({
      id: z.number().optional(),
      day: z.string(),
      startsAt: z.string({
        required_error: "مطلوب",
      }),
      endsAt: z.string({
        required_error: "مطلوب",
      }),
    })
    .array()
    .min(1, { message: "يجب ان يكون للمعلم معاد عمل واحد على الاقل" }),
});

type TeacherCreateSchema = z.infer<typeof schema>;

export const days = [
  "SUNDAY",
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
  "SATURDAY",
] as const;

export type DaysIndex =
  | "SUNDAY"
  | "MONDAY"
  | "TUESDAY"
  | "WEDNESDAY"
  | "THURSDAY"
  | "FRIDAY"
  | "SATURDAY";

export const localizeDays = {
  SUNDAY: "الأحد",
  MONDAY: "الأثنين",
  TUESDAY: "الثلاثاء",
  WEDNESDAY: "الأربعاء",
  THURSDAY: "الخميس",
  FRIDAY: "الجمعة",
  SATURDAY: "السبت",
} as const;

interface TeacherSchema {
  name: string;
  subjectIDs: number[];
  workDates: {
    id?: number;
    day: DaysIndex;
    startsAt: number;
    endsAt: number;
  }[];
}

interface TeacherFormProps {
  initialValues?: TeacherSchema;
  onSubmit: (values: TeacherSchema) => void;
}

export function TeacherForm({ onSubmit, initialValues }: TeacherFormProps) {
  const [searchValue, setSearchValue] = useState("");
  const debouncedSearch = useDebounce(searchValue, 500);

  const form = useForm<TeacherCreateSchema>({
    initialValues: {
      name: "",
      subjectIDs: [],
      workDates: [
        {
          day: "SUNDAY",
          startsAt: "08:00",
          endsAt: "16:00",
        },
      ],
    },
    validate: zodResolver(schema),
    validateInputOnChange: true,
    transformValues: (values) => ({
      ...values,
      subjectIDs: values.subjectIDs.map((v) =>
        Number(v),
      ) as unknown as string[],
      workDates: values.workDates.map((v) => ({
        ...v,
        startsAt: timeStringToNumber(v.startsAt) as unknown as string,
        endsAt: timeStringToNumber(v.endsAt) as unknown as string,
      })),
    }),
  });

  useEffect(() => {
    if (initialValues)
      form.setValues({
        name: initialValues.name,
        subjectIDs: initialValues.subjectIDs.map((v) => String(v)),
        workDates: initialValues.workDates.map((v) => ({
          ...v,
          startsAt: convertNumberToTimeString(v.startsAt),
          endsAt: convertNumberToTimeString(v.endsAt),
        })),
      });
  }, [initialValues]);

  const { data: subjectsData, isLoading: subjectsLoading } =
    api.subject.list.useQuery(
      {
        page: 1,
        limit: 100,
        where: {
          OR: [
            { name: { contains: debouncedSearch } },
            { id: { in: form.values.subjectIDs.map((v) => Number(v)) } },
          ],
        },
      },
      { keepPreviousData: true },
    );

  return (
    <form
      onSubmit={form.onSubmit((values) =>
        onSubmit(values as unknown as TeacherSchema),
      )}
      className="space-y-8"
    >
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <TextInput
          label="الأسم"
          id="name"
          type="text"
          {...form.getInputProps("name")}
        />

        <MultiSelect
          label="المواد"
          rightSection={
            subjectsLoading ? <Loader size={"xs"}></Loader> : undefined
          }
          searchable
          searchValue={searchValue}
          onSearchChange={setSearchValue}
          type="subjects"
          id="subjects"
          data={
            subjectsData?.items.map((subject) => ({
              label: subject.name,
              value: String(subject.id),
            })) || []
          }
          {...form.getInputProps("subjectIDs")}
        />
      </div>

      <div className="space-y-4">
        <Title order={3}>توافر المعلم</Title>
        <Text color="red">{form.errors.workDates}</Text>
        <Tabs defaultValue={"SUNDAY"}>
          <Tabs.List>
            {days.map((day) => {
              return (
                <Tabs.Tab key={day + "tab"} value={day}>
                  {localizeDays[day]}
                </Tabs.Tab>
              );
            })}
          </Tabs.List>

          {days.map((day, index) => {
            return (
              <Tabs.Panel
                key={day + "tabPanel"}
                value={day}
                pt="md"
                className="space-y-4"
              >
                <div className="flex justify-between">
                  <div>
                    <Title order={4}>
                      توافر المعلم يوم {localizeDays[day]}
                    </Title>
                    <Text size={"sm"}>
                      هنا يمكنك تحديد توافر المعلم فى يوم {localizeDays[day]}
                    </Text>
                  </div>

                  <Button
                    onClick={() =>
                      form.insertListItem("workDates", {
                        day: day,
                        startsAt: "08:00",
                        endsAt: "16:00",
                      })
                    }
                    leftSection={<IconPlus></IconPlus>}
                  >
                    <span>أضف وقت</span>
                  </Button>
                </div>

                <div className="space-y-2">
                  {form.values.workDates.map(
                    ({ id, day: workDateDay, startsAt, endsAt }, index) => {
                      if (day == workDateDay)
                        return (
                          <div key={id} className="flex items-end gap-2">
                            <Group>
                              <TimeInput
                                label="من"
                                {...form.getInputProps(
                                  `workDates.${index}.startsAt`,
                                )}
                              ></TimeInput>
                              <TimeInput
                                label="ألى"
                                {...form.getInputProps(
                                  `workDates.${index}.endsAt`,
                                )}
                              ></TimeInput>
                            </Group>

                            <ActionIcon
                              onClick={() =>
                                form.removeListItem("workDates", index)
                              }
                              color="red"
                              size={"lg"}
                            >
                              <IconTrash></IconTrash>
                            </ActionIcon>
                          </div>
                        );
                    },
                  )}
                </div>
              </Tabs.Panel>
            );
          })}
        </Tabs>
      </div>

      <Button type="submit" className="mt-4">
        حفظ
      </Button>
    </form>
  );
}
