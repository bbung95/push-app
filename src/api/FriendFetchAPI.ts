import { FriendAddProps } from "@/@types/friendType";
import { InvitedAcceptProps } from "@/@types/inviteType";
import axios from "axios";

// 친구 검색
export const fetchFriendSearch = async (keyword: string) => {
    const res = await axios({
        url: "/api/user/search",
        method: "get",
        params: {
            keyword: keyword,
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

// 초대 수럭
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
