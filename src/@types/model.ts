import { FieldValue } from "firebase/firestore";

export interface UserProps {
    name: string;
    nickname: string;
    password: string;
    profile_img: string;
    state_message: string;
    first_login: boolean;
    created_date: FieldValue;
    modified_date: FieldValue;
    login_date: FieldValue;
}
