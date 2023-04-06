import { FC } from 'react';
import _ from 'lodash';
import { ICoinListData } from '../../../../configs/interfaces/CryptocurrencyPageInterfaces';
import CryptocurrencyListCard from '../../../cards/cryptocurrency-list-cards/coin-card/CryptocurrencyListCard';
import { transformCryptocurrencyListData } from './CyptocurrencyListContainerFuncs';
import CryptocurrencyListError from '../../../errors/cryptocurrency-list-error';
import CryptocurrencyListLoader from './loader/CryptocurrencyListLoader';
// import { useTranslation } from 'react-i18next';

interface IListData {
    coinListData: ICoinListData[];
    dataGetError: IErrorData;
    candlestickChartData: object[];
    candlestickDataGetError: IErrorData;
    chartType: string;
    isCategorySelected: boolean;
    selectedCategoryDataGetError: IErrorData;
    categoryData: ICoinListData[];
    activeCurrency: string;
    watchlistCoinsData: ICoinListData[];
    isShowWatchlist: boolean;
    watchlistCoinsDataGetError: IErrorData;
}

interface IErrorData {
    isError: boolean;
    message: string;
}

interface ITransformedDataObj {
    symbolInUpper: string;
    marketCapWithSeparatop: string;
    volume24hWithSeparator: string;
    isChange1hRisingValue: boolean;
    priceChangePercentage1hRounded: string;
    isChange24hRisingValue: boolean;
    priceChangePercentage24hRounded: string;
    isChange7dRisingValue: boolean;
    priceChangePercentage7dRounded: string;
    isChange30dRisingValue: boolean;
    priceChangePercentage30dRounded: string;
    activeCurrency: string;
    slicedCandlestickChartData: object[];
}

const CryptocurrencyListContainer: FC<IListData> = (props) => {
    const {
        coinListData,
        dataGetError,
        candlestickChartData,
        candlestickDataGetError,
        chartType,
        isCategorySelected,
        categoryData,
        activeCurrency,
        selectedCategoryDataGetError,
        watchlistCoinsData,
        isShowWatchlist,
        watchlistCoinsDataGetError
    } = props;

    // const { t } = useTranslation();

    const cryptocurrencyListCardItem = (item: ICoinListData, transformedDataObject: ITransformedDataObj) => {
        return (
            <CryptocurrencyListCard
                key={item.id}
                itemId={item.id}
                icon={item.image}
                symbol={transformedDataObject.symbolInUpper}
                name={item.name}
                numerationNumber={item.market_cap_rank}
                currentPrice={item.current_price}
                isChange1hRising={transformedDataObject.isChange1hRisingValue}
                priceChangePercentage1h={transformedDataObject.priceChangePercentage1hRounded}
                isChange24hRising={transformedDataObject.isChange24hRisingValue}
                priceChangePercentage24h={transformedDataObject.priceChangePercentage24hRounded}
                isChange7dRising={transformedDataObject.isChange7dRisingValue}
                priceChangePercentage7d={transformedDataObject.priceChangePercentage7dRounded}
                isChange30dRising={transformedDataObject.isChange30dRisingValue}
                priceChangePercentage30d={transformedDataObject.priceChangePercentage30dRounded}
                marketCap={transformedDataObject.marketCapWithSeparatop}
                volume24h={transformedDataObject.volume24hWithSeparator}
                coinHistory7dData={item.sparkline_in_7d.price}
                activeCurrency={transformedDataObject.activeCurrency}
                chartType={chartType}
                candlestickChartData={transformedDataObject.slicedCandlestickChartData}
            />
        );
    };

    const categoryMapFunc = categoryData.map((item) => {
        const transformedDataObject: ITransformedDataObj = transformCryptocurrencyListData(item, candlestickChartData);
        return cryptocurrencyListCardItem(item, transformedDataObject);
    });

    const watchlistMapFunc = watchlistCoinsData.map((item) => {
        const transformedDataObject: ITransformedDataObj = transformCryptocurrencyListData(item, candlestickChartData);
        return cryptocurrencyListCardItem(item, transformedDataObject);
    });

    const listMapFunc = coinListData.map((item) => {
        const transformedDataObject: ITransformedDataObj = transformCryptocurrencyListData(item, candlestickChartData);
        return cryptocurrencyListCardItem(item, transformedDataObject);
    });

    const mapListFunc = () => {
        if (isCategorySelected) {
            return categoryMapFunc;
        }
        if (isShowWatchlist) {
            if (!_.isEmpty(watchlistCoinsData)) {
                return watchlistMapFunc;
            } else {
                return <div>Looks like no items in your watchlist</div>;
                // return <div>{t('cryptocurrency-list-panel.watchlist-no-items')}</div>;
            }
        }
        return listMapFunc;
    };

    const renderer = () => {
        //this block is highly recomended to be at first position
        if (chartType === 'candlestick' && candlestickDataGetError.isError) {
            return (
                <div className="coins-list-map-wrapper">
                    {CryptocurrencyListError(chartType, candlestickDataGetError.message, activeCurrency)}
                </div>
            );
        }

        if (!isShowWatchlist && !isCategorySelected && dataGetError.isError) {
            return (
                <div className="coins-list-map-wrapper">
                    {CryptocurrencyListError(chartType, dataGetError.message, activeCurrency)}
                </div>
            );
        }

        if (isShowWatchlist && watchlistCoinsDataGetError.isError && !isCategorySelected) {
            return (
                <div className="coins-list-map-wrapper">
                    {CryptocurrencyListError(chartType, watchlistCoinsDataGetError.message, activeCurrency)}
                </div>
            );
        }

        if (isCategorySelected && selectedCategoryDataGetError.isError && !isShowWatchlist) {
            return (
                <div className="coins-list-map-wrapper">
                    {CryptocurrencyListError(chartType, selectedCategoryDataGetError.message, activeCurrency)}
                </div>
            );
        }

        if (!isShowWatchlist && !isCategorySelected && !dataGetError.isError) {
            return <div className="coins-list-map-wrapper">{mapListFunc()}</div>;
        }

        if (isCategorySelected && !selectedCategoryDataGetError.isError && !isShowWatchlist) {
            return <div className="coins-list-map-wrapper">{mapListFunc()}</div>;
        }

        if (isShowWatchlist && !watchlistCoinsDataGetError.isError && !isCategorySelected) {
            return <div className="coins-list-map-wrapper">{mapListFunc()}</div>;
        } else {
            return (
                <div className="coins-list-map-wrapper">
                    <CryptocurrencyListLoader />
                </div>
            );
        }
    };

    return renderer();
};

export default CryptocurrencyListContainer;
