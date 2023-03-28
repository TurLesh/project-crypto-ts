import CryptocurrencySliderErrorCard from './CryptocurrencySliderErrorCard';

const CryptocurrencySliderError = (activeCurrency: string) => {
    const generateCryptocurrencySliderErrorCard = () => {
        return (
            <CryptocurrencySliderErrorCard
                key="error"
                name="error"
                symbol="ERROR"
                currentPrice="???"
                isChange24hRising={false}
                priceChangePercentage24h="???"
                isChange7dRising={false}
                priceChangePercentage7d="???"
                isChange30dRising={false}
                priceChangePercentage30d="???"
                priceHistory7dData={[10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0]}
                activeCurrency={activeCurrency}
            />
        );
    };

    const arrResult: JSX.Element[] = Array(4).fill(generateCryptocurrencySliderErrorCard());

    return [arrResult];
};

export default CryptocurrencySliderError;
