import { useAppSelector } from './useTypedSelector';

export function useAuth() {
    const { email, token, id, status, error } = useAppSelector((state) => state.user);

    return {
        isAuth: !!email,
        email,
        token,
        id,
        status,
        error
    };
}
