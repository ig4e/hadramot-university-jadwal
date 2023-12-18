import React, { useCallback, useEffect, useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import { Modal, Button, TextInput, Text, Group } from "@mantine/core";
import { Slot } from "@radix-ui/react-slot";

interface DangerModalProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  onSubmit: (result: boolean) => void;
}

function DangerModal({
  children,
  onSubmit,
  title,
  description,
}: DangerModalProps) {
  const [value, setValue] = useState(false);

  const onClose = useCallback(() => {
    onSubmit?.(value || false);
  }, [value]);

  const [opened, { open, close }] = useDisclosure(false, {
    onClose,
  });

  return (
    <>
      <Modal opened={opened} onClose={close} title={title} centered>
        <Text>
          {description
            ? description
            : "Modal without header, press escape or click on overlay to close"}
        </Text>

        <Group justify="flex-end" mt="xl" gap={"xs"}>
          <Button variant="outline" color="gray" onClick={close}>
            ألغاء
          </Button>
          <Button
            onClick={() => {
              setValue(true);
              close();
            }}
            color="red"
          >
            متابعة
          </Button>
        </Group>
      </Modal>

      <Slot onClick={open}>{children}</Slot>
    </>
  );
}

export default DangerModal;
