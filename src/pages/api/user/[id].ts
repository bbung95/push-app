import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase-init";
import { UserSessionProps } from "@/@types/userType";

const handler = nextConnect<NextApiRequest, NextApiResponse>();

// 이메일 중복 체크
handler.get(async (req, res) => {
    const id = req.query.id;

    const findUser = await getDoc(doc(db, "user", String(id)));

    if (!findUser.exists()) {
        return res.json({ status: 400 });
    }

    const user: UserSessionProps = {
        nickname: findUser.data().nickname,
        state_message: findUser.data().state_messge,
        profile_img: findUser.data().profile_img,
    };

    return res.json({ status: 200, data: user });
});

export default handler;
