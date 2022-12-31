import "../styles/globals.css";
import type { AppProps } from "next/app";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";

import { UserProvider } from "../app/providers/userProvider";
import Layout from "../components/layouts/Layout";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
        },
    },
});

export default ({ Component, pageProps }: AppProps) => (
    <QueryClientProvider client={queryClient}>
        <UserProvider>
            <Layout>
                <Component {...pageProps} />
            </Layout>
            {/* <ReactQueryDevtools initialIsOpen={false} position="bottom-right" /> */}
        </UserProvider>
    </QueryClientProvider>
);
