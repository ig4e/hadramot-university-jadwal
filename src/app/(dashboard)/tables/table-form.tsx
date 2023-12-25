"use client";
import "dayjs/locale/ar";
import { Button, TextInput } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { useEffect } from "react";
import { z } from "zod";
import { Day } from "~/types/validations";

const schema = z.object({
  majorId: z
    .number({ required_error: "الرجاء اختيار التخصص" })
    .int()
    .positive({ message: "رقم التخصص التسلسلى يجب ان يكون بالموجب" }),
  type: z
    .number({ required_error: "الرجاء اختيار نوع الجدول" })
    .int()
    .min(1)
    .max(2),
  level: z
    .number({ required_error: "الرجاء اختيار المستوى" })
    .int()
    .min(1)
    .max(4),
  semester: z
    .number({ required_error: "الرجاء اختيار الفصل الدراسي" })
    .int()
    .min(1)
    .max(2),

  subjects: z
    .object({
      subjectId: z
        .number({ required_error: "الرجاء اختيار المادة" })
        .int()
        .positive(),
      teacherId: z
        .number({ required_error: "الرجاء اختيار المعلم" })
        .int()
        .positive(),
      hallId: z
        .number({ required_error: "الرجاء اختيار القاعة" })
        .int()
        .positive(),
      day: Day,
      startsAt: z.string({
        required_error: "مطلوب",
      }),
      endsAt: z.string({
        required_error: "مطلوب",
      }),
    })
    .array()
    .min(1, { message: "يجب وجود معاد واحد فالجدول" }),
});

type TableCreateSchema = z.infer<typeof schema>;

interface TableSchema {}

interface TableFormProps {
  initialValues?: TableSchema;
  onSubmit: (values: TableSchema) => void;
}

export function TableForm({ onSubmit, initialValues }: TableFormProps) {
  //   const [searchValue, setSearchValue] = useState("");
  //   const debouncedSearch = useDebounce(searchValue, 500);

  const form = useForm<TableCreateSchema>({
    // initialValues: {},
    validate: zodResolver(schema),
    validateInputOnChange: true,
  });

  useEffect(() => {
    //if (initialValues) form.setValues({});
  }, [initialValues]);

  return (
    <form
      onSubmit={form.onSubmit((values) =>
        onSubmit(values as unknown as TableSchema),
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
      </div>

      <Button type="submit" className="mt-4">
        حفظ
      </Button>
    </form>
  );
}
