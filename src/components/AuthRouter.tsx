import { fetchUserTokenUpdate } from "@/api/UserFetchAPI";
import { fcmToken, requestPermission } from "@/utils/Notification";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

const AuthRouter = ({ children }: { children: JSX.Element }) => {
    const router = useRouter();
    const { pathname } = router;
    const { data: session, status } = useSession();

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

        if (status === "authenticated") {
            fetchUserTokenUpdate({ id: String(session.user.id), token: fcmToken.token });
        }
    }, [session]);

    if (status === "loading") {
        return <div>Loading...</div>;
    } else {
        return <>{children}</>;
    }
};

export default AuthRouter;
