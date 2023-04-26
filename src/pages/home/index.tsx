import Navigation from "@/components/Navigation";
import PushItem from "@/components/PushItem";
import React from "react";

const index = () => {
    return (
        <main className="h-full bg-white w-full overflow-auto pb-28">
            <div className="bg-main-color h-96 relative rounded-b-3xl">
                <img className="absolute bottom-10 left-1/2 -translate-x-1/2" src="/image/main.png" alt="" width={300} height={150} />
            </div>

            <div className="w-11/12 m-auto mt-6">
                <h1 className=" text-2xl font-bold">최근 푸쉬 알림</h1>
                <ul className="mt-4">
                    {Array(6)
                        .fill("")
                        .map((_, idx) => (
                            <PushItem key={idx} />
                        ))}
                </ul>
            </div>
        </main>
    );
};

export default index;
