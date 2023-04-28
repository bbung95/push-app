import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import fcmAdmin, { createMessage } from "@/lib/firebase-admin";
import { collection, doc, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase-init";
import { UserProps } from "@/@types/model";

const handler = nextConnect<NextApiRequest, NextApiResponse>();

// handler.get(async (req, res) => {
//     // await dbConnect();

//     let deviceToken = "fH8TkCaJyzyGi63RtaJhFN:APA91bESRedyGM0v4zaidc6-Njw5qts-oE8TBtGqksuohkkEjZiWzg0_w-WMhKFMDLb5KVpKXYjNRfAPM1Mt0IeByp27vFAIPFmZFabVOpQi58s4qB0747rLQCE6km0PwCBWCkCSxF1d";
//     const message = createMessage(deviceToken, {
//         title: "테스트 발송💛",
//         body: "망고플레이트 앱 확인해보세요!💚",
//     });

//     fcmAdmin
//         .messaging()
//         .send(message)
//         .then(function (response) {
//             console.log("Successfully sent message: : ", response);
//             return res.status(200).json({ success: true });
//         })
//         .catch(function (err) {
//             console.log("Error Sending message!!! : ", err);
//             return res.status(400).json({ success: false });
//         });
// })

handler.post(async (req, res) => {
    const body = req.body;

    const user: UserProps = {
        id: body.id,
        email: body.email,
        nickname: "",
        profile_img: "1234",
        state_message: "",
        first_login: true,
        created_date: serverTimestamp(),
        modified_date: serverTimestamp(),
        login_date: serverTimestamp(),
        token: "",
    };

    const docRef = await setDoc(doc(db, "user", body.id), user);

    return res.status(201);
});

handler.put(async (req, res) => {
    const body = req.body;

    await updateDoc(doc(db, "user", body.id), {
        nickname: body.nickname,
        state_message: body.state_message,
    });

    return res.json(true);
});

export default handler;
