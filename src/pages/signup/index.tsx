import UserInputBox from "@/components/UserInputBox";
import Link from "next/link";
import React from "react";
import { UserFormProps } from "@/@types/userType";
import { UserAuthErrorCodes } from "@/@types/errors";
import { fetchEmailCheck, fetchUserAdd } from "@/api/UserFetchAPI";
import { useRouter } from "next/router";

const index = () => {
    const router = useRouter();

    const handleOnClickSignup = async ({ email, password, passwordCheck }: UserFormProps) => {
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

        if (password !== passwordCheck) {
            const errorMessage = UserAuthErrorCodes["wrong-password"];
            alert(errorMessage);
            return;
        }

        const { data } = await fetchEmailCheck(email);

        if (!data) {
            const errorMessage = UserAuthErrorCodes["email-already-in-use"];
            alert(errorMessage);
            return;
        }

        const res = await fetchUserAdd({ email, password });
        localStorage.setItem("jwt-token", res.data);

        alert("회원가입이 완료되었습니다.");
        router.push("/");
    };

    return (
        <div className="h-full bg-main-color flex flex-col-reverse">
            <div className="pb-5 pt-5 bg-white rounded-t-3xl drop-shadow-[0_1px_3px_rgba(25,40,47,0.5)]">
                <UserInputBox title="회원가입" handle={handleOnClickSignup} type="signup" />
            </div>
            <div className="flex-1 w-11/12 m-auto pt-4 ">
                <div className="flex gap-3 items-center">
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
