import { NextApiRequest, NextApiResponse } from "next";
import { DocumentData, collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase-init";
import nextConnect from "next-connect";

const handler = nextConnect<NextApiRequest, NextApiResponse>();

handler.get(async (req, res) => {
    const keyword = String(req.query.keyword);

    const qeury = query(collection(db, "user"), where("nickname", "==", keyword));
    const findUsers = await getDocs(qeury);

    const data: DocumentData[] = [];
    findUsers.forEach((doc) => {
        data.push(doc.data());
    });

    // 만약 친구가 이미 초대 or 추가 되어 있을 경우 disable 처리

    return res.json({ status: 200, data: data });
});

export default handler;
