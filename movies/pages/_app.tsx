import '../styles/globals.css'
import React from "react";
import {AppProps} from "next/app";
import {SessionProvider} from "next-auth/react";
import Navbar from "@/components/Navbar";
import InfoModal from "@/components/infoModal";
import useInfoModal from "@/hooks/useInfoModal";

export default function App({Component, pageProps: {session, ...pageProps}}: AppProps) {
    const {isOpen, closeModal} = useInfoModal();

    return (
        <SessionProvider session={session}>
            <InfoModal visible={isOpen} onClose={closeModal} />
            <Navbar />
            <Component {...pageProps}/>
        </SessionProvider>
    )
}
