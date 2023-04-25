import Navigation from "@/components/Navigation";
import PushItem from "@/components/PushItem";
import Link from "next/link";
import React from "react";

const locker = () => {
    return (
        <main className="h-full bg-white w-full overflow-auto pb-28">
            <div className="w-11/12 m-auto mt-12">
                <div className="flex gap-3 items-center">
                    <Link href={"/profile"}>
                        <img src="/icon/arrow-back.svg" alt="" width={28} height={28} />
                    </Link>
                    <h1 className="text-3xl font-bold">보관함</h1>
                </div>

                <div className="flex flex-col mt-4 gap-2">
                    {Array(11)
                        .fill("")
                        .map((_, idx) => (
                            <PushItem key={idx} />
                        ))}
                </div>
            </div>

            <Navigation />
        </main>
    );
};

export default locker;
