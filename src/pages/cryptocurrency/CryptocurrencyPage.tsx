import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import CryptocurrencySliderCard from '../../components/cards/cryptocurrency-slider-card/CryptocurrencySliderCard';
import SliderData from '../../data/cryptocurrency-slider-data.json';
import Slider from 'react-slick';
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
    btc: number;
    eth: number;
    bnb: number;
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

const CryptocurrencyPage: FC = () => {
    const { t } = useTranslation();

    const data: SliderDataType[] = SliderData.slider_cryptocurrency_data;

    //options for slider component
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        variableWidth: true,
        initialSlide: 0,
        autoplay: true,
        autoplaySpeed: 10000,
        pauseOnHover: true
    };

    const sliderMapFunc = data.map((item) => {
        return (
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
                    <Slider {...settings}>{sliderMapFunc}</Slider>
                </div>
            </div>
            <div className="content-wrapper">
                <h2>{t('text1')}</h2>
            </div>
        </div>
    );
};

export default CryptocurrencyPage;
