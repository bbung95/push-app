import { NextApiRequest, NextApiResponse } from "next";
import { DocumentData, collection, doc, getDoc, getDocs, limit, orderBy, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase-init";
import nextConnect from "next-connect";

const handler = nextConnect<NextApiRequest, NextApiResponse>();

handler.get(async (req, res) => {
    const user_id = req.query.user_id;

    const qeury = query(collection(db, "push"), where("receiver_id", "==", Number(user_id)), orderBy("created_date", "desc"), limit(10));
    const findPushs = await getDocs(qeury);

    const data: DocumentData[] = [];
    findPushs.forEach((doc) => {
        data.push({
            id: doc.data().id,
            sender_id: doc.data().sender_id,
            title: doc.data().title,
            message: doc.data().message,
            created_date: doc.data().created_date.toDate(),
        });
    });

    const newData: DocumentData[] = [];
    for (let value of data) {
        const findUser = await getDoc(doc(db, "user", String(value.sender_id)));

        // 친구 정보 가져오기
        const q = query(collection(db, "friend"), where("user_id", "==", Number(user_id)), where("target_id", "==", Number(value.sender_id)), limit(1));
        const findFriends = await getDocs(q);
        const friend: DocumentData[] = [];
        findFriends.forEach((doc) => {
            friend.push(doc.data());
        });

        newData.push({
            id: value.id,
            sender_id: value.sender_id,
            friend_id: friend[0].id,
            nickname: findUser.data()?.nickname,
            profile_img: findUser.data()?.profile_imge,
            title: value.title,
            message: value.message,
            created_date: value.created_date,
        });
    }

    return res.json({ status: 200, data: newData });
});

export default handler;
