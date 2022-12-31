import React, { ReactNode } from "react";
import { useRouter } from "next/router";

import { ToastContainer } from "react-toastify";

import Footer from "../organisms/Footer";
import Header from "../organisms/Header";

import "react-toastify/dist/ReactToastify.css";

import { AUTH_ROUTE } from "../../utils/route.constant";

const Layout = ({ children }: { children: ReactNode }) => {
    const router = useRouter();

    return (
        <>
            <Header />
            <main>{children}</main>
            {router.pathname !== AUTH_ROUTE && <Footer />}
            <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} closeOnClick />
        </>
    );
};

export default Layout;
