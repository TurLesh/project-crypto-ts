import { FC } from 'react';
import { ICoinListData } from '../../../configs/interfaces/CryptocurrencyPageInterfaces';
import CryptocurrencyListCard from '../../cards/cryptocurrency-list-cards/coin-card/CryptocurrencyListCard';

interface IListData {
    coinListData: ICoinListData[];
    candlestickChartData: object[];
    chartType: string;
    isCategorySelected: boolean;
    categoryData: ICoinListData[];
    dataGetError: {
        isError: boolean;
        message: string;
    };
}

const CryptocurrencyListContainer: FC<IListData> = (props) => {
    const { coinListData, candlestickChartData, chartType, isCategorySelected, categoryData, dataGetError } = props;

    const transformData = (item: ICoinListData) => {
        const symbolInUpper = item.symbol.toUpperCase();
        const marketCapWithSeparatop = item.market_cap.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        const volume24hWithSeparator = item.total_volume.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        const slicedCandlestickChartData = candlestickChartData.slice(-7);

        //1h
        let isChange1hRisingValue: boolean;

        if (item.price_change_percentage_1h_in_currency < 0) {
            isChange1hRisingValue = false;
        } else {
            isChange1hRisingValue = true;
        }

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

        const priceChangePercentage1hNumber = Math.abs(item.price_change_percentage_1h_in_currency);
        const priceChangePercentage1hRounded = priceChangePercentage1hNumber.toFixed(2);

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

        const transformedDataObject = {
            symbolInUpper: symbolInUpper,
            marketCapWithSeparatop: marketCapWithSeparatop,
            volume24hWithSeparator: volume24hWithSeparator,
            isChange1hRisingValue: isChange1hRisingValue,
            priceChangePercentage1hRounded: priceChangePercentage1hRounded,
            isChange24hRisingValue: isChange24hRisingValue,
            priceChangePercentage24hRounded: priceChangePercentage24hRounded,
            isChange7dRisingValue: isChange7dRisingValue,
            priceChangePercentage7dRounded: priceChangePercentage7dRounded,
            isChange30dRisingValue: isChange30dRisingValue,
            priceChangePercentage30dRounded: priceChangePercentage30dRounded,
            activeCurrency: getActiveCurrency(),
            slicedCandlestickChartData: slicedCandlestickChartData
        };

        return transformedDataObject;
    };

    const categoryMapFunc = categoryData.map((item) => {
        const transformedDataObject = transformData(item);

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
        const transformedDataObject = transformData(item);

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
        if (dataGetError.isError) {
            return <div>{dataGetError.message}</div>;
        } else {
            return <div className="coins-list-map-wrapper">{mapListFunc()}</div>;
        }
    };

    return renderer();
};

export default CryptocurrencyListContainer;
