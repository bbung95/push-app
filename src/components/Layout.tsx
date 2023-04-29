import React from "react";
import Navigation from "./Navigation";
import { useRouter } from "next/router";
import AuthRouter from "./AuthRouter";

const Layout = ({ children }: { children: JSX.Element }) => {
    const router = useRouter();
    const { pathname } = router;

    return (
        <AuthRouter>
            <div className="h-screen max-w-screen-sm w-full m-auto">
                {children}
                {pathname !== "/" && pathname !== "/login" && pathname !== "/signup" && pathname !== "/nickname" ? <Navigation /> : ""}
            </div>
        </AuthRouter>
    );
};

export default Layout;
