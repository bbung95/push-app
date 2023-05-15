import { InvitedItemProps } from "@/@types/inviteType";
import { fetchInvitedList } from "@/api/FriendFetchAPI";
import InviteItem from "@/components/InviteItem";
import { loadingState } from "@/recoil/atoms/loadingState";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";

const locker = () => {
    const { data: session } = useSession();
    const [inviteds, setInviteds] = useState<InvitedItemProps[]>([]);
    const [isLoading, setIsLoading] = useRecoilState(loadingState);

    useEffect(() => {
        (async () => {
            setIsLoading(true);
            const res = await fetchInvitedList(Number(session?.user.id));
            setInviteds(res.data.data);
            setIsLoading(false);
        })();
    }, []);

    const handleChangeInvited = (id: number) => {
        setInviteds(inviteds.filter((item: InvitedItemProps) => item.id != id));
    };

    return (
        <main className="h-full bg-white w-full overflow-hidden">
            <div className="w-11/12 m-auto pt-4 h-full">
                <div className="flex gap-3 items-center">
                    <Link href={"/profile"}>
                        <img src="/icon/arrow-back.svg" alt="" width={28} height={28} />
                    </Link>
                    <h1 className="text-3xl font-bold">초대목록</h1>
                </div>

                {!isLoading && (
                    <div className="flex flex-col mt-4 pt-4 pb-20 gap-4 overflow-auto h-full">
                        {inviteds.length > 0 ? (
                            inviteds.map((item) => <InviteItem key={item.id} info={item} handle={handleChangeInvited} />)
                        ) : (
                            <div className="absolute top-1/2 left-1/2 w-fit -translate-x-1/2 -translate-y-1/2 text-gray-600">초대목록이 없습니다.</div>
                        )}
                    </div>
                )}
            </div>
        </main>
    );
};

export default locker;
