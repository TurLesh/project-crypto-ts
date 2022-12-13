import { useState, useEffect } from 'react';
import axios from 'axios';

const GetCardanoData = () => {
    const [adaData, setAdaData] = useState(null);
    const [adaHistoryData, setAdaHistoryData] = useState(null);

    const adaURL = 'http://localhost:8080/api/cardano';

    useEffect(() => {
        axios.get(adaURL).then((response) => {
            const adaHistoryStr = response.data.price_history_hourly_24h_usd[0];
            const adaHistoryStrArr = adaHistoryStr.split(',');

            const adaHistory = adaHistoryStrArr.map((str: string) => {
                return Number(str);
            });

            setAdaData(response.data);
            setAdaHistoryData(adaHistory);
        });
    }, []);

    if (!adaData) return null;

    return [adaData, adaHistoryData];
};

export default GetCardanoData;
