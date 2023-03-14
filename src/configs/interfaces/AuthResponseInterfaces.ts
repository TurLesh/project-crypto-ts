export interface IAuthResponse {
    token: string;
    user: IUser;
}

export interface IUser {
    email: string;
    id: string;
}
