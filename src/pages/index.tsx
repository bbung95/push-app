import { signIn } from "next-auth/react";
import Link from "next/link";

export default function index() {
    const handleOAuthLogin = async (type: string) => {
        const result = await signIn(type, { callbackUrl: "/home" });
    };

    return (
        <div className="h-full bg-main-color">
            <div className="flex flex-col gap-4 w-9/12 m-auto pt-96">
                <Link href={"/login"} className="btn bg-white border-0 text-gray-600 hover:bg-white drop-shadow-md">
                    로그인
                </Link>
                <Link href={"/signup"} className="btn bg-white border-0 text-gray-600 hover:bg-white drop-shadow-md">
                    회원가입
                </Link>
                <button className="btn btn-warning text-gray-600 drop-shadow-md" onClick={() => handleOAuthLogin("kakao")}>
                    kakao
                </button>
                {/* <button className="btn bg-white border-0 text-gray-600 hover:bg-white drop-shadow-md" onClick={handlerGoogleLogin}>
                    google
                </button> */}
            </div>
        </div>
    );
}
