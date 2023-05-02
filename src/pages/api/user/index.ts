import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import { collection, doc, getDocs, query, serverTimestamp, setDoc, updateDoc, where } from "firebase/firestore";
import { db } from "@/lib/firebase-init";
import { UserProps } from "@/@types/model";
import { getIndex } from "@/utils/DBUtill";
import { incoderPassword } from "@/utils/AuthUtil";

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

// 이메일 중복 체크
handler.get(async (req, res) => {
    const email = req.query.email;
    const qeury = query(collection(db, "user"), where("email", "==", email));

    const findUsers = await getDocs(qeury);

    if (findUsers.size > 0) {
        return res.json(false);
    }
    return res.json(true);
});

// 회원가입
handler.post(async (req, res) => {
    const body = req.body;

    const index = await getIndex("user");
    const incoderPwd = await incoderPassword(body.password);

    const user: UserProps = {
        id: index,
        email: body.email,
        password: incoderPwd,
        nickname: "",
        profile_img: "",
        state_message: "",
        first_login: true,
        created_date: serverTimestamp(),
        modified_date: serverTimestamp(),
        login_date: serverTimestamp(),
        token: "",
        auth_type: "email",
    };

    await setDoc(doc(db, "user", String(user.id)), user);

    return res.json({ status: 201 });
});

handler.put(async (req, res) => {
    const body = req.body;

    await updateDoc(doc(db, "user", String(body.id)), {
        nickname: body.nickname,
        state_message: body.state_message,
    });

    return res.json({ status: 201 });
});

export default handler;
