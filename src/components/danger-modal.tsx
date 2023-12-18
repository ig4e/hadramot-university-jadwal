"use client";
import { Button, Group, Modal, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Slot } from "@radix-ui/react-slot";
import React, { useCallback } from "react";

interface DangerModalProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  onSubmit: (confirm: boolean) => void;
}

function DangerModal({
  children,
  onSubmit,
  title,
  description,
}: DangerModalProps) {
  const [opened, { open, close }] = useDisclosure(false, {});

  const handleCancel = useCallback(() => {
    close();
    onSubmit(false);
  }, [close, onSubmit]);

  const handleContinue = useCallback(() => {
    close();
    onSubmit(true);
  }, [close, onSubmit]);

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        title={title}
        centered
        closeOnClickOutside={false}
        closeOnEscape={false}
        withCloseButton={false}
      >
        <Text>
          {description
            ? description
            : "Modal without header, press escape or click on overlay to close"}
        </Text>

        <Group justify="flex-end" mt="xl" gap={"xs"}>
          <Button variant="outline" color="gray" onClick={handleCancel}>
            ألغاء
          </Button>
          <Button onClick={handleContinue} color="red">
            متابعة
          </Button>
        </Group>
      </Modal>

      <Slot onClick={open}>{children}</Slot>
    </>
  );
}

export default DangerModal;
