import { FieldValue } from "firebase/firestore";

export interface UserProps {
    id: string;
    email: string;
    nickname: string;
    profile_img: string;
    state_message?: string;
    first_login: boolean;
    created_date: FieldValue;
    modified_date: FieldValue;
    login_date: FieldValue;
}
