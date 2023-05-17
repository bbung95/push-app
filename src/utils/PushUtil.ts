import { Message } from "firebase-admin/lib/messaging/messaging-api";
import fcmAdmin from "@/lib/firebase-admin";

export const createMessage = (title: string, body: string, token: string) => {
    return {
        notification: {
            title: title,
            body: body,
        },
        token: token,
    };
};

export const sendPushMessage = async (message: Message) => {
    // 발송
    fcmAdmin
        .messaging()
        .send(message)
        .then(function (response) {
            console.log("Successfully sent message: : ", response);
            return { status: 201 };
        })
        .catch(function (err) {
            console.log("Error Sending message!!! : ", err);
            return { status: 400 };
        });
};
