import axios from 'axios';

export const getCandlestickChartData = (currency: string) => {
    switch (currency) {
        case 'usd':
            const candlestickBtcUsd = 'https://api.coingecko.com/api/v3/coins/bitcoin/ohlc?vs_currency=usd&days=7';

            return axios.get(candlestickBtcUsd);
        case 'eur':
            const candlestickBtcEur = 'https://api.coingecko.com/api/v3/coins/bitcoin/ohlc?vs_currency=eur&days=7';

            return axios.get(candlestickBtcEur);
        case 'uah':
            const candlestickBtcUah = 'https://api.coingecko.com/api/v3/coins/bitcoin/ohlc?vs_currency=uah&days=7';

            return axios.get(candlestickBtcUah);
        case 'pln':
            const candlestickBtcPln = 'https://api.coingecko.com/api/v3/coins/bitcoin/ohlc?vs_currency=pln&days=7';

            return axios.get(candlestickBtcPln);
        default:
            const candlestickBtcDefault = 'https://api.coingecko.com/api/v3/coins/bitcoin/ohlc?vs_currency=usd&days=7';

            return axios.get(candlestickBtcDefault);
    }
};
