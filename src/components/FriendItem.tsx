import { FriendItemProps } from "@/@types/friendType";
import { fetchChangeLike } from "@/api/FriendFetchAPI";
import { useRouter } from "next/router";
import React, { useState } from "react";

const FriendItem = ({ info }: { info: FriendItemProps }) => {
    const router = useRouter();

    const [friend, setFriend] = useState<FriendItemProps>(info);

    const handleMoveDetail = () => {
        router.push(`/friend/${friend.id}`);
    };

    const handleChangeLike = async (e: React.MouseEvent) => {
        e.stopPropagation();

        console.log(friend);

        const res = await fetchChangeLike(friend.id, friend.like);

        if (res.data.status === 201) {
            setFriend({ ...friend, like: !friend.like });
        }
    };

    return (
        <li className="p-3 h-28 w-wrap1/2 flex flex-col justify-between cursor-pointer rounded-xl bg-white drop-shadow-[1px_1px_6px_rgba(0,0,0,0.1)]" onClick={handleMoveDetail} role="button">
            <div className="flex justify-between">
                <span className="text-lg font-bold text-gray-700">{friend.nickname}</span>
                <span onClick={handleChangeLike}>
                    {friend.like ? <img className="w-8" src="/icon/star-fill.svg" alt="" width={24} height={24} /> : <img className="w-8" src="/icon/star-empty.svg" alt="" width={24} height={24} />}
                </span>
            </div>
            <p className="text-sm text-gray-400 truncate">{friend.state_message}</p>
        </li>
    );
};

export default FriendItem;
