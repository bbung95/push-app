import { selector } from "recoil";
import { authState } from "../atoms/authState";
import { onAuthStateChanged } from "firebase/auth";

export const authUserState = selector({
    key: "authUserState",
    get: ({ get }) => {
        const auth = get(authState);

        return auth;
    },
});
