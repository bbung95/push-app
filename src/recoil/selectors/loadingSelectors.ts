import { selector } from "recoil";
import { loadingState } from "../atoms/loadingState";

export const fetchLoadingState = selector({
    key: "fetchLoadingState",
    get: ({ get }) => {
        const isLoading = get(loadingState);

        return isLoading;
    },
    set: ({ set }, value) => {
        set(loadingState, value);
    },
});
