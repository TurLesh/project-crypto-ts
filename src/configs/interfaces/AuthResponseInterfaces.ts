export interface ICheckResponse {
    id: number;
    email: string;
    banned: boolean;
    banReason: null | string;
}

export interface IAuthResponse {
    token: string;
    user: IUser;
}

export interface IUser {
    email: string;
    id: number;
}
