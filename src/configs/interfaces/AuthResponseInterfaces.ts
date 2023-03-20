export interface IWatchlistItemActionResponse {
    userId: number;
    items: string[];
}

export interface IWatchlistItemActionData {
    userId: number;
    item: string;
}

export interface ICheckResponse {
    user: {
        id: number;
        email: string;
        banned: boolean;
        banReason: null | string;
    };
    watchlist: string[];
}

export interface IAuthResponse {
    token: string;
    user: IUser;
    watchlist: string[];
}

export interface IUser {
    email: string;
    id: number;
}
