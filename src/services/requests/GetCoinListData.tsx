import axios from 'axios';

export const getCoinListDataUSD = () => {
    const coinURL = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=true&price_change_percentage=1h%2C24h%2C7d%2C30d';

    return axios.get(coinURL);
};

export const getCoinListDataEUR = () => {
    const coinURL = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&order=market_cap_desc&per_page=20&page=1&sparkline=true&price_change_percentage=1h%2C24h%2C7d%2C30d';

    return axios.get(coinURL);
};

export const getCoinListDataUAH = () => {
    const coinURL = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=uah&order=market_cap_desc&per_page=20&page=1&sparkline=true&price_change_percentage=1h%2C24h%2C7d%2C30d';

    return axios.get(coinURL);
};

export const getCoinListDataPLN = () => {
    const coinURL = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=pln&order=market_cap_desc&per_page=20&page=1&sparkline=true&price_change_percentage=1h%2C24h%2C7d%2C30d';

    return axios.get(coinURL);
};
