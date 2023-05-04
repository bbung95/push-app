import { PushMessageProps } from "@/@types/pushType";
import axios from "axios";

export const fetchPushMessage = async (data: PushMessageProps) => {
    const res = await axios({
        method: "post",
        url: "/api/push",
        headers: {
            "Content-Type": "application/json",
        },
        data: data,
    });

    return res;
};
