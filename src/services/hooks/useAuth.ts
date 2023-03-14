import { useAppSelector } from './useTypedSelector';

export function useAuth() {
    const { email, id, status, error } = useAppSelector((state) => state.user);

    return {
        isAuth: !!email,
        email,
        id,
        status,
        error
    };
}
