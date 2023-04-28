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
                    <h1 className="text-3xl font-bold">초대목록</h1>
                </div>

                <div className="flex flex-col mt-4 gap-2">
                    <div className="mt-4 h-28 p-4 bg-white rounded-3xl drop-shadow-[1px_1px_6px_rgba(128,128,128,0.25)]">
                        <div className="flex gap-3">
                            <img className="w-18 h-18 rounded-xl" src="https://via.placeholder.com/80x80" alt="" />
                            <span className="text-xl flex-1 font-bold text-gray-700">Alice Smith</span>
                            <div className="flex gap-2 items-end">
                                <button className="btn btn-accent p-0 w-12">
                                    <img src="/icon/checkmark.svg" alt="" width={24} height={24} />
                                </button>
                                <button className="btn btn-error p-0 w-12">
                                    <img src="/icon/close.svg" alt="" width={24} height={24} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default locker;
