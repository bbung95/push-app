import { UserSearchProps } from "@/@types/userType";
import { fetchFriendInvited } from "@/api/FriendFetchAPI";
import { fetchUserSearch } from "@/api/UserFetchAPI";
import ProfileImage from "@/components/ProfileImage";
import { loadingState } from "@/recoil/atoms/loadingState";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React, { useState } from "react";
import { useSetRecoilState } from "recoil";

const index = () => {
    const [keyword, setKeyword] = useState("");
    const [searchUser, setSearchUser] = useState<UserSearchProps[]>([]);
    const setIsLoading = useSetRecoilState(loadingState);
    const { data: session } = useSession();

    const handleUserSearch = async () => {
        const res = await fetchUserSearch(Number(session?.user.id), keyword);

        if (res.data.data[0]?.id !== session?.user.id) {
            setSearchUser(res.data.data);
        } else {
            setSearchUser([]);
        }
    };

    const handleFriendAdd = async () => {
        setIsLoading(true);
        const res = await fetchFriendInvited({ id: Number(session?.user.id), target_id: searchUser[0].id, nickname: String(session?.user.nickname) });
        if (res.data.status === 201) {
            setSearchUser([{ ...searchUser[0], isFriend: true }]);
        }
        setIsLoading(false);
    };

    return (
        <main className="h-full bg-white w-full overflow-auto pb-28">
            <div className="w-11/12 h-full m-auto pt-4">
                <div className="flex gap-3 items-center">
                    <Link href={"/friend"}>
                        <img src="/icon/arrow-back.svg" alt="" width={28} height={28} />
                    </Link>
                    <h1 className=" text-3xl font-bold">친구 추가</h1>
                </div>

                <div className="mt-4 relative">
                    <input value={keyword} onChange={(e) => setKeyword(e.target.value)} type="text" placeholder="Search..." className="input input-bordered rounded-xl bg-gray-100 w-full pr-12" />
                    <button className="absolute right-4 top-1/2 -translate-y-1/2" onClick={handleUserSearch}>
                        <img className="w-8 h-8" src="/icon/search.svg" alt="" width={24} height={24} />
                    </button>
                </div>

                {searchUser.length > 0 ? (
                    <div className="relative mt-4 h-56 p-4 flex flex-col bg-white rounded-3xl drop-shadow-[1px_1px_6px_rgba(128,128,128,0.25)]">
                        <div className="flex gap-3">
                            <ProfileImage image={searchUser[0].profile_img} size={8} />
                            <div className="flex-1">
                                <span className="text-2xl flex-1 font-bold text-gray-700">{searchUser[0]?.nickname}</span>
                                <p className="mt-4 line-clamp-2">{searchUser[0].state_message}</p>
                            </div>
                        </div>

                        {searchUser[0].isFriend ? (
                            <button className="btn btn-warning absolute w-[calc(100%_-_2rem)] bottom-4 text-md text-white">친구입니다.</button>
                        ) : (
                            <button onClick={handleFriendAdd} className="btn btn-info absolute w-[calc(100%_-_2rem)] bottom-4 text-md text-white">
                                추가
                            </button>
                        )}
                    </div>
                ) : (
                    <div className="absolute top-1/2 left-1/2 w-fit -translate-x-1/2 -translate-y-1/2 text-gray-600">검색결과가 없습니다.</div>
                )}
            </div>
        </main>
    );
};

export default index;
