import UserInputBox from "@/components/UserInputBox";
import Link from "next/link";
import React from "react";
import { UserFormProps } from "@/@types/userType";
import { UserAuthErrorCodes } from "@/@types/errors";
import { signIn } from "next-auth/react";
import { useSetRecoilState } from "recoil";
import { loadingState } from "@/recoil/atoms/loadingState";

const index = () => {
    const setIsLoading = useSetRecoilState(loadingState);

    const handleOnClickLogin = async ({ email, password }: UserFormProps) => {
        if (email === "") {
            const errorMessage = UserAuthErrorCodes["invalid-email"];
            alert(errorMessage);
            return;
        }

        if (password.length < 6) {
            const errorMessage = UserAuthErrorCodes["weak-password"];
            alert(errorMessage);
            return;
        }

        setIsLoading(true);
        await signIn("credentials", { username: email, password: password, redirect: false });
        setIsLoading(false);
    };

    return (
        <div className="h-full bg-main-color flex flex-col-reverse items-center">
            <div className="pb-12 pt-5 bg-white w-full rounded-t-3xl drop-shadow-[0_1px_3px_rgba(25,40,47,0.5)]">
                <UserInputBox title="로그인" handle={handleOnClickLogin} />
            </div>
            <div className="flex-1 w-11/12 m-auto pt-4">
                <div className="flex gap-3 flex-1 items-center">
                    <Link href={"/"}>
                        <img src="/icon/arrow-back-white.svg" alt="" width={28} height={28} />
                    </Link>
                </div>
                <img src="/image/white-logo.png" alt="" className="w-40 m-auto pt-3" />
            </div>
        </div>
    );
};

export default index;
