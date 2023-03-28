import { FC } from 'react';
import { ICoinListData } from '../../../../configs/interfaces/CryptocurrencyPageInterfaces';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { sliderSettings } from '../../../../configs/sliderConfigs';
import CryptocurrencySliderCard from '../../../cards/cryptocurrency-slider-card/CryptocurrencySliderCard';
import CryptocurrencySliderError from '../../../errors/cryptocurrency-slider-error';
import { useGetSliderCoinsData, transformCryptocurrencySliderData } from './CryptocurrencySliderContainerFuncs';

interface ICoinsData {
    coinListData: ICoinListData[];
    activeCurrency: string;
    dataGetError: {
        isError: boolean;
        message: string;
    };
}

const CryptocurrencySliderContainer: FC<ICoinsData> = (props) => {
    const { coinListData, activeCurrency, dataGetError } = props;
    const sliderCoinsData = useGetSliderCoinsData(coinListData, activeCurrency);

    const sliderMapFunc = sliderCoinsData.map((item) => {
        const transformedDataObject = transformCryptocurrencySliderData(item);

        return (
            <CryptocurrencySliderCard
                key={item.id}
                name={item.name}
                symbol={transformedDataObject.symbolInUpper}
                currentPrice={item.current_price}
                isChange24hRising={transformedDataObject.isChange24hRisingValue}
                priceChangePercentage24h={transformedDataObject.priceChangePercentage24hRounded}
                isChange7dRising={transformedDataObject.isChange7dRisingValue}
                priceChangePercentage7d={transformedDataObject.priceChangePercentage7dRounded}
                isChange30dRising={transformedDataObject.isChange30dRisingValue}
                priceChangePercentage30d={transformedDataObject.priceChangePercentage30dRounded}
                priceHistory7dData={item.sparkline_in_7d.price}
                activeCurrency={activeCurrency}
            />
        );
    });

    const renderer = () => {
        if (dataGetError.isError) {
            return <Slider {...sliderSettings}>{CryptocurrencySliderError(activeCurrency)}</Slider>;
        } else {
            return <Slider {...sliderSettings}>{sliderMapFunc}</Slider>;
        }
    };

    return renderer();
};

export default CryptocurrencySliderContainer;
