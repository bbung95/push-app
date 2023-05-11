import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import { collection, doc, getDocs, query, serverTimestamp, setDoc, updateDoc, where } from "firebase/firestore";
import { db } from "@/lib/firebase-init";
import { UserProps } from "@/@types/model";
import { getIndex } from "@/utils/DBUtill";
import { incoderPassword } from "@/utils/AuthUtil";

const handler = nextConnect<NextApiRequest, NextApiResponse>();

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

// 프로필 수정
handler.put(async (req, res) => {
    const body = req.body;

    await updateDoc(doc(db, "user", String(body.id)), {
        nickname: body.nickname,
        state_message: body.state_message,
        profile_img: body.profile_img,
    });

    return res.json({ status: 201 });
});

export default handler;
