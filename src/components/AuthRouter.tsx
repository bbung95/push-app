import { fetchUserTokenUpdate } from "@/api/UserFetchAPI";
import { fcmToken, requestPermission } from "@/utils/Notification";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const AuthRouter = ({ children }: { children: JSX.Element }) => {
    const router = useRouter();
    const { pathname } = router;
    const { data: session, status } = useSession();

    // 상수 export
    const authURLs = ["/", "/login", "/signup"];

    const authRouter = () => {
        if (authURLs.includes(pathname)) {
            // 로그인 O
            if (status === "authenticated") {
                console.log("go home");
                if (session.user.first_login) {
                    router.push("/nickname");
                    return;
                } else {
                    router.push("/home");
                    return;
                }
            }
        } else {
            // 로그인 X
            if (status === "unauthenticated") {
                console.log("go root");
                router.push("/");
                return;
            }

            if (session?.user.first_login) {
                router.push("/nickname");
                return;
            } else if (pathname === "/nickname") {
                router.push("/home");
                return;
            }
        }
    };

    useEffect(() => {
        authRouter();

        (async () => {
            if (status === "authenticated") {
                const token = await requestPermission();
                if (token) {
                    fetchUserTokenUpdate({ id: String(session.user.id), token: token ?? "" });
                }
            }
        })();
    }, [session]);

    if (status === "loading") {
        return (
            <div className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 absolute">
                <img src="/image/icon-192x192.png" alt="" />
            </div>
        );
    } else {
        return <>{children}</>;
    }
};

export default AuthRouter;
