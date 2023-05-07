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

// 최근 message 내역
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

// 친구 message 내역
export const fetchFriendPushMessage = async (user_id: number, target_id: number) => {
    const res = await axios({
        method: "get",
        url: "/api/push",
        params: {
            user_id: user_id,
            target_id: target_id,
        },
    });

    return res;
};
