import { useRouter } from "next/router";
import React from "react";

const FriendItem = () => {
    const router = useRouter();

    const handleMoveDetail = () => {
        router.push("/friend/1");
    };

    return (
        <li className="p-3 h-28 w-wrap1/2 flex flex-col justify-between cursor-pointer rounded-xl bg-white drop-shadow-[1px_1px_6px_rgba(0,0,0,0.1)]" onClick={handleMoveDetail} role="button">
            <div className="flex justify-between">
                <span className="text-lg font-bold text-gray-700">Alice Smith</span>
                <span>
                    <img src="/icon/star-fill.svg" alt="" width={24} height={24} />
                </span>
            </div>
            <p className="text-sm text-gray-400 truncate">나는야 뻥뻥이</p>
        </li>
    );
};

export default FriendItem;
