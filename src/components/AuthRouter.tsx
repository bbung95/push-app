import { fetchGetAuthUser } from "@/api/UserFetchAPI";
import { authState } from "@/recoil/atoms/authState";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useRecoilState } from "recoil";

const AuthRouter = ({ children }: { children: JSX.Element }) => {
    const router = useRouter();
    const { pathname } = router;
    const [userAuth, setUserAuth] = useRecoilState(authState);

    const { data: session } = useSession();

    console.log("session", session);

    const authURLs = ["/", "/login", "/signup"];

    const authRouter = () => {
        if (authURLs.includes(pathname)) {
            // 로그인 O
            if (userAuth.id !== "") {
                console.log("go home");
                if (userAuth.first_login) {
                    router.push("/nickname");
                    return;
                }
                router.push("/home");
                return;
            }
        } else {
            // 로그인 X
            if (userAuth.id === "") {
                console.log("go root");
                router.push("/");
                return;
            }
            if (userAuth.first_login) {
                router.push("/nickname");
                return;
            } else if (pathname === "/nickname") {
                router.push("/home");
                return;
            }
        }
    };

    // authRouter();

    useEffect(() => {
        const token = localStorage.getItem("jwt-token");

        if (token) {
            // 로그인 상태
            // user정보를 업데이트
            (async () => {
                const { data } = await fetchGetAuthUser(token);
                setUserAuth(data);
            })();
        }
    }, []);

    useEffect(() => {
        authRouter();
    }, [userAuth]);

    return <>{children}</>;
};

export default AuthRouter;
