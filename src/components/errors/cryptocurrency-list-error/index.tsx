import { getCurrencyPrefix } from '../../cards/cryptocurrency-slider-card/CryptocurrencySliderCardFuncs';
import { useSelector } from 'react-redux';
import { RootState } from '../../../services/store';
import CryptocurrencyListErrorCard from './CryptocurrencyListErrorCard';

const CryptocurrencyListError = (chartType: string, message: string, activeCurrency: string) => {
    //get selected rows amount value from storage
    const activeRowsAmountObject = useSelector((state: RootState) => state.rowsAmount);
    const activeRowsAmountState: number = activeRowsAmountObject.rowsAmount;

    const generateCryptocurrencyListErrorCard = () => {
        return (
            <CryptocurrencyListErrorCard
                symbol="ERROR"
                name={message}
                numerationNumber="?"
                currencyPrefix={getCurrencyPrefix(activeCurrency)}
                currentPrice="???"
                priceChangePercentage1h="???"
                priceChangePercentage24h="???"
                priceChangePercentage7d="???"
                priceChangePercentage30d="???"
                marketCap="?????"
                volume24h="?????"
                coinHistory7dData={[10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0]}
                chartType={chartType}
                candlestickChartData={[
                    { x: 1, y: [100, 105, 90, 95] },
                    { x: 2, y: [95, 100, 85, 90] },
                    { x: 3, y: [90, 95, 80, 85] },
                    { x: 4, y: [85, 90, 75, 80] },
                    { x: 5, y: [80, 85, 70, 75] },
                    { x: 6, y: [75, 80, 65, 70] },
                    { x: 7, y: [70, 75, 60, 65] }
                ]}
            />
        );
    };

    const arrResult: JSX.Element[] = Array(activeRowsAmountState).fill(generateCryptocurrencyListErrorCard());

    return arrResult;
};

export default CryptocurrencyListError;
