import axios from "axios";

export const fetchAddLocker = async (user_id: number, push_id: number) => {
    const res = await axios({
        method: "post",
        url: "/api/locker",
        headers: {
            "Content-Type": "application/json",
        },
        data: {
            user_id: user_id,
            push_id: push_id,
        },
    });

    return res;
};

export const fetchLockerList = async (user_id: number) => {
    const res = await axios({
        method: "get",
        url: "/api/locker",
        params: {
            user_id: user_id,
        },
    });

    return res;
};
