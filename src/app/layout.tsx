import "~/styles/globals.css";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";

import {
  ColorSchemeScript,
  DirectionProvider,
  MantineProvider,
} from "@mantine/core";
import { Notifications } from "@mantine/notifications";

import { cookies } from "next/headers";
import App from "~/components/app";
import { cn } from "~/lib/utils";
import { theme } from "~/styles/theme-config";
import { TRPCReactProvider } from "~/trpc/react";

export const metadata = {
  title: "جامعة حضرموت",
  description: "برنامج الجداول فاكيو الاصدار الثانى",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <ColorSchemeScript />
      </head>

      <body className={cn("min-h-screen antialiased")}>
        <TRPCReactProvider cookies={cookies().toString()}>
          <DirectionProvider initialDirection="rtl" detectDirection={false}>
            <MantineProvider theme={theme} defaultColorScheme="light">
              <Notifications limit={3} />
              <App>{children}</App>
            </MantineProvider>
          </DirectionProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
