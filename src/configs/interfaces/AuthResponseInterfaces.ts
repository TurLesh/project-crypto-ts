export interface IAuthResponse {
    accessToken: string;
    refreshToken?: string;
    user: IUser;
}

export interface IUser {
    email: string;
    id: string;
}
