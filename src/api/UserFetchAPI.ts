import { async } from "@firebase/util";
import { UserAddProps, UserNicknameUpdateProps, UserTokenUpdateProps, UserUpdateProps } from "@/@types/userType";
import axios from "axios";

// 유저 가져오기
export const fetchGetUser = async (id: string) => {
    const res = await axios.get(`/api/user/${id}`);

    return res;
};

// 닉네임 중복체크
export const fetchNicknameCheck = async (nickname: string) => {
    const res = await axios.get("/api/user/nickname", { params: { nickname: nickname } });
    return res;
};

// 이메일 중복체크
export const fetchEmailCheck = async (email: string) => {
    const res = await axios.get("/api/user", { params: { email: email } });
    return res;
};

// 로그인
export const fetchLoginUser = async (data: UserAddProps) => {
    const res = await axios({
        url: "/api/user/login",
        method: "post",
        headers: {
            "Content-Type": "application/json",
        },
        data: data,
    });

    if (res.data.status >= 400) {
        console.error(`status ${res.data.status}`, res.data.code);
        alert("문제가 발생했습니다.");
        return false;
    }

    return res;
};

// 회원가입
export const fetchUserAdd = async (data: UserAddProps) => {
    const res = await axios({
        url: "/api/user",
        method: "post",
        headers: {
            "Content-Type": "application/json",
        },
        data: data,
    });

    return res;
};

// 닉네임 업데이트
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

// FCM Token 업데이트
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

// profile 업데이트
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

export const fetchGetAuthUser = async (token: string) => {
    const res = await axios.get("/api/user/token", { headers: { Authorization: "Bearer " + token } });

    return res;
};
