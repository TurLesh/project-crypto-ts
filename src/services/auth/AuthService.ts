import $api from '../../configs/http';
import { AxiosResponse } from 'axios';
import { IAuthResponse, ICheckResponse } from '../../configs/interfaces/AuthResponseInterfaces';

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
}