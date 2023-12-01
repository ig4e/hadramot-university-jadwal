"use client";

import React, { useEffect } from "react";
import { useDisclosure } from "@mantine/hooks";
import { Modal, Button, TextInput, Group } from "@mantine/core";
import { Slot } from "@radix-ui/react-slot";
import { useForm, zodResolver } from "@mantine/form";
import { z } from "zod";

const subjectSchema = z.object({
  name: z.string().min(2, { message: "الأسم يجب ان يكون اكثر من حرفين" }),
});

type SubjectSchema = z.infer<typeof subjectSchema>;

interface SubjectModalProps {
  title: string;
  children: React.ReactNode;
  initialValues?: SubjectSchema;
  onSubmit: (values: SubjectSchema, close: () => void) => void;
}

function SubjectModal({
  children,
  title,
  initialValues,
  onSubmit,
}: SubjectModalProps) {
  const form = useForm({
    validate: zodResolver(subjectSchema),
    initialValues: {
      name: "",
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
        <form onSubmit={form.onSubmit((data) => onSubmit(data, close))}>
          <TextInput
            label="أسم المادة"
            placeholder="جبر"
            {...form.getInputProps("name")}
          />

          <Group justify="flex-end" mt="xl" gap={"xs"}>
            <Button type="button" variant="outline" color="gray" onClick={close}>
              ألغاء
            </Button>
            <Button type="submit">حفظ</Button>
          </Group>
        </form>
      </Modal>
    </>
  );
}

export default SubjectModal;
