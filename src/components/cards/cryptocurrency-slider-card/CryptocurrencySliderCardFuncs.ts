interface ICryptocurrencySliderCardLogic {
    isChange7dRising: boolean;
    name: string;
    priceHistory7dData: number[];
    activeCurrency: string;
}

export const getCurrencyPrefix = (activeCurrency: string) => {
    switch (activeCurrency) {
        case 'usd':
            const currencyPrefixUSD = '$';
            return currencyPrefixUSD;
        case 'eur':
            const currencyPrefixEUR = '€';
            return currencyPrefixEUR;
        case 'uah':
            const currencyPrefixUAH = '₴';
            return currencyPrefixUAH;
        case 'pln':
            const currencyPrefixPLN = 'zł';
            return currencyPrefixPLN;
        default:
            const currencyPrefixDefault = '$';
            return currencyPrefixDefault;
    }
};

export const CryptocurrencySliderCardFuncs = (props: ICryptocurrencySliderCardLogic) => {
    const { isChange7dRising, name, priceHistory7dData, activeCurrency } = props;

    const chartTrendUp = isChange7dRising;
    const colorTernar: string = chartTrendUp === true ? '#0d9b44' : '#fb3131';

    const series = [
        {
            name: name,
            color: colorTernar,
            legend: { show: false },
            data: priceHistory7dData
        }
    ];

    const data = {
        series,
        currencyPrefix: getCurrencyPrefix(activeCurrency)
    };

    return data;
};
