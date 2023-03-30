import { FC, useState, useEffect, useRef } from 'react';
import { useAuth } from '../../../services/hooks/useAuth';
import { useTranslation } from 'react-i18next';
import { CSSTransition } from 'react-transition-group';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import './WatchlistButtonStyle.css';

const WatchlistButton: FC = () => {
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
            console.log('WATCHLIST SHOW TRIGGER HERE');
        } else {
            setShowAlert(true);
        }
    };

    const starIconOnMouseOver = () => {
        setIsStarIconFilled(true);
    };

    const starIconOnMouseOut = () => {
        setIsStarIconFilled(false);
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
