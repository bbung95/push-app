import { FriendDetailProps } from "@/@types/friendType";
import { fetchGetFriend } from "@/api/FriendFetchAPI";
import { fetchPushMessage } from "@/api/PushFetchAPI";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

interface PushProp {
    title: string;
    message: string;
}

const initialize = { title: "", message: "" };

const Push = () => {
    const router = useRouter();
    const { id } = router.query;
    const { data: session } = useSession();
    const [friend, setFriend] = useState<FriendDetailProps>();
    const [push, setPush] = useState<PushProp>(initialize);

    const handleOnChangeText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value;

        if (value.length > 40) {
            alert("40글자 이상 작성할 수 없습니다.");
        } else {
            setPush({ ...push, message: value });
        }
    };

    const handleSendPushMessage = async () => {
        if (push.title.length < 5) {
            alert("타이틀을 5글자 이상 입력해주세요.");
            return;
        }

        if (push.message.length < 5) {
            alert("메시지를 5글자 이상 입력해주세요.");
            return;
        }

        const res = await fetchPushMessage({ ...push, sender_id: Number(session?.user.id), receiver_id: Number(friend?.user_id) });

        if (res.data.status === 201) {
            alert("푸쉬메시지를 보냈습니다.");
            setPush(initialize);
        }
    };

    useEffect(() => {
        (async () => {
            const res = await fetchGetFriend(Number(id));
            if (res.data.status === 200) {
                setFriend(res.data.data);
            }
        })();
    }, []);

    return (
        <main className="h-full bg-white w-full overflow-auto pb-28">
            <div className="w-11/12 m-auto pt-4">
                <div className="flex gap-3 items-center">
                    <Link href={`/friend/${id}`}>
                        <img src="/icon/arrow-back.svg" alt="" width={28} height={28} />
                    </Link>
                    <h1 className=" text-3xl font-bold">푸쉬 작성</h1>
                </div>
                {friend && (
                    <>
                        <div className="mt-4 h-28 p-4 bg-white rounded-3xl drop-shadow-[1px_1px_6px_rgba(128,128,128,0.25)]">
                            <div className="flex gap-3">
                                <div className="w-18 h-18 overflow-hidden flex justify-center">
                                    <img className="w-auto h-auto rounded-xl" src={friend.profile_img || "https://via.placeholder.com/80x80"} alt="" />
                                </div>

                                <span className="text-xl flex-1 font-bold text-gray-700">{friend?.nickname}</span>
                            </div>
                        </div>

                        <div className="mt-4 relative">
                            <input
                                type="text"
                                placeholder="title"
                                className="input input-bordered w-full bg-gray-100"
                                value={push.title || ""}
                                onChange={(e) => setPush({ ...push, title: e.target.value })}
                            />

                            <textarea
                                placeholder="message"
                                className="mt-2 text-gray-700 textarea textarea-bordered textarea-lg w-full bg-gray-100"
                                onChange={handleOnChangeText}
                                value={push.message}
                            ></textarea>
                            <div className="absolute bottom-4 right-4 text-gray-500">
                                <span>{push.message?.length ?? 0}</span>/40
                            </div>
                        </div>

                        <div className="mt-4 flex gap-2">
                            <button className="text-white btn btn-info w-1/2" onClick={handleSendPushMessage}>
                                보내기
                            </button>

                            <Link href={`/friend/${id}`} className="text-white btn btn-error w-1/2">
                                취소
                            </Link>
                        </div>
                    </>
                )}
            </div>
        </main>
    );
};

export default Push;
