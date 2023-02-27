import AuthService from './AuthService';
import { useAppDispatch } from '../hooks/useTypedSelector';
import { setUser, removeUser } from '../store/slices/userSlice';

const AuthActions = (action: string, email?: string, password?: string) => {
    const dispatch = useAppDispatch();

    const login = async (email: string, password: string) => {
        try {
            const response = await AuthService.login(email, password);
            console.log(response);
            localStorage.setItem('token', response.data.accessToken);
            dispatch(
                setUser({
                    email: response.data.user.email,
                    token: response.data.accessToken,
                    id: response.data.user.id
                })
            );
        } catch (error: any) {
            console.log(error.response.data.message);
        }
    };

    const registration = async (email: string, password: string) => {
        try {
            const response = await AuthService.registration(email, password);
            console.log(response);
            localStorage.setItem('token', response.data.accessToken);
            dispatch(
                setUser({
                    email: response.data.user.email,
                    token: response.data.accessToken,
                    id: response.data.user.id
                })
            );
        } catch (error: any) {
            console.log(error.response.data.message);
        }
    };

    const logout = async () => {
        try {
            const response = await AuthService.logout();
            console.log(response);
            localStorage.removeItem('token');
            dispatch(removeUser());
        } catch (error: any) {
            console.log(error.response.data.message);
        }
    };

    switch (action) {
        case 'login':
            if (email && password) {
                return login(email, password);
            } else {
                return null;
            }
        case 'signup':
            if (email && password) {
                return registration(email, password);
            } else {
                return null;
            }
        case 'logout':
            return logout();
        default:
            return null;
    }
};

export default AuthActions;
