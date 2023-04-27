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
    key: "authState", // unique ID (with respect to other atoms/selectors)
    default: initialState, // default value (aka initial value)
});
