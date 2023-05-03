import { FriendItemProps } from "@/@types/friendType";
import { fetchFriendList, fetchFriendSearch } from "@/api/FriendFetchAPI";
import FriendItem from "@/components/FriendItem";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const index = () => {
    const { data: session } = useSession();
    const [keyword, setKeyword] = useState("");
    const [friends, setFriends] = useState<FriendItemProps[]>([]);

    const handleUserSearch = async () => {
        const res = await fetchFriendSearch(keyword);
    };

    useEffect(() => {
        (async () => {
            const res = await fetchFriendList(Number(session?.user.id));

            if (res.data.status === 200) setFriends(res.data.data);
        })();
    }, []);

    return (
        <main className=" h-full bg-white w-full overflow-auto pb-28">
            <div className="w-11/12 m-auto pt-4">
                <div>
                    <div className="flex items-center">
                        <h1 className=" text-3xl font-bold">친구 목록</h1>
                        <Link href={"/friend/add"} className="ml-auto mr-4">
                            <img className="w-8 h-8" src="/icon/user-plus.svg" alt="" width={24} height={24} />
                        </Link>
                    </div>
                    <div className="mt-4 relative">
                        <input value={keyword} onChange={(e) => setKeyword(e.target.value)} type="text" placeholder="Search..." className="input input-bordered rounded-xl bg-gray-100 w-full pr-12" />
                        <button className="absolute right-4 top-1/2 -translate-y-1/2" onClick={handleUserSearch}>
                            <img className="w-8 h-8" src="/icon/search.svg" alt="" width={24} height={24} />
                        </button>
                    </div>
                </div>

                <ul className="mt-4 flex flex-wrap gap-3">
                    {friends.map((item) => (
                        <FriendItem key={item.id} info={item} />
                    ))}
                </ul>
            </div>
        </main>
    );
};

export default index;
