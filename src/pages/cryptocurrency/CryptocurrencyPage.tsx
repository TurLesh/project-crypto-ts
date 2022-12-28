import { FC, useState } from 'react';
import Slider from 'react-slick';
import { sliderSettings } from '../../configs/sliderConfigs';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import CryptocurrencySliderCard from '../../components/cards/cryptocurrency-slider-card/CryptocurrencySliderCard';
import SliderData from '../../data/cryptocurrency-slider-data.json';
import CryptocurrencyListCard from '../../components/cards/cryptocurrency-list-card/CryptocurrencyListCard';
import GetCoinListData from '../../services/requests/GetCoinListData';
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

//coin list type options
type CoinListDataType = {
    id: string;
    symbol: string;
    name: string;
    market_cap_rank: number;
    image: string;
    current_price: number;
    market_cap: number;
    total_volume: number;
    price_change_percentage_1h_in_currency: number;
    price_change_percentage_24h_in_currency: number;
    price_change_percentage_7d_in_currency: number;
    sparkline_in_7d: CoinHistory7dType;
};

type CoinHistory7dType = {
    price: number[];
};

const CryptocurrencyPage: FC = () => {
    const data: SliderDataType[] = SliderData.slider_cryptocurrency_data;
    const [coinListData, setCoinListData] = useState<CoinListDataType[]>([]);
    const coinListDataGet = GetCoinListData();

    if (coinListDataGet && coinListData !== coinListDataGet) {
        setCoinListData(coinListDataGet);
    }

    console.log(coinListData);

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

    const listMapFunc = coinListData.map((item) => {
        const symbolInUpper = item.symbol.toUpperCase();
        const marketCapWithSeparatop = item.market_cap.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        const volume24hWithSeparator = item.total_volume.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

        //1h
        let isChange1hRisingValue: boolean;

        if (item.price_change_percentage_1h_in_currency < 0) {
            isChange1hRisingValue = false;
        } else {
            isChange1hRisingValue = true;
        }

        const priceChangePercentage1hNumber = Math.abs(item.price_change_percentage_1h_in_currency);
        const priceChangePercentage1hRounded = priceChangePercentage1hNumber.toFixed(2);

        //24h
        let isChange24hRisingValue: boolean;

        if (item.price_change_percentage_24h_in_currency < 0) {
            isChange24hRisingValue = false;
        } else {
            isChange24hRisingValue = true;
        }

        const priceChangePercentage24hNumber = Math.abs(item.price_change_percentage_24h_in_currency);
        const priceChangePercentage24hRounded = priceChangePercentage24hNumber.toFixed(2);

        //7d
        let isChange7dRisingValue: boolean;

        if (item.price_change_percentage_7d_in_currency < 0) {
            isChange7dRisingValue = false;
        } else {
            isChange7dRisingValue = true;
        }

        const priceChangePercentage7dNumber = Math.abs(item.price_change_percentage_7d_in_currency);
        const priceChangePercentage7dRounded = priceChangePercentage7dNumber.toFixed(2);

        return (
            <CryptocurrencyListCard
                key={item.id}
                icon={item.image}
                symbol={symbolInUpper}
                name={item.name}
                numerationNumber={item.market_cap_rank}
                currentPrice={item.current_price}
                isChange1hRising={isChange1hRisingValue}
                priceChangePercentage1h={priceChangePercentage1hRounded}
                isChange24hRising={isChange24hRisingValue}
                priceChangePercentage24h={priceChangePercentage24hRounded}
                isChange7dRising={isChange7dRisingValue}
                priceChangePercentage7d={priceChangePercentage7dRounded}
                marketCap={marketCapWithSeparatop}
                volume24h={volume24hWithSeparator}
                coinHistory7dData={item.sparkline_in_7d.price}
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
            <div className="content-wrapper">{listMapFunc}</div>
        </div>
    );
};

export default CryptocurrencyPage;
