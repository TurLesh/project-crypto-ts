import { useState, useEffect } from 'react';
import axios from 'axios';

const GetCoinListData = () => {
    const [coinData, setCoinData] = useState(null);

    const coinURL = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=true&price_change_percentage=1h%2C24h%2C7d%2C30d';

    useEffect(() => {
        axios.get(coinURL).then((response) => {
            setCoinData(response.data);
        });
    }, []);

    if (!coinData) return null;

    return coinData;
};

export default GetCoinListData;
