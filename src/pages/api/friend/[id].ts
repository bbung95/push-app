import { NextApiRequest, NextApiResponse } from "next";
import { collection, deleteDoc, doc, getDoc, getDocs, limit, query, updateDoc, where } from "firebase/firestore";
import { db } from "@/lib/firebase-init";
import nextConnect from "next-connect";
import { FriendDetailProps } from "@/@types/friendType";

const handler = nextConnect<NextApiRequest, NextApiResponse>();

// 친구 정보 가져오기
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

// 친구 즐겨찾기
handler.put(async (req, res) => {
    const id = req.query.id;
    const body = req.body;

    await updateDoc(doc(db, "friend", String(id)), { like: !body.like });

    return res.json({ status: 201 });
});

// 친구 삭제
handler.delete(async (req, res) => {
    const id = req.query.id;

    const findFriend = await getDoc(doc(db, "friend", String(id)));
    const data = findFriend.data();
    const q = query(collection(db, "friend"), where("user_id", "==", Number(data?.target_id)), where("target_id", "==", Number(data?.user_id)), limit(1));
    const findTargets = await getDocs(q);

    const findTarget: number[] = [];
    findTargets.forEach(async (item) => {
        findTarget.push(item.data().id);
    });

    await deleteDoc(doc(db, "friend", String(findTarget[0])));
    await deleteDoc(doc(db, "friend", String(id)));

    return res.json({ status: 201 });
});

export default handler;
