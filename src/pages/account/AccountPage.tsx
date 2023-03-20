import { useAuth } from '../../services/hooks/useAuth';

const AccountPage = () => {
    const { isAuth, email, id, watchlist } = useAuth();

    const watchlistMap = watchlist.map((element) => {
        return <div>{element}</div>;
    });

    return (
        <div className="account-page-wrapper">
            {isAuth ? (
                <div className="account-info-wrapper">
                    <div>UID: {id}</div>
                    <div>Email: {email}</div>
                    <div>Watchlist: {watchlistMap}</div>
                </div>
            ) : (
                <div>You have to log in to access Account page</div>
            )}
        </div>
    );
};

export default AccountPage;
