export interface InvitedItemProps {
    id: number;
    nickname: string;
    profile_img: string;
    user_id: number;
}

export interface InvitedAcceptProps {
    id: number;
    user_id: number;
    target_id: number;
    nickname: string;
}
