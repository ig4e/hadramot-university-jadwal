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

function ImportAndExport() {
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

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        title="أستيراد وتصدير الجداول"
        centered
      >
        <Stack>
          <Text>الأصدار: {data?.version || "جارى التحميل..."}</Text>

          {importedData && (
            <div className="rounded-md bg-slate-900 p-2 font-mono text-white">
              <Text>أصدار الامتصدر: {importedData.version}</Text>
              <Text>القاعات: {importedData.halls.length}</Text>
              <Text>المعلمين: {importedData.teachers.length}</Text>
              <Text>المواد: {importedData.subjects.length}</Text>
              <Text>التخصصات: {importedData.majors.length}</Text>
              <Text>الجداول: {importedData.tables.length}</Text>
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
