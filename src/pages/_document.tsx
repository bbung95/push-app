import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
    return (
        <Html lang="en">
            <Head>
                <meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no" />
                <meta name="description" content="Description" />
                <meta name="keywords" content="Keywords" />
                <title>push-app</title>

                <link rel="manifest" href="/manifest.json" />
                <link rel="apple-touch-icon" sizes="192x192" href="/image/icon-192x192.png" />
                <link rel="apple-touch-icon" sizes="512x512" href="/image/icon-512x512.png" />
                <meta name="theme-color" content="#317EFB" />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
