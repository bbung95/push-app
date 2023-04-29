import React, { useEffect } from "react";
import Navigation from "./Navigation";
import { useRouter } from "next/router";
import { auth } from "@/lib/firebase-init";
import { onAuthStateChanged } from "firebase/auth";
import { useRecoilState } from "recoil";
import { authState, initialState } from "@/recoil/atoms/authState";
import { fetchGetUser, fetchUserAdd, fetchUserTokenUpdate } from "@/api/UserFetchAPI";
import { requestPermission } from "@/utils/Notification";
import { UserAddProps } from "@/@types/userType";

const Layout = ({ children }: { children: JSX.Element }) => {
    const router = useRouter();
    const { pathname } = router;

    const [userAuth, setUserAuth] = useRecoilState(authState);

    const authURLs = ["/", "/login", "/signup"];

    useEffect(() => {
        // firebase auth 정보

        onAuthStateChanged(auth, async (user) => {
            const token = await requestPermission();

            console.log("auth 확인", user);

            if (user) {
                const uid = user.uid;
                const email = user.email;

                if (userAuth.id === "") {
                    console.log("로그인완료");

                    const res = await fetchGetUser(uid);

                    if (!res.data.id) {
                        const data: UserAddProps = {
                            id: uid,
                            email: email ?? "",
                        };
                        await fetchUserAdd(data);
                        const res = await fetchGetUser(uid);
                        setUserAuth(res.data);
                    } else {
                        setUserAuth(res.data);
                    }
                    await fetchUserTokenUpdate({ id: uid, token: token ?? "" });
                }
            } else {
                // User is signed out
                setUserAuth(initialState);
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
                router.push("/home");
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
