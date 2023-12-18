"use client";

import { useEffect, useMemo, useState } from "react";

import {
  ActionIcon,
  Button,
  FileButton,
  Modal,
  Stack,
  Text,
  Tooltip,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconTableExport, IconTableImport } from "@tabler/icons-react";
import Link from "next/link";
import { api } from "~/trpc/react";
import { RouterOutputs } from "~/trpc/shared";
import DangerModal from "./danger-modal";
import { notifications } from "@mantine/notifications";

function ImportAndExport() {
  const [notificationId, setNotificationId] = useState("");
  const [opened, { open, close }] = useDisclosure(false);
  const { data, isLoading, isError, error } = api.data.export.useQuery(
    {},
    { enabled: opened },
  );
  const [file, setFile] = useState<File | null>(null);
  const [importedData, setImportedData] =
    useState<RouterOutputs["data"]["export"]>();

  useEffect(() => {
    if (file) {
      console.log("Reading the file");
      file.text().then((text) => setImportedData(JSON.parse(text)));
    }
  }, [file]);

  const downloadSrc = useMemo(
    () =>
      `data:text/json;charset=utf-8, ${encodeURIComponent(
        JSON.stringify(data),
      )}`,
    [data],
  );

  const importData = api.data.import.useMutation({
    onMutate(variables) {
      const id = notifications.show({
        loading: true,
        title: "يرجى الانتظار",
        message: "جارى أضافة المعلومات",
        autoClose: 500000,
        withCloseButton: false,
      });

      setNotificationId(id);
    },
    onSuccess(data, variables, context) {
      if (notificationId)
        notifications.update({
          id: notificationId,
          loading: false,
          title: "نجاح!",
          message: "تم أضافة المعلومات",
          color: "green",
          autoClose: 5000,
          withCloseButton: true,
        });
    },
    onError(error, variables, context) {
      if (notificationId)
        notifications.update({
          id: notificationId,
          loading: false,
          title: "فشل!",
          message: `تعذر أضافة المعلومات بسبب :` + error.message,
          color: "red",
          autoClose: 5000,
          withCloseButton: true,
        });
    },
  });

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        title="أستيراد وتصدير الجداول"
        centered
      >
        <Stack>
          <Text>الأصدار الحالي: {data?.version || "جارى التحميل..."}</Text>

          {importedData && (
            <div className="rounded-md bg-slate-900 p-2 font-mono text-white">
              <Text>أصدار النسخة: {importedData.version}</Text>
              <Text>القاعات: {importedData.halls.length}</Text>
              <Text>المعلمين: {importedData.teachers.length}</Text>
              <Text>المواد: {importedData.subjects.length}</Text>
              <Text>التخصصات: {importedData.majors.length}</Text>
              <Text>الجداول: {importedData.tables.length}</Text>

              <DangerModal
                title="تأكيد الاستيراد"
                description="يُلحظ أن هذا الإجراء لا يمكن التراجع عنه، لذا يُفضل بشدة أخذ نسخة احتياطية قبل تنفيذ هذا الإجراء."
                onSubmit={(result) => {
                  if (result) {
                    importData.mutate({
                      version: importedData.version,
                      data: importedData,
                    });
                  }
                }}
              >
                <Button
                  color="red"
                  className="mt-4"
                  leftSection={<IconTableImport></IconTableImport>}
                >
                  استيراد
                </Button>
              </DangerModal>
            </div>
          )}

          <div className="flex items-center gap-2">
            <Link
              target="_blank"
              href={downloadSrc}
              download={`huj-${data?.version}-${new Date().toLocaleString()}.json`}
            >
              <Button
                leftSection={<IconTableExport></IconTableExport>}
                loading={isLoading}
              >
                تصدير الجداول
              </Button>
            </Link>

            <FileButton onChange={setFile} accept="text/json,application/json">
              {(props) => (
                <Button
                  {...props}
                  leftSection={<IconTableImport></IconTableImport>}
                >
                  إستيراد الجداول
                </Button>
              )}
            </FileButton>
          </div>
        </Stack>
      </Modal>

      <Tooltip label="استيراد وتصدير">
        <ActionIcon
          variant="filled"
          size={"lg"}
          aria-label="Settings"
          onClick={open}
        >
          <IconTableImport className="h-5 w-5"></IconTableImport>
        </ActionIcon>
      </Tooltip>
    </>
  );
}

export default ImportAndExport;
