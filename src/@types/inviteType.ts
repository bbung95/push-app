export interface InvitedItemProps {
    id: number;
    nickname: string;
    profile_img: string;
    target_id: number;
}

export interface InvitedAcceptProps {
    id: number;
    user_id: number;
    target_id: number;
}
