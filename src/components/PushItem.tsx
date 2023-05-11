import { PushRecentProps } from "@/@types/pushType";
import { formatDate } from "@/utils/DateUtile";
import Link from "next/link";
import React from "react";
import ProfileImage from "./ProfileImage";

const PushItem = ({ info }: { info: PushRecentProps }) => {
    const { id, sender_id, friend_id, nickname, profile_img, title, message, created_date } = info;

    return (
        <Link href={`/friend/${friend_id}`}>
            <li className="flex items-center pl-2 pr-2 h-20 cursor-pointer">
                <ProfileImage image={String(profile_img)} size={4} />
                <div className="flex-1 p-2">
                    <span className="text-lg font-bold text-gray-700 line-clamp-1">{title}</span>
                    <p className="text-gray-500 line-clamp-1">{message}</p>
                </div>
                <div className="flex flex-col w-26 items-end">
                    <span className="text-gray-700 truncate">{nickname}</span>
                    <span className="text-gray-400 whitespace-nowrap">{formatDate(created_date)}</span>
                </div>
            </li>
        </Link>
    );
};

export default PushItem;
