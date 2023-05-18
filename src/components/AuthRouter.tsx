import { fetchGetUser, fetchUserTokenUpdate } from "@/api/UserFetchAPI";
import { requestPermission } from "@/utils/Notification";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

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
            if (status === "authenticated" || session) {
                // const res = await fetchGetUser(session.user.id);
                // console.log(res);
                // update(res.data.data);
                const token = await requestPermission();
                fetchUserTokenUpdate({ id: String(session.user.id), token: token ?? "" });
            }
        })();
    }, [session]);

    if (status === "loading") {
        return (
            <div className="relative w-screen h-screen bg-main-color">
                <div className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 absolute">
                    <Image src="/image/icon-512x512.png" alt="" width={150} height={150} />
                </div>
            </div>
        );
    }

    return <>{children}</>;
};

export default AuthRouter;
