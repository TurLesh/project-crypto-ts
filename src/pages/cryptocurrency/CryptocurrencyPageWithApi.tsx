import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import CryptocurrencySliderCard from '../../components/cards/cryptocurrency-slider-card/CryptocurrencySliderCard';
import GetBitcoinData from '../../services/requests/GetBitcoinSliderData';
import GetEthereumData from '../../services/requests/GetEthereumData';
import GetBnbData from '../../services/requests/GetBnbData';
import GetCardanoData from '../../services/requests/GetCardanoData';
import GetPolkadotData from '../../services/requests/GetPolkadotData';
import Slider from 'react-slick';
import { sliderSettings } from '../../configs/sliderConfigs';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './CryptocurrencyPageStyle.css';

type SliderDataType = {
    id: string;
    symbol: string;
    name: string;
    current_value: CurrentValueType;
    price_change_percentage_24h: PriceChangePercentage24hType;
    price_change_percentage_7d: PriceChangePercentage7dType;
    price_change_percentage_30d: PriceChangePercentage30dType;
    price_history_hourly_24h_usd: number[];
};

type CurrentValueType = {
    usd: number;
    eur: number;
};

type PriceChangePercentage24hType = {
    percentage: number;
    up: boolean;
};

type PriceChangePercentage7dType = {
    percentage: number;
    up: boolean;
};

type PriceChangePercentage30dType = {
    percentage: number;
    up: boolean;
};

const CryptocurrencyPageWithApi: FC = () => {
    const { t } = useTranslation();

    const [sliderCoinsData, setSliderCoinsData] = useState<SliderDataType[]>([]);

    const bitcoinData = GetBitcoinData();
    const ethereumData = GetEthereumData();
    const bnbData = GetBnbData();
    const cardanoData = GetCardanoData();
    const polkaData = GetPolkadotData();

    if (bitcoinData && ethereumData && bnbData && cardanoData && polkaData) {
        setSliderCoinsData([bitcoinData, ethereumData, bnbData, cardanoData, polkaData]);
    }

    const sliderMapFunc = sliderCoinsData.map((item) => {
        return (
            //refactoring
            <CryptocurrencySliderCard
                key={item.id}
                symbol={item.symbol}
                value={item.current_value.usd}
                oneday={item.price_change_percentage_24h.percentage}
                oneweek={item.price_change_percentage_7d.percentage}
                onemonth={item.price_change_percentage_30d.percentage}
                up24h={item.price_change_percentage_24h.up}
                up7d={item.price_change_percentage_7d.up}
                up30d={item.price_change_percentage_30d.up}
                name={item.name}
                priceHistory={item.price_history_hourly_24h_usd}
            />
        );
    });

    return (
        <div className="cryptocurrency-page-wrapper">
            <div className="slider-wrapper">
                <div className="currency-slider-container">
                    <Slider {...sliderSettings}>{sliderMapFunc}</Slider>
                </div>
            </div>
            <div className="content-wrapper">
                <h2>{t('text1')}</h2>
            </div>
        </div>
    );
};

export default CryptocurrencyPageWithApi;
