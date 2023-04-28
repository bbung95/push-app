export interface UserAddProps {
    id: string;
    email: string;
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

export interface UserUpdateProps {
    id: string;
    nickname: string;
    state_message?: string;
}
