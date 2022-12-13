import { useState, useEffect } from 'react';
import axios from 'axios';

const GetBnbData = () => {
    const [bnbData, setBnbData] = useState(null);
    const [bnbHistoryData, setBnbHistoryData] = useState(null);

    const bnbURL = 'http://localhost:8080/api/oec-binance-coin';

    useEffect(() => {
        axios.get(bnbURL).then((response) => {
            const bnbHistoryStr = response.data.price_history_hourly_24h_usd[0];
            const bnbHistoryStrArr = bnbHistoryStr.split(',');

            const bnbHistory = bnbHistoryStrArr.map((str: string) => {
                return Number(str);
            });

            setBnbData(response.data);
            setBnbHistoryData(bnbHistory);
        });
    }, []);

    if (!bnbData) return null;

    return [bnbData, bnbHistoryData];
};

export default GetBnbData;
