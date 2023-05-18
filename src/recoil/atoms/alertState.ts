import { atom } from "recoil";

const initalize = {
    type: "warning",
    message: "",
    isShow: false,
};

export const alertState = atom({
    key: "alertState", // 유니크한 key값
    default: initalize, // 기본 초기화 값
});
