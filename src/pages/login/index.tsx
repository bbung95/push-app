import UserInputBox from "@/components/UserInputBox";
import Link from "next/link";
import React, { useState } from "react";
import { UserFormProps } from "@/@types/userType";
import { UserAuthErrorCodes } from "@/@types/errors";
import { signIn } from "next-auth/react";
import { useSetRecoilState } from "recoil";
import { loadingState } from "@/recoil/atoms/loadingState";
import Alert from "@/components/Alert";
import { alertState } from "@/recoil/atoms/alertState";

const index = () => {
    const setIsLoading = useSetRecoilState(loadingState);

    const setAlertState = useSetRecoilState(alertState);
    const showAlertMessage = (message: string, type: string) => {
        const state = { isShow: true, message: message, type: type };
        setAlertState(state);
        setTimeout(() => {
            setAlertState({ ...state, isShow: false });
        }, 2000);
    };
    const handleOnClickLogin = async ({ email, password }: UserFormProps) => {
        if (email === "") {
            const errorMessage = UserAuthErrorCodes["invalid-email"];
            showAlertMessage(errorMessage, "warning");
            return;
        }

        if (password.length < 6) {
            const errorMessage = UserAuthErrorCodes["weak-password"];
            showAlertMessage(errorMessage, "warning");
            return;
        }

        setIsLoading(true);
        const res = await signIn("credentials", { username: email, password: password, redirect: false });

        if (!res?.ok) {
            const errorMessage = UserAuthErrorCodes["sign-in-fail"];
            showAlertMessage(errorMessage, "warning");
        }
        setIsLoading(false);
    };

    return (
        <div className="relative h-full bg-main-color flex flex-col">
            <div className="flex-1 w-11/12 m-auto pt-4">
                <div className="flex gap-3 flex-1 items-center">
                    <Link href={"/"}>
                        <img src="/icon/arrow-back-white.svg" alt="" width={28} height={28} />
                    </Link>
                </div>
            </div>
            <div className="absolute pb-8 pt-5 top-1/2 -translate-y-1/2 bg-white w-full rounded-3xl drop-shadow-[0_1px_3px_rgba(25,40,47,0.5)]">
                <img src="/image/white-image.png" alt="" className="w-32 m-auto pt-3" />
                <UserInputBox title="로그인" handle={handleOnClickLogin} />
            </div>
        </div>
    );
};

export default index;
