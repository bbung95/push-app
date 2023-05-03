// import { NextApiRequest, NextApiResponse } from "next";
// import { DocumentData, collection, getDocs, query, where } from "firebase/firestore";
// import { db } from "@/lib/firebase-init";
// import nextConnect from "next-connect";

// const handler = nextConnect<NextApiRequest, NextApiResponse>();

// handler.post(async (req, res) => {
//     const body = req.body;

//     const index = await getIndex("friend");
//     const incoderPwd = await incoderPassword(body.password);

//     const user: UserProps = {
//         id: index,
//         email: body.email,
//         password: incoderPwd,
//         nickname: "",
//         profile_img: "",
//         state_message: "",
//         first_login: true,
//         created_date: serverTimestamp(),
//         modified_date: serverTimestamp(),
//         login_date: serverTimestamp(),
//         token: "",
//         auth_type: "email",
//     };

//     await setDoc(doc(db, "user", String(user.id)), user);

//     return res.json({ status: 200, data: data });
// });

// export default handler;
