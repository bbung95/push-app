import UserInputBox from "@/components/UserInputBox";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/router";

const index = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const router = useRouter();

    const btns = [
        { name: "로그인", color: "btn-info", handle: (e: React.MouseEvent<HTMLButtonElement>) => router.push("/") },
        { name: "회원가입", color: "btn-warning", handle: (e: React.MouseEvent<HTMLButtonElement>) => router.push("/signup") },
    ];

    return (
        <div className="h-full bg-main-color flex flex-col-reverse">
            <div className="h-3/5 pt-5 bg-white rounded-t-3xl drop-shadow-[0_1px_3px_rgba(25,40,47,0.5)]">
                <UserInputBox title="로그인" buttons={btns} />
            </div>
            <div className="flex-1 w-11/12 m-auto mt-12 ">
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
