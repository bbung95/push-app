import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";
import { SessionProvider } from "next-auth/react";
import Layout from "@/components/Layout";

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
    return (
        <RecoilRoot>
            <SessionProvider>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </SessionProvider>
        </RecoilRoot>
    );
}
