import { NextApiRequest, NextApiResponse } from "next";
import { collection, doc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { db } from "@/lib/firebase-init";
import nextConnect from "next-connect";

const handler = nextConnect<NextApiRequest, NextApiResponse>();

// 닉네임 중복체크
handler.get(async (req, res) => {
    const nickname = String(req.query.nickname);

    const qeury = query(collection(db, "user"), where("nickname", "==", nickname));

    const findUsers = await getDocs(qeury);

    if (findUsers.size > 0) {
        return res.json(false);
    }
    return res.json(true);
});

// 닉네임 업데이트
handler.put(async (req, res) => {
    const body = req.body;

    console.log(body);
    await updateDoc(doc(db, "user", body.id), { nickname: body.nickname, first_login: false });

    return res.json(true);
});

export default handler;
