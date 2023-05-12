import '../styles/globals.css'
import React from "react";
import {AppProps} from "next/app";
import {SessionProvider} from "next-auth/react";
import Navbar from "@/components/Navbar";
import InfoModal from "@/components/infoModal";
import useInfoModal from "@/hooks/useInfoModal";
import Head from "next/head";

export default function App({Component, pageProps: {session, ...pageProps}}: AppProps) {
    const {isOpen, closeModal} = useInfoModal();
    const locationPathname = location.pathname

    return (
        <SessionProvider session={session}>
            <Head>
                <title>
                    {locationPathname === '/' ? 'Movies' : locationPathname.charAt(1).toUpperCase() + locationPathname.slice(2)}
                </title>
            </Head>
            <InfoModal visible={isOpen} onClose={closeModal}/>
            <Navbar/>
            <Component {...pageProps}/>
        </SessionProvider>
    )
}
