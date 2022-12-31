import React from 'react';
import './CryptocurrencyListInfoStyle.css';

const CryptocurrencyListInfo = () => {
    return (
        <div className="list-info-wrapper">
            <div className="favourites-space"></div>
            <div className="numeration-info">#</div>
            <div className="name-info">Name</div>
            <div className="price-info">Price</div>
            <div className="change-percentage-info">
                <div className="1h-info change-time-info">1h%</div>
                <div className="24h-info change-time-info">24h%</div>
                <div className="7d-info change-time-info">7d%</div>
                <div className="30d-info change-time-info">30d%</div>
            </div>
            <div className="market-info-wrapper">
                <div className="market-cap-info market-info-item">Market Cap</div>
                <div className="volume-24h-info market-info-item">Volume(24h)</div>
            </div>
            <div className="chart-info">Last 7 Days</div>
            {/* <div className="show-more-space"></div> */}
        </div>
    );
};

export default CryptocurrencyListInfo;
