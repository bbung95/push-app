import { selector } from "recoil";
import { alertState } from "../atoms/alertState";

export const alertStateSelector = selector({
    key: "alertStateSelector",
    get: ({ get }) => {
        const state = get(alertState);

        return state;
    },
    set: ({ set }, value) => {
        set(alertState, value);
    },
});
