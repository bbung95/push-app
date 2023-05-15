import { PushRecentProps } from "@/@types/pushType";
import { fetchRecentPushMessage } from "@/api/PushFetchAPI";
import PushItem from "@/components/PushItem";
import { loadingState } from "@/recoil/atoms/loadingState";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";

const locker = () => {
    const { data: session } = useSession();
    const [lockers, setLockers] = useState<PushRecentProps[]>([]);
    const [isLoading, setIsLoading] = useRecoilState(loadingState);

    useEffect(() => {
        (async () => {
            setIsLoading(true);
            const res = await fetchRecentPushMessage(Number(session?.user.id));
            setLockers(res.data.data);
            setIsLoading(false);
        })();
    }, []);

    return (
        <main className="h-full bg-white w-full overflow-hidden">
            <div className="w-11/12 m-auto pt-4 h-full">
                <div className="flex gap-3 items-center">
                    <Link href={"/profile"}>
                        <img src="/icon/arrow-back.svg" alt="" width={28} height={28} />
                    </Link>
                    <h1 className="text-3xl font-bold">보관함</h1>
                </div>

                {!isLoading && (
                    <div className="flex flex-col mt-4 pb-20 gap-2 overflow-auto h-full">
                        {lockers.length > 0 ? (
                            lockers.map((item) => <PushItem key={item.id} info={item} />)
                        ) : (
                            <div className="absolute top-1/2 left-1/2 w-fit -translate-x-1/2 -translate-y-1/2 text-gray-600">보관함이 비어있습니다.</div>
                        )}
                    </div>
                )}
            </div>
        </main>
    );
};

export default locker;
