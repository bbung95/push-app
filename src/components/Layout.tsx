import React from "react";
import Navigation from "./Navigation";
import { useRouter } from "next/router";

const Layout = ({ children }: { children: JSX.Element }) => {
    const router = useRouter();
    const { pathname } = router;

    return (
        <div className="h-screen max-w-screen-sm w-full m-auto">
            {children}
            {pathname !== "/" && pathname !== "/login" && pathname !== "/signup" ? <Navigation /> : ""}
        </div>
    );
};

export default Layout;
