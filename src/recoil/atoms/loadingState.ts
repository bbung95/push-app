import { atom } from "recoil";

export const loadingState = atom({
    key: "loadingState", // 유니크한 key값
    default: false, // 기본 초기화 값
});
