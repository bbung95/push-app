export interface UserAddProps {
    email: string;
    password: string;
}

export interface UserNicknameUpdateProps {
    id: string;
    nickname: string;
}

export interface UserTokenUpdateProps {
    id: string;
    token: string;
}

export interface UserAuthProps {
    id: string;
    email: string;
    nickname?: string;
    profile_img: string;
    state_message?: string;
    first_login: boolean;
    created_date?: Date;
    modified_date?: Date;
    login_date?: Date;
}

export interface UserFormProps {
    email: string;
    password: string;
    passwordCheck?: string;
}

export interface UserSearchProps {
    id: number;
    nickname: string;
    state_message: string;
    profile_img: string;
    isFriend: boolean;
}
export interface UserProfileProps {
    nickname: string;
    state_message?: string;
    profile_img?: string | ArrayBuffer | null;
}

export interface UserUpdateProps extends UserProfileProps {
    id: string;
}

export interface UserSessionProps {
    nickname: string;
    state_message: string;
    profile_img: string;
}
