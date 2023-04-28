import React, { useEffect } from "react";
import Navigation from "./Navigation";
import { useRouter } from "next/router";
import { app, auth } from "@/lib/firebase-init";
import { onAuthStateChanged } from "firebase/auth";
import { useRecoilState } from "recoil";
import { authState, initialState } from "@/recoil/atoms/authState";
import { fetchGetUser } from "@/api/UserFetchAPI";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const Layout = ({ children }: { children: JSX.Element }) => {
    const router = useRouter();
    const { pathname } = router;

    const [userAuth, setUserAuth] = useRecoilState(authState);

    // firebase auth 정보
    onAuthStateChanged(auth, async (user) => {
        if (user) {
            const uid = user.uid;
            if (userAuth.id === "") {
                const { data } = await fetchGetUser(uid);

                console.log("changeAuth", data);

                setUserAuth(data);
            }
        } else {
            // User is signed out
            if (userAuth.id !== "") {
                setUserAuth(initialState);
            }
        }
    });

    // 알림 권한 체크
    const requestPermission = async () => {
        if (typeof window !== "undefined" && typeof window.navigator !== "undefined") {
            const messaging = getMessaging(app);

            const permission = await Notification.requestPermission();

            if (permission === "granted") {
                console.log("Notification Granted");
                const token = await getToken(messaging, { vapidKey: "BBsUF1frFhq8n107d6OnIKNbKbRWtwhzSyf96rqxbnyu_f0oixl7SW7rHdxnVt938zyKyyAR4KtSzyzxWWgQ3zY" });
                console.log("Token Get ", token);

                onMessage(messaging, (payload) => {
                    console.log("Message received. ", payload);
                });
            } else if (permission === "denied") {
                alert("You denied");
            }
        }
    };

    const authURLs = ["/", "/login", "/signup"];

    useEffect(() => {
        if (authURLs.includes(pathname)) {
            if (userAuth.id !== "") {
                console.log("go home");
                router.push("/home");
            }
        } else {
            if (userAuth.id === "") {
                console.log("go root");
                router.push("/");
            }
        }
    });

    useEffect(() => {
        requestPermission();
    }, []);

    return (
        <div className="h-screen max-w-screen-sm w-full m-auto">
            {children}
            {pathname !== "/" && pathname !== "/login" && pathname !== "/signup" ? <Navigation /> : ""}
        </div>
    );
};

export default Layout;
