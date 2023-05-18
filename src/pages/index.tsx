import { requestPermission } from "@/utils/Notification";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useEffect } from "react";

export default function index() {
    const handleOAuthLogin = async (type: string) => {
        const result = await signIn(type, { callbackUrl: "/home" });
    };

    return (
        <div className="relative h-full bg-main-color">
            <div className="absolute flex flex-col gap-4 w-9/12 m-auto items-center top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <img src="/image/white-logo.png" alt="" className="w-40 pt-32 pb-10" />

                <Link href={"/login"} className="btn bg-white w-full border-0 text-gray-600 hover:bg-white drop-shadow-md">
                    로그인
                </Link>
                <Link href={"/signup"} className="btn bg-white w-full border-0 text-gray-600 hover:bg-white drop-shadow-md">
                    회원가입
                </Link>
                <button className="btn btn-warning text-gray-600 w-full drop-shadow-md" onClick={() => handleOAuthLogin("kakao")}>
                    <img src="/icon/kakaoicon.png" alt="" className="w-8" /> 카카오 계정으로 로그인
                </button>
                {/* <button className="btn bg-white border-0 text-gray-600 hover:bg-white drop-shadow-md" onClick={handlerGoogleLogin}>
                    google
                </button> */}
            </div>
        </div>
    );
}
