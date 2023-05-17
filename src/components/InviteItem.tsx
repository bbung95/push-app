import { InvitedItemProps } from "@/@types/inviteType";
import { fetchAcceptInvited, fetchRefuseInvited } from "@/api/FriendFetchAPI";
import { useSession } from "next-auth/react";
import React from "react";
import ProfileImage from "./ProfileImage";

const InviteItem = ({ info, handle }: { info: InvitedItemProps; handle: Function }) => {
    const { data: session } = useSession();
    const { id, nickname, profile_img, user_id } = info;

    const handleAcceptInvited = async () => {
        const res = await fetchAcceptInvited({ id: id, user_id: Number(session?.user.id), target_id: user_id, nickname: String(session?.user.nickname) });

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
        <div className="mr-4 ml-4 h-28 p-4 bg-white rounded-3xl drop-shadow-[1px_1px_6px_rgba(128,128,128,0.25)]">
            <div className="flex gap-3">
                <ProfileImage image={profile_img} size={5} />
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
