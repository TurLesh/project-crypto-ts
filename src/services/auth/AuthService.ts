import $api from '../../configs/http';
import { AxiosResponse } from 'axios';
import {
    IAuthResponse,
    ICheckResponse,
    IWatchlistItemActionResponse
} from '../../configs/interfaces/AuthResponseInterfaces';

export default class AuthService {
    static async login(email: string, password: string): Promise<AxiosResponse<IAuthResponse>> {
        return $api.post<IAuthResponse>('/auth/login', { email, password });
    }

    static async registration(email: string, password: string): Promise<AxiosResponse<IAuthResponse>> {
        return $api.post<IAuthResponse>('/auth/registration', { email, password });
    }

    static async check(token: string): Promise<AxiosResponse<ICheckResponse>> {
        return $api.post<ICheckResponse>('/auth/check', { token });
    }

    static async addItemToWatchlist(
        userId: number,
        item: string
    ): Promise<AxiosResponse<IWatchlistItemActionResponse>> {
        return $api.post<IWatchlistItemActionResponse>('/watchlist/add-item', { userId, item });
    }

    static async removeItemFromWatchlist(
        userId: number,
        item: string
    ): Promise<AxiosResponse<IWatchlistItemActionResponse>> {
        return $api.post<IWatchlistItemActionResponse>('/watchlist/remove-item', { userId, item });
    }
}
