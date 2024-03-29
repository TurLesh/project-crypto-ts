import $api from '../../configs/http';
import { AxiosResponse } from 'axios';
import { IAuthResponse } from '../../configs/interfaces/AuthResponseInterfaces';

export default class AuthService {
    static async login(email: string, password: string): Promise<AxiosResponse<IAuthResponse>> {
        return $api.post<IAuthResponse>('/login', { email, password });
    }

    static async registration(email: string, password: string): Promise<AxiosResponse<IAuthResponse>> {
        return $api.post<IAuthResponse>('/registration', { email, password });
    }

    static async logout(): Promise<void> {
        return $api.post('/logout');
    }
}
