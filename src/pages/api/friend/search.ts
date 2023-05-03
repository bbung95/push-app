import { NextApiRequest, NextApiResponse } from "next";
import { DocumentData, collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase-init";
import nextConnect from "next-connect";

const handler = nextConnect<NextApiRequest, NextApiResponse>();

handler.get(async (req, res) => {
    const keyword = String(req.query.keyword);

    const qeury = query(collection(db, "friend"), where("nickname", "==", keyword));
    const findFriend = await getDocs(qeury);

    const data: DocumentData[] = [];
    findFriend.forEach((doc) => {
        data.push(doc.data());
    });

    return res.json({ status: 200, data: data });
});

export default handler;
