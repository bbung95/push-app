import Navigation from "@/components/Navigation";
import PushMessage from "@/components/PushMessage";
import Link from "next/link";
import React, { ChangeEvent, useState } from "react";

interface PushProp {
    title?: string;
    body?: string;
}

const Push = () => {
    const [push, setPush] = useState<PushProp>({});

    const handleOnChangeText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value;

        if (value.length > 40) {
            alert("40글자 이상 작성할 수 없습니다.");
        } else {
            setPush({ ...push, body: value });
        }
    };

    return (
        <main className="h-full bg-white w-full overflow-auto pb-28">
            <div className="w-11/12 m-auto mt-12">
                <div className="flex gap-3 items-center">
                    <Link href={"/friend/1"}>
                        <img src="/icon/arrow-back.svg" alt="" width={28} height={28} />
                    </Link>
                    <h1 className=" text-3xl font-bold">푸쉬 작성</h1>
                </div>

                <div className="mt-4 h-28 p-4 bg-white rounded-3xl drop-shadow-[1px_1px_6px_rgba(128,128,128,0.25)]">
                    <div className="flex gap-3">
                        <img className="w-18 h-18 rounded-xl" src="https://via.placeholder.com/80x80" alt="" />
                        <span className="text-xl flex-1 font-bold text-gray-700">Alice Smith</span>
                    </div>
                </div>

                <div className="mt-4 relative">
                    <input type="text" placeholder="Title" className="input input-bordered w-full bg-gray-100" value={push.title || ""} onChange={(e) => setPush({ ...push, title: e.target.value })} />

                    <textarea placeholder="Body" className="mt-2 text-gray-700 textarea textarea-bordered textarea-lg w-full bg-gray-100" onChange={handleOnChangeText} value={push.body}></textarea>
                    <div className="absolute bottom-4 right-4 text-gray-500">
                        <span>{push.body?.length ?? 0}</span>/40
                    </div>
                </div>

                <div className="mt-4 flex gap-2">
                    <button className="text-white btn btn-info w-1/2">보내기</button>

                    <Link href={"/friend/1"} className="text-white btn btn-error w-1/2">
                        취소
                    </Link>
                </div>
            </div>
        </main>
    );
};

export default Push;
