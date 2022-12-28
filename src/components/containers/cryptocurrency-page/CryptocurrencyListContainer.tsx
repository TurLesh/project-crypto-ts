import { FC } from 'react';
import CryptocurrencyListCard from '../../cards/cryptocurrency-list-card/CryptocurrencyListCard';
import { ICoinListData } from '../../../configs/interfaces/CryptocurrencyPageInterfaces';

interface ICoinList {
    coinListData: ICoinListData[];
}

const CryptocurrencyListContainer: FC<ICoinList> = (props) => {
    const { coinListData } = props;

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

        //30d
        let isChange30dRisingValue: boolean;

        if (item.price_change_percentage_30d_in_currency < 0) {
            isChange30dRisingValue = false;
        } else {
            isChange30dRisingValue = true;
        }

        const priceChangePercentage30dNumber = Math.abs(item.price_change_percentage_30d_in_currency);
        const priceChangePercentage30dRounded = priceChangePercentage30dNumber.toFixed(2);

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
                isChange30dRising={isChange30dRisingValue}
                priceChangePercentage30d={priceChangePercentage30dRounded}
                marketCap={marketCapWithSeparatop}
                volume24h={volume24hWithSeparator}
                coinHistory7dData={item.sparkline_in_7d.price}
            />
        );
    });

    return <>{listMapFunc}</>;
};

export default CryptocurrencyListContainer;
