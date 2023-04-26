import { app } from "@/lib/firebase-messaging-init";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import Link from "next/link";
import { useEffect } from "react";

export default function index() {
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
                <Link href={"/home"} className="btn bg-white border-0 text-gray-600 hover:bg-white drop-shadow-md">
                    google
                </Link>
            </div>
        </div>
    );
}
