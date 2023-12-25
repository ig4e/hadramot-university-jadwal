"use client";

import { ActionIcon, AppShell, Button, Text, Title } from "@mantine/core";
import Image from "next/image";
import React from "react";
import Sidebar from "~/components/sidebar";
import ImportAndExport from "~/components/import-export";
import { LogoTransparent } from "~/components/logo";
import { useDisclosure } from "@mantine/hooks";
import { Bars3Icon } from "@heroicons/react/20/solid";
import ThemeToggle from "./theme-toggle";

function App({ children }: { children: React.ReactNode }) {
  const [mobileOpened, { toggle: toggleMobile, close }] = useDisclosure();

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: { base: "100vw", sm: 300 },
        breakpoint: "sm",
        collapsed: { mobile: !mobileOpened },
      }}
      padding="md"
    >
      <AppShell.Header
        p="md"
        display={"flex"}
        className="items-center justify-between"
      >
        <div className="flex items-center gap-4">
          <ActionIcon
            onClick={toggleMobile}
            hiddenFrom="sm"
            size={"lg"}
            aria-label="Menu"
          >
            <Bars3Icon className="h-5 w-5"></Bars3Icon>
          </ActionIcon>

          <Image
            src={LogoTransparent}
            alt="Logo"
            className="hidden h-10 w-10 md:block"
          ></Image>

          <div className="hidden md:block">
            <Title order={5}>جامعة حضرموت</Title>
            <Text size={"sm"}>برنامج الجداول الاصدار الثانى</Text>
          </div>
          <div className="md:hidden">
            <Title order={5}>جامعة حضرموت</Title>
            <Text size={"xs"}>برنامج الجداول الاصدار الثانى</Text>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <ImportAndExport></ImportAndExport>
          <ThemeToggle></ThemeToggle>
        </div>
      </AppShell.Header>

      <Sidebar close={close}></Sidebar>

      <AppShell.Main>
        <div className="pb-4">{children}</div>
      </AppShell.Main>
    </AppShell>
  );
}

export default App;
