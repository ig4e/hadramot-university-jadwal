"use client";
import {
  AppShell,
  Text,
  Title
} from "@mantine/core";
import Image from "next/image";
import React from "react";
import Sidebar from "~/components/sidebar";
import ImportAndExport from "~/components/import-export";
import { LogoTransparent } from "~/components/logo";

function App({ children }: { children: React.ReactNode }) {
  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: "sm",
      }}
      padding="md"
    >
      <AppShell.Header
        p="md"
        display={"flex"}
        className="items-center justify-between "
      >
        <div className="flex items-center gap-4">
          <Image src={LogoTransparent} alt="Logo" className="h-10 w-10"></Image>
          <div>
            <Title order={5}>جامعة حضرموت</Title>
            <Text size={"sm"}>برنامج الجداول فاكيو الاصدار الثانى</Text>
          </div>
        </div>

        <ImportAndExport></ImportAndExport>
      </AppShell.Header>

      <Sidebar></Sidebar>

      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}

export default App;
