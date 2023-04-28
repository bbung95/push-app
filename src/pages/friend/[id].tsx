import Navigation from "@/components/Navigation";
import PushMessage from "@/components/PushMessage";
import Link from "next/link";
import React from "react";

const index = () => {
    return (
        <main className="h-full bg-white w-full overflow-auto pb-28">
            <div className="w-11/12 m-auto mt-12">
                <div className="flex gap-3 items-center">
                    <Link href={"/friend"}>
                        <img src="/icon/arrow-back.svg" alt="" width={28} height={28} />
                    </Link>
                    <h1 className=" text-3xl font-bold">친구</h1>
                </div>

                <div className="mt-4 h-40 p-4 bg-white rounded-3xl drop-shadow-[1px_1px_6px_rgba(128,128,128,0.25)]">
                    <div className="flex gap-3">
                        <img className="w-28 h-28 rounded-xl" src="https://via.placeholder.com/80x80" alt="" />
                        <div className="flex-1">
                            <span className="text-2xl flex-1 font-bold text-gray-700">Alice Smith</span>
                            <p className="mt-4 line-clamp-2">안녕하세요 나는 뻥뻥이입니다</p>
                        </div>
                        <span>
                            <img className="w-10" src="/icon/star-fill.svg" alt="" width={24} height={24} />
                        </span>
                    </div>
                </div>

                <div className="mt-4 flex gap-2">
                    <Link href={"/push/1"} className="btn btn-info flex-1">
                        <img src="/icon/message.svg" alt="" width={28} height={28} />
                    </Link>

                    <Link href={"/friend/1"} className="btn btn-error w-24">
                        <img src="/icon/trash.svg" alt="" width={28} height={28} />
                    </Link>
                </div>

                <div className="mt-4">
                    {Array(7)
                        .fill("")
                        .map((_, idx) => (
                            <PushMessage key={idx} id={idx} />
                        ))}
                </div>
            </div>
        </main>
    );
};

export default index;
