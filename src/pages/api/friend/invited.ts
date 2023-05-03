import { NextApiRequest, NextApiResponse } from "next";
import { DocumentData, collection, deleteDoc, doc, getDoc, getDocs, query, serverTimestamp, setDoc, updateDoc, where } from "firebase/firestore";
import { db } from "@/lib/firebase-init";
import nextConnect from "next-connect";
import { getIndex } from "@/utils/DBUtill";
import { FriendProps } from "@/@types/model";
import { InvitedItemProps } from "@/@types/inviteType";

const handler = nextConnect<NextApiRequest, NextApiResponse>();

// 초대목록
handler.get(async (req, res) => {
    const id = req.query.id;

    const qeury = query(collection(db, "friend"), where("target_id", "==", Number(id)), where("accept", "==", false));
    const findInviteds = await getDocs(qeury);
    const data: any = [];

    findInviteds.forEach(async (item) => {
        data.push(item.data());
    });

    const newData: InvitedItemProps[] = [];
    for (let value of data) {
        const findUser = await getDoc(doc(db, "user", String(value.user_id)));
        newData.push({
            id: value.id,
            nickname: findUser.data()?.nickname,
            profile_img: findUser.data()?.profile_img,
            target_id: findUser.data()?.id,
        });
    }

    return res.json({ status: 200, data: newData });
});

// 친구 초대
handler.post(async (req, res) => {
    const body = req.body;

    const index = await getIndex("friend");

    const friend: FriendProps = {
        id: index,
        user_id: body.id,
        target_id: body.target_id,
        created_date: serverTimestamp(),
        accept: false,
        like: false,
    };

    await setDoc(doc(db, "friend", String(friend.id)), friend);

    return res.json({ status: 201 });
});

handler.put(async (req, res) => {
    const body = req.body;

    // 친구 수락
    await updateDoc(doc(db, "friend", String(body.id)), { accept: true });

    const index = await getIndex("friend");
    const friend: FriendProps = {
        id: index,
        user_id: body.user_id,
        target_id: body.target_id,
        created_date: serverTimestamp(),
        accept: true,
        like: false,
    };
    await setDoc(doc(db, "friend", String(friend.id)), friend);

    return res.json({ status: 201 });
});

// 초대 거절
handler.delete(async (req, res) => {
    const id = req.query.id;

    await deleteDoc(doc(db, "friend", String(id)));

    return res.json({ status: 201 });
});

export default handler;
