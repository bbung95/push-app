import { NextApiRequest, NextApiResponse } from "next";
import { DocumentData, collection, doc, getDoc, getDocs, or, orderBy, query, serverTimestamp, setDoc, where } from "firebase/firestore";
import nextConnect from "next-connect";
import fcmAdmin from "@/lib/firebase-admin";
import { db } from "@/lib/firebase-init";
import { getIndex } from "@/utils/DBUtill";
import { PushProps } from "@/@types/model";
import { FriendMessageProps } from "@/@types/pushType";
import { createMessage, sendPushMessage } from "@/utils/PushUtil";
import { PushMessageTypes } from "@/@types/message";

const handler = nextConnect<NextApiRequest, NextApiResponse>();

// 친구 message 내역
handler.get(async (req, res) => {
    const user_id = req.query.user_id;
    const target_id = req.query.target_id;

    const qeury = query(
        collection(db, "push"),
        where("receiver_id", "in", [Number(user_id), Number(target_id)]),
        where("sender_id", "in", [Number(user_id), Number(target_id)]),
        orderBy("created_date", "desc")
    );
    const findPushs = await getDocs(qeury);

    const data: FriendMessageProps[] = [];
    findPushs.forEach((doc) => {
        data.push({
            id: doc.data().id,
            sender_id: doc.data().sender_id,
            message: doc.data().message,
            created_date: doc.data().created_date.toDate(),
        });
    });

    return res.json({ status: 200, data: data });
});

// message 보내기
handler.post(async (req, res) => {
    const body = req.body;

    const findUser = await getDoc(doc(db, "user", String(body.receiver_id)));

    // push message DB add
    const index = await getIndex("push");
    const push: PushProps = {
        id: index,
        sender_id: body.sender_id,
        receiver_id: body.receiver_id,
        message: body.message,
        created_date: serverTimestamp(),
    };
    await setDoc(doc(db, "push", String(push.id)), push);
    //

    let deviceToken = findUser.data()?.token ?? "";
    if (!deviceToken) {
        return res.json({ status: 201 });
    }

    const message = createMessage(PushMessageTypes["push-message"], push.message, deviceToken);
    const data = await sendPushMessage(message);

    return res.json({ status: 201 });
});

export default handler;
