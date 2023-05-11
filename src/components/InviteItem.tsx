import { InvitedItemProps } from "@/@types/inviteType";
import { fetchAcceptInvited, fetchRefuseInvited } from "@/api/FriendFetchAPI";
import { useSession } from "next-auth/react";
import React from "react";

const InviteItem = ({ info, handle }: { info: InvitedItemProps; handle: Function }) => {
    const { data: session } = useSession();
    const { id, nickname, profile_img, target_id } = info;

    const handleAcceptInvited = async () => {
        const res = await fetchAcceptInvited({ id: id, user_id: Number(session?.user.id), target_id: target_id });

        if (res.data.status === 201) {
            handle(id);
        } else {
            alert("문제가 발생했습니다.");
        }
    };

    const handleRefuseInvited = async () => {
        const res = await fetchRefuseInvited(id);

        if (res.data.status === 201) {
            handle(id);
        } else {
            alert("문제가 발생했습니다.");
        }
    };

    return (
        <div className="mt-4 h-28 p-4 bg-white rounded-3xl drop-shadow-[1px_1px_6px_rgba(128,128,128,0.25)]">
            <div className="flex gap-3">
                <div className="w-18 h-18 overflow-hidden flex justify-center">
                    <img className="w-auto h-auto rounded-xl" src={profile_img ?? "https://via.placeholder.com/80x80"} alt="" />
                </div>
                <span className="text-xl flex-1 font-bold text-gray-700">{nickname}</span>
                <div className="flex gap-2 items-end">
                    <button className="btn btn-accent p-0 w-12" onClick={handleAcceptInvited}>
                        <img src="/icon/checkmark.svg" alt="" width={24} height={24} />
                    </button>
                    <button className="btn btn-error p-0 w-12" onClick={handleRefuseInvited}>
                        <img src="/icon/close.svg" alt="" width={24} height={24} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default InviteItem;
