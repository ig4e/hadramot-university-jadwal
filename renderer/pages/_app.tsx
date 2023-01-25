import React from "react";
import type { AppProps } from "next/app";
import { trpc } from "../utils/trpc";

import "../styles/globals.css";
import Layout from "../components/Layout";

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<Layout>
			<Component {...pageProps} />;
		</Layout>
	);
}

export default trpc.withTRPC(MyApp);
