import { fetchFriendSearch } from "@/api/FriendFetchAPI";
import FriendItem from "@/components/FriendItem";
import Link from "next/link";
import React, { useState } from "react";

const index = () => {
    const [keyword, setKeyword] = useState("");

    const handleUserSearch = async () => {
        const res = await fetchFriendSearch(keyword);

        console.log(res.data);
    };

    return (
        <main className="relative h-full bg-white w-full overflow-auto pb-28">
            <div className="w-11/12 m-auto pt-4">
                <h1 className=" text-3xl font-bold">친구 목록</h1>
                <div className="mt-4 relative">
                    <input value={keyword} onChange={(e) => setKeyword(e.target.value)} type="text" placeholder="Search..." className="input input-bordered rounded-xl bg-gray-100 w-full pr-12" />
                    <button className="absolute right-4 top-1/2 -translate-y-1/2" onClick={handleUserSearch}>
                        <img className="w-8 h-8" src="/icon/search.svg" alt="" width={24} height={24} />
                    </button>
                </div>

                <ul className="mt-4 flex flex-wrap gap-3">
                    {Array(18)
                        .fill("")
                        .map((_, idx) => (
                            <FriendItem key={idx} />
                        ))}
                </ul>
            </div>

            <Link href={"/friend/add"} className="fixed avatar placeholder bottom-28 w-full max-w-screen-sm drop-shadow-[0_1px_3px_rgba(25,40,47,0.5)]">
                <div className="bg-main-color text-neutral-content rounded-full w-12 ml-auto mr-4 hover:scale-110 transition-all">
                    <span className="p-0 text-xl">+</span>
                </div>
            </Link>
        </main>
    );
};

export default index;
