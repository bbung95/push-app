import FriendItem from "@/components/FriendItem";
import Navigation from "@/components/Navigation";
import React from "react";

const index = () => {
    return (
        <main className="h-full bg-white w-full overflow-auto pb-28">
            <div className="w-11/12 m-auto mt-12">
                <h1 className=" text-3xl font-bold">친구 목록</h1>
                <div className="mt-4 relative">
                    <input type="text" placeholder="Search..." className="input input-bordered rounded-xl bg-gray-100 w-full pr-12" />
                    <button className="absolute right-4 top-1/2 -translate-y-1/2">
                        <img className="w-8 h-8" src="icon/search.svg" alt="" width={24} height={24} />
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
        </main>
    );
};

export default index;
