import { useAppSelector } from './useTypedSelector';
import { RootState } from '../store';

interface IUser {
    email: string;
    token: string;
    id: string;
}

export function useAuth() {
    const userObject = useAppSelector((state: RootState) => state.user);
    const user: IUser = userObject.user;

    const email = user.email;
    const token = user.token;
    const id = user.id;

    return {
        isAuth: !!email,
        email,
        token,
        id
    };
}
