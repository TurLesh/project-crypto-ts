import axios from 'axios';

const getLink = (currency: string, rows: string) => {
    return `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=${rows}&page=1&sparkline=true&price_change_percentage=1h%2C24h%2C7d%2C30d`;
};

//https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&category=cardano-ecosystem&order=market_cap_desc&per_page=20&page=1&sparkline=true&price_change_percentage=1h%2C24h%2C7d%2C30d

export const getCoinListData = (currency: string, rows: string) => {
    switch (currency) {
        case 'usd':
            switch (rows) {
                case '20':
                    return axios.get(getLink(currency, rows));
                case '50':
                    return axios.get(getLink(currency, rows));
                case '100':
                    return axios.get(getLink(currency, rows));
                default:
                    return axios.get(getLink(currency, '20'));
            }
        case 'eur':
            switch (rows) {
                case '20':
                    return axios.get(getLink(currency, rows));
                case '50':
                    return axios.get(getLink(currency, rows));
                case '100':
                    return axios.get(getLink(currency, rows));
                default:
                    return axios.get(getLink(currency, '20'));
            }
        case 'uah':
            switch (rows) {
                case '20':
                    return axios.get(getLink(currency, rows));
                case '50':
                    return axios.get(getLink(currency, rows));
                case '100':
                    return axios.get(getLink(currency, rows));
                default:
                    return axios.get(getLink(currency, '20'));
            }
        case 'pln':
            switch (rows) {
                case '20':
                    return axios.get(getLink(currency, rows));
                case '50':
                    return axios.get(getLink(currency, rows));
                case '100':
                    return axios.get(getLink(currency, rows));
                default:
                    return axios.get(getLink(currency, '20'));
            }
        default:
            switch (rows) {
                case '20':
                    return axios.get(getLink('usd', rows));
                case '50':
                    return axios.get(getLink('usd', rows));
                case '100':
                    return axios.get(getLink('usd', rows));
                default:
                    return axios.get(getLink('usd', '20'));
            }
    }
};
