import { FriendAddProps } from "@/@types/friendType";
import { InvitedAcceptProps } from "@/@types/inviteType";
import axios from "axios";

// 친구 정보
export const fetchGetFriend = async (id: number) => {
    const res = await axios({
        method: "get",
        url: `/api/friend/${id}`,
    });

    return res;
};

// 친구 목록
export const fetchFriendList = async (id: number) => {
    const res = await axios({
        method: "get",
        url: "/api/friend",
        params: {
            id: id,
        },
    });

    return res;
};

// 친구 삭제
export const fetchFriendRemove = async (id: number) => {
    const res = await axios({
        method: "delete",
        url: `/api/friend/${id}`,
    });

    return res;
};

// 즐겨찾기 변경
export const fetchChangeLike = async (id: number, like: boolean) => {
    const res = await axios({
        method: "put",
        url: `/api/friend/${id}`,
        headers: {
            "Content-Type": "application/json",
        },
        data: {
            like: like,
        },
    });

    return res;
};

// 초대 목록
export const fetchInvitedList = async (id: number) => {
    const res = await axios({
        method: "get",
        url: "/api/friend/invited",
        params: {
            id: id,
        },
    });

    return res;
};

// 친구 초대
export const fetchFriendInvited = async (data: FriendAddProps) => {
    const res = await axios({
        method: "post",
        url: "/api/friend/invited",
        headers: {
            "Content-Type": "application/json",
        },
        data: data,
    });

    return res;
};

// 초대 수락
export const fetchAcceptInvited = async (data: InvitedAcceptProps) => {
    const res = await axios({
        method: "put",
        url: "/api/friend/invited",
        headers: {
            "Content-Type": "application/json",
        },
        data: data,
    });

    return res;
};

// 초대 거절
export const fetchRefuseInvited = async (id: number) => {
    const res = await axios({
        method: "delete",
        url: "/api/friend/invited",
        params: {
            id: id,
        },
    });

    return res;
};
