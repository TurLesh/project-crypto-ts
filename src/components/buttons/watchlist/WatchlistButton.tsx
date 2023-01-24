import { useState } from 'react';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import './WatchlistButtonStyle.css';

const WatchlistButton = () => {
    const [isStarIconFilled, setIsStarIconFilled] = useState(false);

    const starIconOnMouseOver = () => {
        setIsStarIconFilled(true);
    };

    const starIconOnMouseOut = () => {
        setIsStarIconFilled(false);
    };

    const activeStar = isStarIconFilled ? <StarIcon className="watchlist-star-icon" /> : <StarBorderIcon className="watchlist-star-icon" />;

    return (
        <div className="watchlist-btn-wrapper">
            <button className="watchlist-btn" onMouseOver={starIconOnMouseOver} onMouseOut={starIconOnMouseOut}>
                <div className="watchlist-star-icon-container">{activeStar}</div>
                <div className="watchlist-text">Watchlist</div>
            </button>
        </div>
    );
};

export default WatchlistButton;
