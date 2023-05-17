import { PushRecentProps } from "@/@types/pushType";
import { formatDate } from "@/utils/DateUtile";
import Link from "next/link";
import React from "react";
import ProfileImage from "./ProfileImage";
import { useRouter } from "next/router";

const PushItem = ({ info }: { info: PushRecentProps }) => {
    const { id, sender_id, friend_id, nickname, profile_img, message, created_date } = info;
    const router = useRouter();

    const handleOnClickMessage = (id: number) => {
        if (id === 0) return;

        router.push(`/friend/${id}`);
    };

    return (
        <li className="flex items-center pl-2 pr-2 h-20 cursor-pointer" onClick={() => handleOnClickMessage(friend_id)}>
            <ProfileImage image={String(profile_img)} size={4} />
            <div className="flex-1 p-2">
                <p className="text-gray-500 line-clamp-2">{message}</p>
            </div>
            <div className="flex flex-col w-26 items-end">
                <span className="text-gray-700 font-bold truncate">{nickname}</span>
                <span className="text-gray-400 whitespace-nowrap">{formatDate(created_date)}</span>
            </div>
        </li>
    );
};

export default PushItem;
