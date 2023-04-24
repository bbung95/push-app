import admin from "firebase-admin";
import serviceAccount from "./firebase-adminsdk.json";

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
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
