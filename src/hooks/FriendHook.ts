import { FriendItemProps } from "@/@types/friendType";
import { fetchFriendList } from "@/api/FriendFetchAPI";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";

export const useFriendList = (id: number) => {
    const { data, isLoading } = useQuery(["friendListKey", id], () => fetchFriendList(Number(id)), {
        cacheTime: 1000 * 60 * 5,
        staleTime: 1000 * 10 * 1,
    });
    const [friends, setFriends] = useState<FriendItemProps[]>([]);

    useEffect(() => {
        setFriends(data?.data.data || []);
    }, [isLoading, data]);

    const handleUserSearch = async (keyword: string) => {
        setFriends(data?.data.data.filter((item: FriendItemProps) => item.nickname.includes(keyword)));
    };

    return {
        friends,
        isLoading,
        handleUserSearch,
    };
};
