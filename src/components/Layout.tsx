import React, { useEffect } from "react";
import Navigation from "./Navigation";
import { useRouter } from "next/router";
import AuthRouter from "./AuthRouter";
import { requestPermission } from "@/utils/Notification";
import { useRecoilState, useRecoilValue } from "recoil";
import { loadingState } from "@/recoil/atoms/loadingState";
import Spiner from "./Spiner";

const Layout = ({ children }: { children: JSX.Element }) => {
    const router = useRouter();
    const isLoading = useRecoilValue(loadingState);
    const { pathname } = router;
    const pahts = ["/home", "/friend", "/profile"];

    return (
        <AuthRouter>
            <div className="h-screen max-w-screen-sm w-full m-auto relative">
                {children}
                {pahts.includes(pathname) && <Navigation />}

                {isLoading && (
                    <div className="absolute h-full w-full top-0 left-0 bg-white opacity-50">
                        <div className=" absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                            <Spiner />
                        </div>
                    </div>
                )}
            </div>
        </AuthRouter>
    );
};

export default Layout;
