import admin from "firebase-admin";

const { privateKey } = JSON.parse(process.env.NEXT_PUBLIC_FIREBASE_PRIVATE_KEY || "{privateKey : ''}");

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert({
            projectId: "push-app-be4be",
            clientEmail: process.env.NEXT_PUBLIC_FIREBASE_CLIENT_EMAIL,
            privateKey: privateKey,
        }),
    });
}

export default admin;
