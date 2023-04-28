import { NextApiRequest, NextApiResponse } from "next";
import { collection, doc, getDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase-init";
import { UserProps } from "@/@types/model";
import nextConnect from "next-connect";

const handler = nextConnect<NextApiRequest, NextApiResponse>();

handler.get(async (req, res) => {
    const id = String(req.query.id);

    const findUser = await getDoc(doc(db, "user", id));

    if (findUser.exists()) {
        const data = findUser.data();

        res.json(data);
    } else {
        res.json({});
    }
});

export default handler;
