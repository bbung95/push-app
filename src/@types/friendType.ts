export interface FriendAddProps {
    id: number;
    target_id: number;
}

export interface FriendItemProps {
    id: number;
    user_id: number;
    nickname: string;
    state_message: string;
    like: boolean;
}

export interface FriendDetailProps extends FriendItemProps {
    profile_img: string;
}
