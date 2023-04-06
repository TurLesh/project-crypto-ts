import { FC, useState, useEffect, useRef } from 'react';
import { useAuth } from '../../../services/hooks/useAuth';
import { useTranslation } from 'react-i18next';
import { CSSTransition } from 'react-transition-group';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import './WatchlistButtonStyle.css';

interface IWatchlistBtn {
    triggerShowWatchlist: () => void;
    isShowWatchlist: boolean;
}

const WatchlistButton: FC<IWatchlistBtn> = (props) => {
    const { triggerShowWatchlist, isShowWatchlist } = props;
    const { isAuth } = useAuth();
    const { t } = useTranslation();

    const [isStarIconFilled, setIsStarIconFilled] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const nodeRef = useRef(null);

    useEffect(() => {
        if (showAlert) {
            const timer = setTimeout(() => {
                setShowAlert(false);
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [showAlert]);

    const watchlistBtnClickHandler = () => {
        if (isAuth) {
            triggerShowWatchlist();
        } else {
            setShowAlert(true);
        }
    };

    const starIconOnMouseOver = () => {
        if (isShowWatchlist) {
            setIsStarIconFilled(false);
        } else {
            setIsStarIconFilled(true);
        }
    };

    const starIconOnMouseOut = () => {
        if (isShowWatchlist) {
            setIsStarIconFilled(true);
        } else {
            setIsStarIconFilled(false);
        }
    };

    const activeStar = isStarIconFilled ? (
        <StarIcon className="watchlist-star-icon" />
    ) : (
        <StarBorderIcon className="watchlist-star-icon" />
    );

    return (
        <div className="watchlist-btn-wrapper">
            <button
                className="watchlist-btn"
                onMouseOver={starIconOnMouseOver}
                onMouseOut={starIconOnMouseOut}
                onClick={watchlistBtnClickHandler}
            >
                <div className="watchlist-star-icon-container">{activeStar}</div>
                <div className="watchlist-text">{t('cryptocurrency-filters-panel.watchlist.watchlist-btn')}</div>
            </button>
            <CSSTransition nodeRef={nodeRef} in={showAlert} timeout={200} classNames="display" unmountOnExit>
                <div ref={nodeRef} className="error-info-panel">
                    <div className="error-info-panel-triangle" />
                    <div className="error-info-panel-container">
                        {t('cryptocurrency-filters-panel.watchlist.watchlist-error')}
                    </div>
                </div>
            </CSSTransition>
        </div>
    );
};

export default WatchlistButton;
