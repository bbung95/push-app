import { UserAddProps } from "@/@types/userType";
import axios from "axios";

export const fetchUserAdd = async ({ id, email }: UserAddProps) => {
    const res = await axios({
        url: "/api/user",
        method: "post",
        headers: {
            "Content-Type": "application/json",
        },
        data: {
            id: id,
            email: email,
        },
    });

    console.log("fetchUserAdd", res);

    return res;
};

export const fetchGetUser = async (id: string) => {
    const res = await axios.get(`/api/user/${id}`);

    console.log("fetchGetUser", res);

    return res;
};
