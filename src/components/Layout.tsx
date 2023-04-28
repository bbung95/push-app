import React, { useEffect } from "react";
import Navigation from "./Navigation";
import { useRouter } from "next/router";
import { auth } from "@/lib/firebase-init";
import { onAuthStateChanged } from "firebase/auth";
import { useRecoilState } from "recoil";
import { authState, initialState } from "@/recoil/atoms/authState";
import { fetchGetUser, fetchUserTokenUpdate } from "@/api/UserFetchAPI";
import { requestPermission } from "@/utils/Notification";

const Layout = ({ children }: { children: JSX.Element }) => {
    const router = useRouter();
    const { pathname } = router;

    const [userAuth, setUserAuth] = useRecoilState(authState);

    const authURLs = ["/", "/login", "/signup"];

    useEffect(() => {
        // firebase auth 정보

        onAuthStateChanged(auth, async (user) => {
            const token = await requestPermission();

            if (user) {
                const uid = user.uid;

                if (userAuth.id === "") {
                    const res = await fetchUserTokenUpdate({ id: uid, token: token ?? "" });

                    const { data } = await fetchGetUser(uid);

                    setUserAuth(data);
                }
            } else {
                // User is signed out
                if (userAuth.id !== "") {
                    setUserAuth(initialState);
                }
            }
        });
    }, []);

    useEffect(() => {
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
                router.push("/");
                return;
            }
        }
    }, [userAuth]);

    return (
        <div className="h-screen max-w-screen-sm w-full m-auto">
            {children}
            {pathname !== "/" && pathname !== "/login" && pathname !== "/signup" && pathname !== "/nickname" ? <Navigation /> : ""}
        </div>
    );
};

export default Layout;
