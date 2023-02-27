import $api from '../../configs/http';
import { AxiosResponse } from 'axios';
import { IUser } from '../../configs/interfaces/AuthResponseInterfaces';

export default class UserService {
    static fetchUsers(): Promise<AxiosResponse<IUser[]>> {
        return $api.get<IUser[]>('/users');
    }
}
