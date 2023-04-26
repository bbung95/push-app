import FriendItem from "@/components/FriendItem";
import Navigation from "@/components/Navigation";
import Link from "next/link";
import React from "react";

const index = () => {
    return (
        <main className="h-full bg-white w-full overflow-auto pb-28">
            <div className="w-11/12 m-auto mt-12">
                <h1 className="text-3xl font-bold">마이페이지</h1>
                <div className="relative mt-4 h-56 p-4 flex flex-col bg-white rounded-3xl drop-shadow-[1px_1px_6px_rgba(128,128,128,0.25)]">
                    <div className="flex gap-3">
                        <img className="w-18 h-18 rounded-xl" src="https://via.placeholder.com/80x80" alt="" />
                        <span className="text-xl flex-1 font-bold text-gray-700">Alice Smith</span>
                    </div>
                    <p className="mt-4 line-clamp-2">안녕하세요 나는 뻥뻥이입니다</p>

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
                </div>
            </div>
        </main>
    );
};

export default index;
