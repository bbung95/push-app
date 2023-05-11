import { InvitedItemProps } from "@/@types/inviteType";
import { fetchInvitedList } from "@/api/FriendFetchAPI";
import InviteItem from "@/components/InviteItem";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const locker = () => {
    const { data: session } = useSession();
    const [inviteds, setInviteds] = useState<InvitedItemProps[]>([]);

    useEffect(() => {
        (async () => {
            const res = await fetchInvitedList(Number(session?.user.id));

            setInviteds(res.data.data);
        })();
    }, []);

    const handleChangeInvited = (id: number) => {
        setInviteds(inviteds.filter((item: InvitedItemProps) => item.id != id));
    };

    return (
        <main className="h-full bg-white w-full overflow-auto pb-28">
            <div className="w-11/12 m-auto pt-4">
                <div className="flex gap-3 items-center">
                    <Link href={"/profile"}>
                        <img src="/icon/arrow-back.svg" alt="" width={28} height={28} />
                    </Link>
                    <h1 className="text-3xl font-bold">초대목록</h1>
                </div>

                <div className="flex flex-col mt-4 gap-2">
                    {inviteds.map((item) => {
                        return <InviteItem key={item.id} info={item} handle={handleChangeInvited} />;
                    })}
                    {inviteds.length === 0 && <div className="absolute top-1/2 left-1/2 w-fit -translate-x-1/2 -translate-y-1/2 text-gray-600">초대목록이 없습니다.</div>}
                </div>
            </div>
        </main>
    );
};

export default locker;
