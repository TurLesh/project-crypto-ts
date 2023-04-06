import axios from 'axios';

// watchlistArr (passed here as ids[]) have to contain at least 1 element
const getLink = (currency: string, ids: string[]) => {
    const rows = ids.length.toString();

    const getIdStringForLink = () => {
        if (ids.length < 2) {
            return ids[0];
        } else {
            return ids.join('%2C');
        }
    };

    return `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&ids=${getIdStringForLink()}&order=market_cap_desc&per_page=${rows}&page=1&sparkline=true&price_change_percentage=1h%2C24h%2C7d%2C30d`;
};

export const getWatchlistCoinsData = (currency: string, ids: string[]) => {
    return axios.get(getLink(currency, ids));
};
