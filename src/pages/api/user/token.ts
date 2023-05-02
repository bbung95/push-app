import { NextApiRequest, NextApiResponse } from "next";
import { DocumentData, collection, doc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { db } from "@/lib/firebase-init";
import nextConnect from "next-connect";

const handler = nextConnect<NextApiRequest, NextApiResponse>();

// FCM Token 업데이트
handler.put(async (req, res) => {
    const body = req.body;

    const findUser = await findUserByToken(body.token);

    if (findUser) {
        await updateDoc(doc(db, "user", String(findUser.id)), { token: "" });
    }

    await updateDoc(doc(db, "user", body.id), { token: body.token });

    res.json({ status: 201 });
});

handler.delete(async (req, res) => {
    const id = req.query.id;

    await updateDoc(doc(db, "user", String(id)), { token: "" });

    res.json({ status: 201 });
});

const findUserByToken = async (token: string) => {
    const qeury = query(collection(db, "user"), where("token", "==", token));
    const findUsers = await getDocs(qeury);
    const findUser: DocumentData[] = [];
    findUsers.forEach((doc) => findUser.push(doc.data()));

    return findUser[0];
};

export default handler;
