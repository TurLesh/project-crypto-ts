import { FC, useEffect, useState } from 'react';
import { useAuth } from '../../../../services/hooks/useAuth';
import { ICoinListData } from '../../../../configs/interfaces/CryptocurrencyPageInterfaces';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { sliderSettings } from '../../../../configs/sliderConfigs';
import CryptocurrencySliderCard from '../../../cards/cryptocurrency-slider-card/CryptocurrencySliderCard';
import CryptocurrencySliderError from '../../../errors/cryptocurrency-slider-error';
import { transformCryptocurrencySliderData } from './CryptocurrencySliderContainerFuncs';

interface ICoinsData {
    coinListData: ICoinListData[];
    activeCurrency: string;
    dataGetError: {
        isError: boolean;
        message: string;
    };
    watchlistCoinsData: ICoinListData[];
    watchlistCoinsDataGetError: {
        isError: boolean;
        message: string;
    };
}

const CryptocurrencySliderContainer: FC<ICoinsData> = (props) => {
    const { coinListData, activeCurrency, dataGetError, watchlistCoinsData, watchlistCoinsDataGetError } = props;
    const { isAuth } = useAuth();

    const [watchlistDataShowedInSlider, setWatchlistDataShowedInSlider] = useState<ICoinListData[]>([]);
    const [watchlistSliderDataError, setWatchlistSliderDataError] = useState({
        isError: false,
        message: ''
    });

    useEffect(() => {
        if (isAuth) {
            if (watchlistCoinsData.length < 4) {
                if (!dataGetError.isError) {
                    const coinsDataTopFive = coinListData.slice(0, 5);
                    if (watchlistCoinsData.length !== 0) {
                        if (!watchlistCoinsDataGetError.isError) {
                            setWatchlistDataShowedInSlider([...coinsDataTopFive, ...watchlistCoinsData]);
                            setWatchlistSliderDataError({
                                isError: false,
                                message: ''
                            });
                        } else {
                            setWatchlistSliderDataError({
                                isError: true,
                                message: watchlistCoinsDataGetError.message
                            });
                        }
                    } else {
                        setWatchlistDataShowedInSlider(coinsDataTopFive);
                        setWatchlistSliderDataError({
                            isError: false,
                            message: ''
                        });
                    }
                } else {
                    setWatchlistSliderDataError({
                        isError: true,
                        message: dataGetError.message
                    });
                }
            } else {
                setWatchlistDataShowedInSlider(watchlistCoinsData);
                setWatchlistSliderDataError({
                    isError: false,
                    message: ''
                });
            }
        } else {
            if (!dataGetError.isError) {
                const coinsDataTopFive = coinListData.slice(0, 5);
                setWatchlistDataShowedInSlider(coinsDataTopFive);
                setWatchlistSliderDataError({
                    isError: false,
                    message: ''
                });
            } else {
                setWatchlistSliderDataError({
                    isError: true,
                    message: dataGetError.message
                });
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAuth, watchlistCoinsData, coinListData]);

    const sliderMapFunc = watchlistDataShowedInSlider.map((item) => {
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
        if (watchlistSliderDataError.isError) {
            return <Slider {...sliderSettings}>{CryptocurrencySliderError(activeCurrency)}</Slider>;
        } else {
            return <Slider {...sliderSettings}>{sliderMapFunc}</Slider>;
        }
    };

    return renderer();
};

export default CryptocurrencySliderContainer;
