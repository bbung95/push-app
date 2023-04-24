// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import Subscribe from "@/models/Subscribe";
import dbConnect from "@/lib/dbConnect";
import fcmAdmin, { createMessage } from "@/lib/firebase-admin";

const handler = nextConnect<NextApiRequest, NextApiResponse>();

handler.get(async (req, res) => {
    // await dbConnect();

    let deviceToken = `fo9mMV15erjL6pZiAa7qC4:APA91bG5JNU78UIIgn6szfDfL8bCqNfJlE1B26muJKELrSLKRiCT_KSS_L3hrZQ07orZIc6lwAb_iQTmxyEGME1_guQVCAq_LVBnNxWim4AsBjbykfQsoElAWWwnks20RVdeJxsg7n6K`;
    const message = createMessage(deviceToken, {
        title: "테스트 발송💛",
        body: "망고플레이트 앱 확인해보세요!💚",
    });

    fcmAdmin
        .messaging()
        .send(message)
        .then(function (response) {
            console.log("Successfully sent message: : ", response);
            return res.status(200).json({ success: true });
        })
        .catch(function (err) {
            console.log("Error Sending message!!! : ", err);
            return res.status(400).json({ success: false });
        });
});

export default handler;
