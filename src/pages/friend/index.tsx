import { FriendItemProps } from "@/@types/friendType";
import { fetchFriendList } from "@/api/FriendFetchAPI";
import FriendItem from "@/components/FriendItem";
import { useFriendList } from "@/hooks/FriendHook";
import { loadingState } from "@/recoil/atoms/loadingState";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React, { useEffect, useRef } from "react";
import { useSetRecoilState } from "recoil";

const index = () => {
    const { data: session } = useSession();
    const inputRef = useRef<string>("");
    const setIsLoading = useSetRecoilState(loadingState);

    const { friends, handleUserSearch, isLoading } = useFriendList(Number(session?.user.id));

    useEffect(() => {
        setIsLoading(isLoading);
    }, [isLoading]);

    return (
        <main className=" h-full bg-white w-full overflow-hidden pb-28">
            <div className="w-11/12 m-auto pt-4 h-full">
                <div style={{ height: 100 }}>
                    <div className="flex items-center">
                        <h1 className=" text-3xl font-bold">친구 목록</h1>
                        <Link href={"/friend/add"} className="ml-auto mr-4">
                            <img className="w-8 h-8" src="/icon/user-plus.svg" alt="" width={24} height={24} />
                        </Link>
                    </div>
                    <div className="mt-4 relative">
                        <input onChange={(e) => (inputRef.current = e.target.value)} type="text" placeholder="Search..." className="input input-bordered rounded-xl bg-gray-100 w-full pr-12" />
                        <button className="absolute right-4 top-1/2 -translate-y-1/2" onClick={() => handleUserSearch(inputRef.current)}>
                            <img className="w-8 h-8" src="/icon/search.svg" alt="" width={24} height={24} />
                        </button>
                    </div>
                </div>

                <ul className="mt-4 flex flex-wrap gap-3 pb-12 overflow-auto" style={{ maxHeight: "calc(100% - 100px)" }}>
                    {friends.map((item) => (
                        <FriendItem key={item.id} info={item} />
                    ))}
                </ul>
            </div>
        </main>
    );
};

export default index;
