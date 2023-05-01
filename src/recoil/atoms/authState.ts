import { UserAuthProps } from "@/@types/userType";
import { atom } from "recoil";

export const initialState: UserAuthProps = {
    id: "",
    email: "",
    nickname: "",
    profile_img: "",
    state_message: "",
    first_login: true,
    created_date: undefined,
    modified_date: undefined,
    login_date: undefined,
};

export const authState = atom({
    key: "authState", // 유니크한 key값
    default: initialState, // 기본 초기화 값
});
