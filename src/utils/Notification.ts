import { app } from "@/lib/firebase-init";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

export const requestPermission = async () => {
    if (typeof window !== "undefined" && typeof window.navigator !== "undefined") {
        const messaging = getMessaging(app);

        const permission = await Notification.requestPermission();

        if (permission === "granted") {
            const token = await getToken(messaging, { vapidKey: "BBsUF1frFhq8n107d6OnIKNbKbRWtwhzSyf96rqxbnyu_f0oixl7SW7rHdxnVt938zyKyyAR4KtSzyzxWWgQ3zY" });

            onMessage(messaging, (payload) => {
                console.log("Message received. ", payload);

                const notification = new Notification(payload.notification?.title ?? "", { body: payload.notification?.body });
                notification.onclick = () => (location.href = "/");
            });

            return token;
        } else if (permission === "denied") {
            console.log("denied");
            return "";
        }
    }
};
