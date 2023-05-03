import { FriendItemProps } from "@/@types/friendType";
import { useRouter } from "next/router";
import React from "react";

const FriendItem = ({ info }: { info: FriendItemProps }) => {
    const router = useRouter();

    const { id, user_id, nickname, state_message, like } = info;

    const handleMoveDetail = () => {
        router.push(`/friend/${id}`);
    };

    return (
        <li className="p-3 h-28 w-wrap1/2 flex flex-col justify-between cursor-pointer rounded-xl bg-white drop-shadow-[1px_1px_6px_rgba(0,0,0,0.1)]" onClick={handleMoveDetail} role="button">
            <div className="flex justify-between">
                <span className="text-lg font-bold text-gray-700">{nickname}</span>
                <span>{like ? <img src="/icon/star-fill.svg" alt="" width={24} height={24} /> : <img src="/icon/star-empty.svg" alt="" width={24} height={24} />}</span>
            </div>
            <p className="text-sm text-gray-400 truncate">{state_message}</p>
        </li>
    );
};

export default FriendItem;
