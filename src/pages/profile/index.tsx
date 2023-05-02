import { authState, initialState } from "@/recoil/atoms/authState";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";

const index = () => {
    const { data: session } = useSession();

    const handleOnClickLogout = async () => {
        if (!confirm("로그아웃 됩니다")) return;

        const data = await signOut({ redirect: false, callbackUrl: "/foo" });
    };

    return (
        <main className="h-full bg-white w-full overflow-auto pb-28">
            <div className="w-11/12 m-auto pt-4">
                <h1 className="text-3xl font-bold">마이페이지</h1>
                {session?.user && (
                    <>
                        <div className="relative mt-4 h-56 p-4 flex flex-col bg-white rounded-3xl drop-shadow-[1px_1px_6px_rgba(128,128,128,0.25)]">
                            <div className="flex gap-3">
                                <img className="w-28 h-28 rounded-xl" src="https://via.placeholder.com/80x80" alt="" />
                                <div className="w-full">
                                    <span className="text-2xl flex-1 font-bold text-gray-700">{session.user.nickname}</span>
                                    <p className="mt-4 line-clamp-2">{session.user.state_message}</p>
                                </div>
                            </div>

                            <Link href={"/profile/update"} className="btn absolute w-[calc(100%_-_2rem)] bottom-4">
                                <img src="/icon/edit.svg" alt="" width={28} height={28} />
                            </Link>
                        </div>

                        <div className="flex flex-col mt-4 gap-2">
                            <Link href="/profile/locker" className="btn btn-info text-white text-lg">
                                보관함
                            </Link>
                            <Link href="/profile/invited" className="btn btn-info text-white text-lg">
                                초대목록
                            </Link>
                            <button className="btn btn-error text-white text-lg" onClick={handleOnClickLogout}>
                                로그아웃
                            </button>
                        </div>
                    </>
                )}
            </div>
        </main>
    );
};

export default index;
