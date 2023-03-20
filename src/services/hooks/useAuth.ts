import { useAppSelector } from './useTypedSelector';

export function useAuth() {
    const { email, id, watchlist, status, error } = useAppSelector((state) => state.user);

    return {
        isAuth: !!email,
        email,
        id,
        watchlist,
        status,
        error
    };
}
