import { FC } from 'react';
import { ICoinListData } from '../../../../configs/interfaces/CryptocurrencyPageInterfaces';
import CryptocurrencyListCard from '../../../cards/cryptocurrency-list-cards/coin-card/CryptocurrencyListCard';
import { transformCryptocurrencyListData } from './CyptocurrencyListContainerFuncs';
import CryptocurrencyListError from '../../../errors/cryptocurrency-list-error';

interface IListData {
    coinListData: ICoinListData[];
    dataGetError: {
        isError: boolean;
        message: string;
    };
    candlestickChartData: object[];
    candlestickDataGetError: {
        isError: boolean;
        message: string;
    };
    chartType: string;
    isCategorySelected: boolean;
    selectedCategoryDataGetError: {
        isError: boolean;
        message: string;
    };
    categoryData: ICoinListData[];
    activeCurrency: string;
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
        selectedCategoryDataGetError
    } = props;

    const categoryMapFunc = categoryData.map((item) => {
        const transformedDataObject = transformCryptocurrencyListData(item, candlestickChartData);

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
    });

    const listMapFunc = coinListData.map((item) => {
        const transformedDataObject = transformCryptocurrencyListData(item, candlestickChartData);

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
    });

    const mapListFunc = () => {
        if (isCategorySelected) {
            return categoryMapFunc;
        } else {
            return listMapFunc;
        }
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

        if (!isCategorySelected && dataGetError.isError) {
            return (
                <div className="coins-list-map-wrapper">
                    {CryptocurrencyListError(chartType, dataGetError.message, activeCurrency)}
                </div>
            );
        }

        if (isCategorySelected && selectedCategoryDataGetError.isError) {
            return (
                <div className="coins-list-map-wrapper">
                    {CryptocurrencyListError(chartType, selectedCategoryDataGetError.message, activeCurrency)}
                </div>
            );
        }

        if (!isCategorySelected && !dataGetError.isError) {
            return <div className="coins-list-map-wrapper">{mapListFunc()}</div>;
        }

        if (isCategorySelected && !selectedCategoryDataGetError.isError) {
            return <div className="coins-list-map-wrapper">{mapListFunc()}</div>;
        } else {
            return (
                <div className="coins-list-map-wrapper">
                    {CryptocurrencyListError(chartType, 'Unexpected Error', activeCurrency)}
                </div>
            );
        }
    };

    return renderer();
};

export default CryptocurrencyListContainer;
