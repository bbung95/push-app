import { NextApiRequest, NextApiResponse } from "next";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase-init";
import nextConnect from "next-connect";
import { verifiedToken } from "@/utils/AuthUtil";

const handler = nextConnect<NextApiRequest, NextApiResponse>();

// jwt token get user
handler.get(async (req, res) => {
    const token = req.headers.authorization ?? "";
    const data: any = verifiedToken(token);

    const findUser = await getDoc(doc(db, "user", String(data.id)));

    return res.json({ status: 200, data: findUser.data() });
});

// FCM Token 업데이트
handler.put(async (req, res) => {
    const body = req.body;

    await updateDoc(doc(db, "user", body.id), { token: body.token });

    res.json({ status: 201 });
});

export default handler;
