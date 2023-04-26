// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import dbConnect from "@/lib/dbConnect";
import fcmAdmin, { createMessage } from "@/lib/firebase-admin";

const handler = nextConnect<NextApiRequest, NextApiResponse>();

handler.get(async (req, res) => {
    // await dbConnect();

    let deviceToken = "fH8TkCaJyzyGi63RtaJhFN:APA91bESRedyGM0v4zaidc6-Njw5qts-oE8TBtGqksuohkkEjZiWzg0_w-WMhKFMDLb5KVpKXYjNRfAPM1Mt0IeByp27vFAIPFmZFabVOpQi58s4qB0747rLQCE6km0PwCBWCkCSxF1d";
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
