import { FriendMessageProps } from "@/@types/pushType";
import { formatDate } from "@/utils/DateUtile";
import { useSession } from "next-auth/react";
import React from "react";

const PushMessage = ({ info }: { info: FriendMessageProps }) => {
    const { data: session } = useSession();

    const { id, title, message, created_date, sender_id } = info;

    return (
        <div>
            {session?.user.id !== sender_id ? (
                <div className="chat chat-start">
                    <div className="chat-header">
                        <span className=" font-bold text-md">{title}</span>
                        <time className="text-xs opacity-50"> {formatDate(created_date)}</time>
                    </div>
                    <div className="chat-bubble bg-gray-300 text-gray-700">{message}</div>
                </div>
            ) : (
                <div className="chat chat-end">
                    <div className="chat-header">
                        <span className=" font-bold text-md">{title}</span>
                        <time className="text-xs opacity-50"> {formatDate(created_date)}</time>
                    </div>
                    <div className="chat-bubble">{message}</div>
                </div>
            )}
        </div>
    );
};

export default PushMessage;
