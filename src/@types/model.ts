import { FieldValue } from "firebase/firestore";

export interface UserProps {
    id: number;
    email?: string;
    password?: string;
    nickname: string;
    profile_img: string;
    state_message?: string;
    first_login: boolean;
    created_date: FieldValue;
    modified_date: FieldValue;
    login_date: FieldValue;
    token: string;
    auth_type: string;
    oauth_id?: number;
}

export interface FriendProps {
    id: number;
    user_id: number;
    target_id: number;
    created_date: FieldValue;
    like: boolean;
    accept: boolean;
}

export interface PushProps {
    id: number;
    sender_id: number;
    receiver_id: number;
    title: string;
    message: string;
    created_date: FieldValue;
}
