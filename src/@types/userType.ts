export interface UserAddProps {
    id: string;
    email: string;
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
