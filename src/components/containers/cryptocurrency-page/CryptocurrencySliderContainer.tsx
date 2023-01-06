import { FC } from 'react';
import { ICoinListData } from '../../../configs/interfaces/CryptocurrencyPageInterfaces';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { sliderSettings } from '../../../configs/sliderConfigs';
import CryptocurrencySliderCard from '../../cards/cryptocurrency-slider-card/CryptocurrencySliderCard';

interface ICoinsData {
    coinListData: ICoinListData[];
}

const CryptocurrencySliderContainer: FC<ICoinsData> = (props) => {
    const { coinListData } = props;

    const sliderMapFunc = coinListData.slice(0, 6).map((item, index) => {
        const symbolInUpper = item.symbol.toUpperCase();

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

        //30d
        let isChange30dRisingValue: boolean;

        if (item.price_change_percentage_30d_in_currency < 0) {
            isChange30dRisingValue = false;
        } else {
            isChange30dRisingValue = true;
        }

        const priceChangePercentage30dNumber = Math.abs(item.price_change_percentage_30d_in_currency);
        const priceChangePercentage30dRounded = priceChangePercentage30dNumber.toFixed(2);

        const getActiveCurrency = () => {
            const activeCurrencyGet = localStorage.getItem('activeCurrency');

            if (activeCurrencyGet) {
                const activeCurrency: string = activeCurrencyGet;
                return activeCurrency;
            } else {
                const activeCurrency = 'usd';
                return activeCurrency;
            }
        };

        return (
            <CryptocurrencySliderCard
                key={item.id}
                name={item.name}
                symbol={symbolInUpper}
                currentPrice={item.current_price}
                isChange24hRising={isChange24hRisingValue}
                priceChangePercentage24h={priceChangePercentage24hRounded}
                isChange7dRising={isChange7dRisingValue}
                priceChangePercentage7d={priceChangePercentage7dRounded}
                isChange30dRising={isChange30dRisingValue}
                priceChangePercentage30d={priceChangePercentage30dRounded}
                priceHistory7dData={item.sparkline_in_7d.price}
                activeCurrency={getActiveCurrency()}
            />
        );
    });

    return <Slider {...sliderSettings}>{sliderMapFunc}</Slider>;
};

export default CryptocurrencySliderContainer;
