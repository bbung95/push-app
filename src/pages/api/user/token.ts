import { NextApiRequest, NextApiResponse } from "next";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase-init";
import nextConnect from "next-connect";

const handler = nextConnect<NextApiRequest, NextApiResponse>();

// Token 업데이트
handler.put(async (req, res) => {
    const body = req.body;

    await updateDoc(doc(db, "user", body.id), { token: body.token });

    res.json(true);
});

export default handler;
