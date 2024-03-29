import { httpBatchLink } from "@trpc/client";
import { createTRPCNext } from "@trpc/next";
import superjson from "superjson";
//import { AppRouter } from "../server/routers/_app";
import { AppRouter } from "../../electron-src/server/routers/_app";

function getBaseUrl() {
	// assume localhost
	return `http://localhost:${process.env.PORT ?? 3000}`;
	if (typeof window !== "undefined")
		// browser should use relative path
		return "/api";
	if (process.env.VERCEL_URL)
		// reference for vercel.com
		return `https://${process.env.VERCEL_URL}/api`;
	if (process.env.RENDER_INTERNAL_HOSTNAME)
		// reference for render.com
		return `http://${process.env.RENDER_INTERNAL_HOSTNAME}:${process.env.PORT}/api`;
}

export const trpc = createTRPCNext<AppRouter>({
	config({ ctx }) {
		return {
			links: [
				httpBatchLink({
					/**
					 * If you want to use SSR, you need to use the server's full URL
					 * @link https://trpc.io/docs/ssr
					 **/
					url: `${getBaseUrl()}/trpc`,
				}),
			],
			/**
			 * @link https://tanstack.com/query/v4/docs/reference/QueryClient
			 **/
			// queryClientConfig: { defaultOptions: { queries: { staleTime: 60 } } },
			transformer: superjson,
		};
	},
	/**
	 * @link https://trpc.io/docs/ssr
	 **/
	ssr: false,
});
