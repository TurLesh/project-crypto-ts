import { useAuth } from '../../services/hooks/useAuth';

const WatchlistPage = () => {
    const { isAuth, watchlist } = useAuth();

    const showWatchlist = () => {
        if (watchlist.length !== 0) {
            return watchlistMap;
        } else {
            return <div>No items in your watchlist. You can add some at Cryptocurrency page</div>;
        }
    };

    const watchlistMap = watchlist.map((element) => {
        return <div>{element}</div>;
    });

    return (
        <div>
            {isAuth ? (
                <div className="watchlist-info-wrapper">{showWatchlist()}</div>
            ) : (
                <div>You have to log in to access Watchlist page</div>
            )}
        </div>
    );
};

export default WatchlistPage;
