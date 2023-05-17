import { NextApiRequest, NextApiResponse } from "next";
import { DocumentData, collection, getDocs, limit, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase-init";
import nextConnect from "next-connect";
import { UserSearchProps } from "@/@types/userType";

const handler = nextConnect<NextApiRequest, NextApiResponse>();

handler.get(async (req, res) => {
    const keyword = String(req.query.keyword);
    const user_id = String(req.query.user_id);

    const qeury = query(collection(db, "user"), where("nickname", "==", keyword), limit(1));
    const findUsers = await getDocs(qeury);

    const data: UserSearchProps[] = [];
    findUsers.forEach((doc) => {
        data.push({
            id: doc.data().id,
            profile_img: doc.data().profile_img,
            nickname: doc.data().nickname,
            state_message: doc.data().state_message,
            isFriend: false,
        });
    });

    // 만약 친구가 이미 초대 or 추가 되어 있을 경우 disable 처리
    if (data.length > 0) {
        const q = query(collection(db, "friend"), where("user_id", "==", Number(user_id)), where("target_id", "==", Number(data[0].id)), limit(1));
        const findFriends = await getDocs(q);

        findFriends.forEach((item) => {
            data[0].isFriend = true;
        });
    }

    if (data.length > 0) {
        const q = query(collection(db, "friend"), where("user_id", "==", Number(data[0].id)), where("target_id", "==", Number(user_id)), limit(1));
        const findFriends = await getDocs(q);

        findFriends.forEach((item) => {
            data[0].isFriend = true;
        });
    }

    return res.json({ status: 200, data: data });
});

export default handler;
