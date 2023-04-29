import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import { DocumentData, collection, doc, getDocs, query, serverTimestamp, setDoc, updateDoc, where } from "firebase/firestore";
import { db } from "@/lib/firebase-init";
import { createdToken, matchPassword } from "@/utils/AuthUtil";

const handler = nextConnect<NextApiRequest, NextApiResponse>();

handler.post(async (req, res) => {
    const body = req.body;

    const qeury = query(collection(db, "user"), where("email", "==", body.email));
    const findUsers = await getDocs(qeury);

    if (findUsers.size === 0) {
        return res.json({ status: 404, code: "" });
    }

    let findUser: DocumentData[] = [];
    findUsers.forEach((doc) => findUser.push(doc.data()));

    if (!matchPassword(body.password, findUser[0].password)) {
        return res.json({ status: 404, code: "" });
    }

    const token = createdToken({ id: findUser[0].id, email: body.email });
    updateLoginDate(findUser[0].id);

    return res.json({ status: 200, data: { token } });
});

const updateLoginDate = (id: number) => {
    updateDoc(doc(db, "user", String(id)), { login_date: serverTimestamp() });
};

export default handler;
