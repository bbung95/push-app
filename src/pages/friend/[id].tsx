import { FriendDetailProps } from "@/@types/friendType";
import { FriendMessageProps } from "@/@types/pushType";
import { fetchChangeLike, fetchFriendRemove, fetchGetFriend } from "@/api/FriendFetchAPI";
import { fetchFriendPushMessage } from "@/api/PushFetchAPI";
import ProfileImage from "@/components/ProfileImage";
import PushMessage from "@/components/PushMessage";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const index = () => {
    const router = useRouter();
    const { data: session } = useSession();
    const { id } = router.query;
    const [friend, setFriend] = useState<FriendDetailProps>({
        id: 0,
        like: false,
        state_message: "",
        nickname: "",
        profile_img: "",
        user_id: 0,
    });
    const [pushMessages, setPushMessages] = useState<FriendMessageProps[]>([]);

    const handleChangeLike = async (e: React.MouseEvent) => {
        e.stopPropagation();

        const res = await fetchChangeLike(friend.id, friend.like);

        if (res.data.status === 201) {
            setFriend({ ...friend, like: !friend.like });
        }
    };

    const handleRemoveFriend = async () => {
        if (!confirm("친구를 삭제합니다")) {
            return;
        }

        const res = await fetchFriendRemove(friend.id);

        if (res.data.status === 201) {
            alert("친구가 삭제되었습니다.");
            router.push("/friend");
        }
    };

    useEffect(() => {
        (async () => {
            const res = await fetchGetFriend(Number(id));
            if (res.data.status === 200) {
                setFriend(res.data.data);

                const resd = await fetchFriendPushMessage(Number(session?.user.id), res.data.data.user_id);
                if (resd.data.status === 200) {
                    setPushMessages(resd.data.data);
                }
            }
        })();
    }, []);

    return (
        <main className="h-full bg-white w-full overflow-hidden">
            <div className="w-11/12 m-auto pt-4 h-full">
                <div className="flex gap-3 items-center">
                    <Link href={"/friend"}>
                        <img src="/icon/arrow-back.svg" alt="" width={28} height={28} />
                    </Link>
                    <h1 className="text-3xl font-bold">친구</h1>
                </div>

                {friend.id !== 0 && (
                    <>
                        <div className="mt-4 h-36 p-4 bg-white rounded-3xl drop-shadow-[1px_1px_6px_rgba(128,128,128,0.25)]">
                            <div className="flex gap-3">
                                <ProfileImage image={friend.profile_img} size={7} />
                                <div className="flex-1">
                                    <span className="text-2xl flex-1 font-bold text-gray-700">{friend?.nickname}</span>
                                    <p className="mt-4 line-clamp-2">{friend?.state_message}</p>
                                </div>
                                <span onClick={handleChangeLike}>
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

                            <button className="btn btn-error w-24" onClick={handleRemoveFriend}>
                                <img src="/icon/trash.svg" alt="" width={28} height={28} />
                            </button>
                        </div>

                        <div className="mt-4 overflow-auto h-full pb-80">
                            {pushMessages.map((item) => (
                                <PushMessage key={item.id} info={item} />
                            ))}
                        </div>
                    </>
                )}
            </div>
        </main>
    );
};

export default index;
