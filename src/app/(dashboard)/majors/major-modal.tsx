"use client";

import React, { useEffect } from "react";
import { useDisclosure } from "@mantine/hooks";
import { Modal, Button, TextInput, Group, NumberInput } from "@mantine/core";
import { Slot } from "@radix-ui/react-slot";
import { useForm, zodResolver } from "@mantine/form";
import { z } from "zod";

const majorSchema = z.object({
  name: z.string().min(2, { message: "الأسم يجب ان يكون اكثر من حرفين" }),
  studentsCount: z.number().min(1, { message: "السعة يجب ان تكون اكثر من 1" }),
});

type MajorSchema = z.infer<typeof majorSchema>;

interface MajorModalProps {
  title: string;
  children: React.ReactNode;
  initialValues?: MajorSchema;
  onSubmit: (values: MajorSchema, close: () => void) => void;
}

function MajorModal({
  children,
  title,
  initialValues,
  onSubmit,
}: MajorModalProps) {
  const form = useForm({
    validate: zodResolver(majorSchema),
    initialValues: {
      name: "",
      studentsCount: 1,
    },
  });

  const [opened, { open, close }] = useDisclosure(false, {
    onClose: () => form.reset(),
  });

  useEffect(() => {
    if (initialValues && opened) form.setValues(initialValues);
  }, [initialValues, opened]);

  return (
    <>
      <Slot onClick={open}>{children}</Slot>

      <Modal opened={opened} onClose={close} title={title} centered>
        <form
          onSubmit={form.onSubmit((data) => onSubmit(data, close))}
          className="space-y-2"
        >
          <TextInput
            label="أسم التخصص"
            placeholder="نظم ادارة معلومات"
            {...form.getInputProps("name")}
          />

          <NumberInput
            label="عدد طلاب التخصص"
            placeholder="50"
            {...form.getInputProps("studentsCount")}
          />

          <Group justify="flex-end" mt="xl" gap={"xs"}>
            <Button
              type="button"
              variant="outline"
              color="gray"
              onClick={close}
            >
              ألغاء
            </Button>
            <Button type="submit">حفظ</Button>
          </Group>
        </form>
      </Modal>
    </>
  );
}

export default MajorModal;
