import UserInputBox from "@/components/UserInputBox";
import Link from "next/link";
import React, { useState } from "react";
import { UserFormProps } from "@/@types/userType";
import { UserAuthErrorCodes } from "@/@types/errors";
import { fetchEmailCheck, fetchUserAdd } from "@/api/UserFetchAPI";
import { useRouter } from "next/router";
import { useSetRecoilState } from "recoil";
import { loadingState } from "@/recoil/atoms/loadingState";
import Alert from "@/components/Alert";
import { alertState } from "@/recoil/atoms/alertState";

const index = () => {
    const router = useRouter();
    const setIsLoading = useSetRecoilState(loadingState);

    const setAlertState = useSetRecoilState(alertState);
    const showAlertMessage = (message: string, type: string) => {
        const state = { isShow: true, message: message, type: type };
        setAlertState(state);
        setTimeout(() => {
            setAlertState({ ...state, isShow: false });
        }, 2000);
    };

    const handleOnClickSignup = async ({ email, password, passwordCheck }: UserFormProps) => {
        if (email === "" || !email.includes("@")) {
            const errorMessage = UserAuthErrorCodes["invalid-email"];
            showAlertMessage(errorMessage, "warning");
            return;
        }

        if (password.length < 6) {
            const errorMessage = UserAuthErrorCodes["weak-password"];
            showAlertMessage(errorMessage, "warning");
            return;
        }

        if (password !== passwordCheck) {
            const errorMessage = UserAuthErrorCodes["wrong-password"];
            showAlertMessage(errorMessage, "warning");
            return;
        }

        const { data } = await fetchEmailCheck(email);

        if (!data) {
            const errorMessage = UserAuthErrorCodes["email-already-in-use"];
            showAlertMessage(errorMessage, "warning");
            return;
        }

        setIsLoading(true);
        const res = await fetchUserAdd({ email, password });
        setIsLoading(false);

        showAlertMessage("회원가입이 완료되었습니다.", "info");
        router.push("/");
    };

    return (
        <div className="relative h-full bg-main-color flex flex-col">
            <div className="flex-1 w-11/12 m-auto pt-4 ">
                <div className="flex gap-3 items-center">
                    <Link href={"/"}>
                        <img src="/icon/arrow-back-white.svg" alt="" width={28} height={28} />
                    </Link>
                </div>
            </div>
            <div className="absolute pb-8 top-1/2 -translate-y-1/2 bg-white w-full rounded-3xl drop-shadow-[0_1px_3px_rgba(25,40,47,0.5)]">
                <img src="/image/white-image.png" alt="" className="w-32 m-auto pt-3" />
                <UserInputBox title="회원가입" handle={handleOnClickSignup} type="signup" />
            </div>
        </div>
    );
};

export default index;
