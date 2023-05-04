import { PushMessageProps } from "@/@types/pushType";
import axios from "axios";

// push message 보내기
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

export const fetchRecentPushMessage = async (user_id: number) => {
    const res = await axios({
        method: "get",
        url: "/api/push/recent",
        params: {
            user_id: user_id,
        },
    });

    return res;
};
