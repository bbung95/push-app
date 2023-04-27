import FriendItem from "@/components/FriendItem";
import Navigation from "@/components/Navigation";
import { auth } from "@/lib/firebase-init";
import { authUserState } from "@/recoil/selectors/authUserState";
import { signOut } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useRecoilValue } from "recoil";

const index = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const router = useRouter();
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const user = useRecoilValue(authUserState);

    const handleOnClickLogout = async () => {
        if (!confirm("로그아웃 됩니다.")) {
            return;
        }

        await signOut(auth).then(() => {
            router.push("/");
        });
    };

    return (
        <main className="h-full bg-white w-full overflow-auto pb-28">
            <div className="w-11/12 m-auto mt-12">
                <h1 className="text-3xl font-bold">마이페이지</h1>
                <div className="relative mt-4 h-56 p-4 flex flex-col bg-white rounded-3xl drop-shadow-[1px_1px_6px_rgba(128,128,128,0.25)]">
                    <div className="flex gap-3">
                        <img className="w-18 h-18 rounded-xl" src="https://via.placeholder.com/80x80" alt="" />
                        <span className="text-xl flex-1 font-bold text-gray-700">{user.email}</span>
                    </div>
                    <p className="mt-4 line-clamp-2">{user.state_message}</p>

                    <button className="btn absolute w-[calc(100%_-_2rem)] bottom-4">
                        <img src="/icon/edit.svg" alt="" width={28} height={28} />
                    </button>
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
            </div>
        </main>
    );
};

export default index;
