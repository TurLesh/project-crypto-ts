import React, { useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import { useTranslation } from 'react-i18next';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import './CryptocurrencyListInfoStyle.css';

const CryptocurrencyListInfo = () => {
    const [isHoveringFavouritesInfoIcon, setIsHoveringFavouritesInfoIcon] = useState(false);
    const [isHoveringMarketCapInfoIcon, setIsHoveringMarketCapInfoIcon] = useState(false);
    const [isHoveringVolume24hInfoIcon, setIsHoveringVolume24hInfoIcon] = useState(false);

    const { i18n, t } = useTranslation();

    const lang = i18n.language;

    //favourites info icon handlers
    const favouritesInfoIconOnMouseOverHandler = () => {
        setIsHoveringFavouritesInfoIcon(true);
    };

    const favouritesInfoIconOnMouseOutHandler = () => {
        setIsHoveringFavouritesInfoIcon(false);
    };

    //market cap info icon handlers
    const marketCapInfoIconOnMouseOverHandler = () => {
        setIsHoveringMarketCapInfoIcon(true);
    };

    const marketCapInfoIconOnMouseOutHandler = () => {
        setIsHoveringMarketCapInfoIcon(false);
    };

    //volume 24h info icon handlers
    const volume24hInfoIconOnMouseOverHandler = () => {
        setIsHoveringVolume24hInfoIcon(true);
    };

    const volume24hInfoIconOnMouseOutHandler = () => {
        setIsHoveringVolume24hInfoIcon(false);
    };

    const favouritesHelpPanelClassName = `favourites-help-panel favourites-help-panel-${lang}`;
    const marketCapHelpPanelClassName = `market-cap-help-panel market-cap-help-panel-${lang}`;
    const volume24hHelpPanelClassName = `volume-24h-help-panel volume-24h-help-panel-${lang}`;

    return (
        <div className="list-info-wrapper">
            <div className="favourites-space">
                <InfoOutlinedIcon className="info-help-icon" onMouseOver={favouritesInfoIconOnMouseOverHandler} onMouseOut={favouritesInfoIconOnMouseOutHandler} />
            </div>
            <CSSTransition in={isHoveringFavouritesInfoIcon} timeout={200} classNames="display" unmountOnExit>
                <div className={favouritesHelpPanelClassName}>
                    <div className="favourites-help-panel-triangle" />
                    <div className="favourites-help-panel-container">
                        <div className="favourites-help-panel-text">{t('cryptocurrency-info-panel.favourites-help-panel.favourites-help-panel-text-1')}</div>
                        <div className="favourites-help-panel-text">{t('cryptocurrency-info-panel.favourites-help-panel.favourites-help-panel-text-2')}</div>
                    </div>
                </div>
            </CSSTransition>
            <div className="numeration-info">#</div>
            <div className="name-info">{t('cryptocurrency-info-panel.name-info')}</div>
            <div className="price-info">{t('cryptocurrency-info-panel.price-info')}</div>
            <div className="change-percentage-info">
                <div className="1h-info change-time-info">{t('cryptocurrency-info-panel.change-percentage-info.1h-info')}</div>
                <div className="24h-info change-time-info">{t('cryptocurrency-info-panel.change-percentage-info.24h-info')}</div>
                <div className="7d-info change-time-info">{t('cryptocurrency-info-panel.change-percentage-info.7d-info')}</div>
                <div className="30d-info change-time-info">{t('cryptocurrency-info-panel.change-percentage-info.30d-info')}</div>
            </div>
            <div className="market-info-wrapper">
                <div className="market-cap-info market-info-item">
                    {t('cryptocurrency-info-panel.market-info.market-cap-info')}
                    <InfoOutlinedIcon className="info-help-icon" onMouseOver={marketCapInfoIconOnMouseOverHandler} onMouseOut={marketCapInfoIconOnMouseOutHandler} />
                    <CSSTransition in={isHoveringMarketCapInfoIcon} timeout={200} classNames="display" unmountOnExit>
                        <div className={marketCapHelpPanelClassName}>
                            <div className="market-cap-help-panel-triangle" />
                            <div className="market-cap-help-panel-container">
                                <div className="market-cap-help-panel-text">{t('cryptocurrency-info-panel.market-info.market-cap-help-panel.market-cap-help-panel-1')}</div>
                                <div className="market-cap-help-panel-text">{t('cryptocurrency-info-panel.market-info.market-cap-help-panel.market-cap-help-panel-2')}</div>
                            </div>
                        </div>
                    </CSSTransition>
                </div>
                <div className="volume-24h-info market-info-item">
                    {t('cryptocurrency-info-panel.market-info.volume-24h-info')}
                    <InfoOutlinedIcon className="info-help-icon" onMouseOver={volume24hInfoIconOnMouseOverHandler} onMouseOut={volume24hInfoIconOnMouseOutHandler} />
                    <CSSTransition in={isHoveringVolume24hInfoIcon} timeout={200} classNames="display" unmountOnExit>
                        <div className={volume24hHelpPanelClassName}>
                            <div className="volume-24h-help-panel-triangle" />
                            <div className="volume-24h-help-panel-container">
                                <div className="volume-24h-help-panel-text">{t('cryptocurrency-info-panel.market-info.volume-24h-help-panel.volume-24h-help-panel-1')}</div>
                            </div>
                        </div>
                    </CSSTransition>
                </div>
            </div>
            <div className="chart-info">{t('cryptocurrency-info-panel.chart-info')}</div>
            {/* <div className="show-more-space"></div> */}
        </div>
    );
};

export default CryptocurrencyListInfo;
