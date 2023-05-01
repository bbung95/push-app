import { signIn, useSession } from "next-auth/react";
import Link from "next/link";

export default function index() {
    const { data: session } = useSession();

    console.log("session", session);

    return (
        <div className="h-full bg-main-color">
            {session && session.user?.email}

            <div className="flex flex-col gap-4 w-9/12 m-auto pt-96">
                <Link href={"/login"} className="btn bg-white border-0 text-gray-600 hover:bg-white drop-shadow-md">
                    로그인
                </Link>
                <Link href={"/signup"} className="btn bg-white border-0 text-gray-600 hover:bg-white drop-shadow-md">
                    회원가입
                </Link>
                <button className="btn bg-white border-0 text-gray-600 hover:bg-white drop-shadow-md" onClick={() => signIn()}>
                    next-auth-login
                </button>
                {/* <Link href={"/home"} className="btn btn-warning text-gray-600 drop-shadow-md">
                    kakao
                </Link>
                <button className="btn bg-white border-0 text-gray-600 hover:bg-white drop-shadow-md" onClick={handlerGoogleLogin}>
                    google
                </button> */}
            </div>
        </div>
    );
}
