import { query } from "firebase/firestore";
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

// FCM Token 삭제
export const fetchDeleteUserToken = async (id: string) => {
    const res = await axios({
        method: "delete",
        url: "/api/user/token",
        params: {
            id: id,
        },
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

// 유저 검색
export const fetchUserSearch = async (keyword: string) => {
    const res = await axios({
        url: "/api/user/search",
        method: "get",
        params: {
            keyword: keyword,
        },
    });

    return res;
};
