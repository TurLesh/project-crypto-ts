import StarIcon from '@mui/icons-material/Star';
import './WatchlistButtonStyle.css';

const WatchlistButton = () => {
    return (
        <div className="watchlist-btn-wrapper">
            <button className="watchlist-btn">
                <div className="watchlist-star-icon-container">
                    <StarIcon className="watchlist-star-icon" />
                </div>
                <div className="watchlist-text">Watchlist</div>
            </button>
        </div>
    );
};

export default WatchlistButton;
