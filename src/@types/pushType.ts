import { FieldValue } from "firebase/firestore";

export interface PushMessageProps {
    sender_id: number;
    title: string;
    message: string;
    receiver_id: number;
}

export interface PushRecentProps {
    id: number;
    sender_id: number;
    friend_id: number;
    nickname: string;
    profile_img: string;
    title: string;
    message: string;
    created_date: Date;
}

export interface FriendMessageProps {
    id: number;
    sender_id: number;
    title: string;
    message: string;
    created_date: Date;
}
