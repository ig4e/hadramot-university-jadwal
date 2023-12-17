"use client";

import React, { useEffect } from "react";
import { useDisclosure } from "@mantine/hooks";
import { Modal, Button, TextInput, Group, NumberInput } from "@mantine/core";
import { Slot } from "@radix-ui/react-slot";
import { useForm, zodResolver } from "@mantine/form";
import { z } from "zod";

const hallSchema = z.object({
  name: z.string().min(2, { message: "الأسم يجب ان يكون اكثر من حرفين" }),
  studentsCount: z.number().min(1, { message: "السعة يجب ان تكون اكثر من 1" }),
});

type HallSchema = z.infer<typeof hallSchema>;

interface HallModalProps {
  title: string;
  children: React.ReactNode;
  initialValues?: HallSchema;
  onSubmit: (values: HallSchema, close: () => void) => void;
}

function HallModal({
  children,
  title,
  initialValues,
  onSubmit,
}: HallModalProps) {
  const form = useForm({
    validate: zodResolver(hallSchema),
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
            label="أسم القاعة"
            placeholder="م-1"
            {...form.getInputProps("name")}
          />

          <NumberInput
            label="سعة طلاب القاعة"
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

export default HallModal;
