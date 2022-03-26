import '../styles/globals.css'
import type { AppProps } from 'next/app'

import App from "next/app";
import Head from "next/head";
import { createContext } from "react";
import { fetchAPI } from "../lib/api";
import { getStrapiMedia } from "../lib/media";

export const GlobalContext = createContext({});

function MyApp({ Component, pageProps }: AppProps) {
    const { global } = pageProps; // TODO: what for?

    return (
        <>
            <Head>
                <link
                    rel="shortcut icon"
                    href='google.com'
                />
            </Head>
            <GlobalContext.Provider value={global.attributes}>
                <Component {...pageProps} />
            </GlobalContext.Provider>
        </>
    );
}

MyApp.getInitialProps = async (ctx: any) => {
    const appProps = await App.getInitialProps(ctx);

    const globalRes = await fetchAPI("/theme", {
        // populate: { // TODO: research
        //     favicon: "*",
        //     defaultSeo: {
        //         populate: "*",
        //     },
        // },
    });

    return { ...appProps, pageProps: { global: globalRes.data } };
};

export default MyApp
