import { FriendDetailProps } from "@/@types/friendType";
import { fetchGetFriend } from "@/api/FriendFetchAPI";
import { fetchFriendPushMessage } from "@/api/PushFetchAPI";
import PushMessage from "@/components/PushMessage";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const index = () => {
    const router = useRouter();
    const { data: session } = useSession();
    const { id } = router.query;
    const [friend, setFriend] = useState<FriendDetailProps>();

    useEffect(() => {
        (async () => {
            const res = await fetchGetFriend(Number(id));
            if (res.data.status === 200) {
                setFriend(res.data.data);

                const resd = await fetchFriendPushMessage(Number(session?.user.id), res.data.data.user_id);
                console.log(resd.data.data);
            }
        })();
    }, []);

    return (
        <main className="h-full bg-white w-full overflow-auto pb-28">
            <div className="w-11/12 m-auto pt-4">
                <div className="flex gap-3 items-center">
                    <Link href={"/friend"}>
                        <img src="/icon/arrow-back.svg" alt="" width={28} height={28} />
                    </Link>
                    <h1 className=" text-3xl font-bold">친구</h1>
                </div>

                {friend && (
                    <>
                        <div className="mt-4 h-36 p-4 bg-white rounded-3xl drop-shadow-[1px_1px_6px_rgba(128,128,128,0.25)]">
                            <div className="flex gap-3">
                                <img className="w-28 h-28 rounded-xl" src="https://via.placeholder.com/80x80" alt="" />
                                <div className="flex-1">
                                    <span className="text-2xl flex-1 font-bold text-gray-700">{friend?.nickname}</span>
                                    <p className="mt-4 line-clamp-2">{friend?.state_message}</p>
                                </div>
                                <span>
                                    {friend.like ? (
                                        <img className="w-10 cursor-pointer" src="/icon/star-fill.svg" alt="" width={24} height={24} />
                                    ) : (
                                        <img className="w-10 cursor-pointer" src="/icon/star-empty.svg" alt="" width={24} height={24} />
                                    )}
                                </span>
                            </div>
                        </div>

                        <div className="mt-4 flex gap-2">
                            <Link href={`/push/${id}`} className="btn btn-info flex-1">
                                <img src="/icon/message.svg" alt="" width={28} height={28} />
                            </Link>

                            <button className="btn btn-error w-24">
                                <img src="/icon/trash.svg" alt="" width={28} height={28} />
                            </button>
                        </div>

                        <div className="mt-4">
                            {Array(7)
                                .fill("")
                                .map((_, idx) => (
                                    <PushMessage key={idx} id={idx} />
                                ))}
                        </div>
                    </>
                )}
            </div>
        </main>
    );
};

export default index;
