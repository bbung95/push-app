import { PushRecentProps } from "@/@types/pushType";
import { fetchRecentPushMessage } from "@/api/PushFetchAPI";
import PushItem from "@/components/PushItem";
import { loadingState } from "@/recoil/atoms/loadingState";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useSetRecoilState } from "recoil";

const index = () => {
    const { data: session } = useSession();
    const [recentPushs, setRecentPushs] = useState<PushRecentProps[]>([]);
    const setIsLoading = useSetRecoilState(loadingState);

    const { data, isLoading } = useQuery(["recentMessages", session?.user.id], () => fetchRecentPushMessage(Number(session?.user.id)), {
        cacheTime: 1000 * 60 * 5,
        staleTime: 1000 * 10 * 1,
    });

    useEffect(() => {
        if (!isLoading) setRecentPushs(data?.data.data);
        setIsLoading(isLoading);
    }, [isLoading]);

    return (
        <main className="h-full bg-white w-full overflow-auto pb-28">
            <div className="bg-main-color h-96 relative rounded-b-3xl">
                <img className="absolute bottom-10 left-1/2 -translate-x-1/2" src="/image/white-logo.png" alt="" width={300} height={150} />
            </div>

            <div className="w-11/12 m-auto mt-6">
                <h1 className=" text-2xl font-bold">최근 푸쉬 알림</h1>
                <ul className="mt-4">
                    {recentPushs.map((item) => (
                        <PushItem key={item.id} info={item} />
                    ))}
                </ul>
            </div>
        </main>
    );
};

export default index;
