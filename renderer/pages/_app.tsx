import React from "react";
import type { AppProps } from "next/app";
import { trpc } from "../utils/trpc";

import "../styles/globals.css";
import Layout from "../components/Layout";

import { MantineProvider, createEmotionCache } from "@mantine/core";
import rtlPlugin from "stylis-plugin-rtl";

const rtlCache = createEmotionCache({
	key: "mantine-rtl",
	stylisPlugins: [rtlPlugin],
});
import { ContextModalProps, ModalsProvider } from "@mantine/modals";
import P from "../components/ui/P";
import Button from "../components/ui/Button";

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<MantineProvider
			withGlobalStyles
			withNormalizeCSS
			theme={{
				colors: {
					blue: [
						"#eff6ff",
						"#dbeafe",
						"#bfdbfe",
						"#93c5fd",
						"#60a5fa",
						"#3b82f6",
						"#2563eb",
						"#1d4ed8",
						"#1e40af",
						"#1e3a8a",
					],
				},
				dir: "rtl",
			}}
			emotionCache={rtlCache}
		>
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</MantineProvider>
	);
}

export default trpc.withTRPC(MyApp);
