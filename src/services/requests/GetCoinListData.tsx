import axios from 'axios';

export const getCoinListData = (currency: string) => {
    switch (currency) {
        case 'usd':
            const coinUrlUsd = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=true&price_change_percentage=1h%2C24h%2C7d%2C30d';

            return axios.get(coinUrlUsd);
        case 'eur':
            const coinUrlEur = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&order=market_cap_desc&per_page=20&page=1&sparkline=true&price_change_percentage=1h%2C24h%2C7d%2C30d';

            return axios.get(coinUrlEur);
        case 'uah':
            const coinUrlUah = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=uah&order=market_cap_desc&per_page=20&page=1&sparkline=true&price_change_percentage=1h%2C24h%2C7d%2C30d';

            return axios.get(coinUrlUah);
        case 'pln':
            const coinUrlPln = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=pln&order=market_cap_desc&per_page=20&page=1&sparkline=true&price_change_percentage=1h%2C24h%2C7d%2C30d';

            return axios.get(coinUrlPln);
        default:
            const coinUrlDefault = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=true&price_change_percentage=1h%2C24h%2C7d%2C30d';

            return axios.get(coinUrlDefault);
    }
};
