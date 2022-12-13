import { useState, useEffect } from 'react';
import axios from 'axios';

const GetBitcoinData = () => {
    const [btcData, setBtcData] = useState(null);
    const [btcHistoryData, setBtcHistoryData] = useState(null);

    const btcURL = 'http://localhost:8080/api/bitcoin';

    useEffect(() => {
        axios.get(btcURL).then((response) => {
            const btcHistoryStr = response.data.price_history_hourly_24h_usd[0];
            const btcHistoryStrArr = btcHistoryStr.split(',');

            const btcHistory = btcHistoryStrArr.map((str: string) => {
                return Number(str);
            });

            setBtcData(response.data);
            setBtcHistoryData(btcHistory);
        });
    }, []);

    if (!btcData) return null;

    return [btcData, btcHistoryData];
};

export default GetBitcoinData;
