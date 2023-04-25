import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
    return (
        <div className="h-screen max-w-screen-sm w-full m-auto">
            <Component {...pageProps} />
        </div>
    );
}
