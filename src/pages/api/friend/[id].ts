import { NextApiRequest, NextApiResponse } from "next";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase-init";
import nextConnect from "next-connect";
import { FriendDetailProps } from "@/@types/friendType";

const handler = nextConnect<NextApiRequest, NextApiResponse>();

handler.get(async (req, res) => {
    const id = req.query.id;

    const findFriend = await getDoc(doc(db, "friend", String(id)));
    const findUser = await getDoc(doc(db, "user", String(findFriend.data()?.target_id)));

    const data: FriendDetailProps = {
        id: findFriend.data()?.id,
        nickname: findUser.data()?.nickname,
        state_message: findUser.data()?.state_message,
        like: findFriend.data()?.like,
        user_id: findUser.data()?.id,
        profile_img: findUser.data()?.profile_img,
    };

    return res.json({ status: 200, data: data });
});

export default handler;
