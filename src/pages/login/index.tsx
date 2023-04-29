import UserInputBox from "@/components/UserInputBox";
import Link from "next/link";
import React from "react";
import { UserFormProps } from "@/@types/userType";
import { UserAuthErrorCodes } from "@/@types/errors";
import { fetchGetAuthUser, fetchLoginUser, fetchUserAdd } from "@/api/UserFetchAPI";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { authState } from "@/recoil/atoms/authState";

const index = () => {
    const [userAuth, setUserAuth] = useRecoilState(authState);

    const handleOnClickLogin = async ({ email, password }: UserFormProps) => {
        console.log("로그인 시작");

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

        const res = await fetchLoginUser({ email, password });
        if (!res) {
            return;
        }

        localStorage.setItem("jwt-token", res.data.data.token);
        const { data } = await fetchGetAuthUser(res.data.data.token);
        alert("로그인 되었습니다.");
        setUserAuth(data.data);
    };

    return (
        <div className="h-full bg-main-color flex flex-col-reverse">
            <div className="pb-12 pt-5 bg-white rounded-t-3xl drop-shadow-[0_1px_3px_rgba(25,40,47,0.5)]">
                <UserInputBox title="로그인" handle={handleOnClickLogin} />
            </div>
            <div className="flex-1 w-11/12 m-auto pt-4 ">
                <div className="flex gap-3 items-center">
                    <Link href={"/"}>
                        <img src="/icon/arrow-back-white.svg" alt="" width={28} height={28} />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default index;
