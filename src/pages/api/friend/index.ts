import { NextApiRequest, NextApiResponse } from "next";
import { DocumentData, collection, doc, getDoc, getDocs, orderBy, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase-init";
import nextConnect from "next-connect";
import { FriendItemProps } from "@/@types/friendType";

const handler = nextConnect<NextApiRequest, NextApiResponse>();

handler.get(async (req, res) => {
    const id = req.query.id;

    const qeury = query(collection(db, "friend"), where("user_id", "==", Number(id)), where("accept", "==", true));
    const findFriends = await getDocs(qeury);
    const data: any = [];

    findFriends.forEach(async (item) => {
        data.push(item.data());
    });

    const newData: FriendItemProps[] = [];
    for (let value of data) {
        const findUser = await getDoc(doc(db, "user", String(value.target_id)));
        newData.push({
            id: value.id,
            user_id: findUser.data()?.id,
            nickname: findUser.data()?.nickname,
            state_message: findUser.data()?.state_message,
            like: value.like,
        });
    }

    return res.json({ status: 200, data: newData });
});

export default handler;
