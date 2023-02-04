import axios from 'axios';

const getLink = (category_id: string, currency: string, rows: string) => {
    return `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&category=${category_id}&order=market_cap_desc&per_page=${rows}&page=1&sparkline=true&price_change_percentage=1h%2C24h%2C7d%2C30d`;
};

export const getCategoryData = (category_id: string, currency: string, rows: string) => {
    switch (currency) {
        case 'usd':
            switch (rows) {
                case '20':
                    return axios.get(getLink(category_id, currency, rows));
                case '50':
                    return axios.get(getLink(category_id, currency, rows));
                case '100':
                    return axios.get(getLink(category_id, currency, rows));
                default:
                    return axios.get(getLink(category_id, currency, '20'));
            }
        case 'eur':
            switch (rows) {
                case '20':
                    return axios.get(getLink(category_id, currency, rows));
                case '50':
                    return axios.get(getLink(category_id, currency, rows));
                case '100':
                    return axios.get(getLink(category_id, currency, rows));
                default:
                    return axios.get(getLink(category_id, currency, '20'));
            }
        case 'uah':
            switch (rows) {
                case '20':
                    return axios.get(getLink(category_id, currency, rows));
                case '50':
                    return axios.get(getLink(category_id, currency, rows));
                case '100':
                    return axios.get(getLink(category_id, currency, rows));
                default:
                    return axios.get(getLink(category_id, currency, '20'));
            }
        case 'pln':
            switch (rows) {
                case '20':
                    return axios.get(getLink(category_id, currency, rows));
                case '50':
                    return axios.get(getLink(category_id, currency, rows));
                case '100':
                    return axios.get(getLink(category_id, currency, rows));
                default:
                    return axios.get(getLink(category_id, currency, '20'));
            }
        default:
            switch (rows) {
                case '20':
                    return axios.get(getLink(category_id, 'usd', rows));
                case '50':
                    return axios.get(getLink(category_id, 'usd', rows));
                case '100':
                    return axios.get(getLink(category_id, 'usd', rows));
                default:
                    return axios.get(getLink(category_id, 'usd', '20'));
            }
    }
};
