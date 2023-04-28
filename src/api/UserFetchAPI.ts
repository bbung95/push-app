import { async } from "@firebase/util";
import { UserAddProps, UserNicknameUpdateProps, UserTokenUpdateProps, UserUpdateProps } from "@/@types/userType";
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

    return res;
};

export const fetchGetUser = async (id: string) => {
    const res = await axios.get(`/api/user/${id}`);

    return res;
};

export const fetchNicknameCheck = async (nickname: string) => {
    const res = await axios.get("/api/user/nickname", { params: { nickname: nickname } });

    return res;
};

export const fetchNicknameUpdate = async (data: UserNicknameUpdateProps) => {
    const res = await axios({
        url: `/api/user/nickname`,
        method: "put",
        headers: {
            "Content-Type": "application/json",
        },
        data: data,
    });

    return res;
};

export const fetchUserTokenUpdate = async (data: UserTokenUpdateProps) => {
    const res = await axios({
        url: `/api/user/token`,
        method: "put",
        headers: {
            "Content-Type": "application/json",
        },
        data: data,
    });

    return res;
};

export const fetchUserProfileUpdate = async (data: UserUpdateProps) => {
    const res = await axios({
        url: "/api/user",
        method: "put",
        headers: {
            "Content-Type": "application/json",
        },
        data: data,
    });

    return res;
};
