import { app, auth, provider } from "@/lib/firebase-init";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import Link from "next/link";
import { Router, useRouter } from "next/router";
import { useEffect } from "react";

export default function index() {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const router = useRouter();

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

    const handlerGoogleLogin = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential?.accessToken;
                // The signed-in user info.
                const user = result.user;
                // IdP data available using getAdditionalUserInfo(result)
                // ...
                console.log(token, user.uid);
                router.push("/home");
            })
            .catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.customData.email;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
                // ...
            });
    };

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        requestPermission();
    }, []);

    return (
        <div className="h-full bg-main-color">
            <div className="flex flex-col gap-4 w-9/12 m-auto pt-96">
                <Link href={"/login"} className="btn bg-white border-0 text-gray-600 hover:bg-white drop-shadow-md">
                    로그인
                </Link>
                <Link href={"/signup"} className="btn bg-white border-0 text-gray-600 hover:bg-white drop-shadow-md">
                    회원가입
                </Link>
                <Link href={"/home"} className="btn btn-warning text-gray-600 drop-shadow-md">
                    kakao
                </Link>
                <button className="btn bg-white border-0 text-gray-600 hover:bg-white drop-shadow-md" onClick={handlerGoogleLogin}>
                    google
                </button>
            </div>
        </div>
    );
}
