import Link from "next/link";

export default function index() {
    return (
        <div className="h-full bg-main-color">
            <div className="flex flex-col gap-4 w-9/12 m-auto pt-96">
                <Link href={"/home"} className="btn bg-white text-gray-600 hover:bg-white">
                    로그인
                </Link>
                <Link href={"/home"} className="btn bg-white text-gray-600 hover:bg-white">
                    회원가입
                </Link>
                <Link href={"/home"} className="btn btn-warning text-gray-600">
                    kakao
                </Link>
                <Link href={"/home"} className="btn bg-white text-gray-600 hover:bg-white">
                    google
                </Link>
            </div>
        </div>
    );
}
