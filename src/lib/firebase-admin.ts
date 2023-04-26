import admin from "firebase-admin";
import serviceAccount from "./firebase-adminsdk.json";

const { privateKey } = JSON.parse(process.env.FIREBASE_PRIVATE_KEY || "{privateKey : ''}");

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert({
            projectId: "push-app-be4be",
            clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
            privateKey: privateKey,
        }),
    });
}

export const createMessage = (token: string, info: { title: string; body: string }) => {
    let deviceToken = token;

    return {
        notification: {
            title: "테스트 발송💛",
            body: "망고플레이트 앱 확인해보세요!💚",
        },
        token: deviceToken,
    };
};

export default admin;
