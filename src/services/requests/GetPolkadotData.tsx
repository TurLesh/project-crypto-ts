import { useState, useEffect } from 'react';
import axios from 'axios';

const GetPolkadotData = () => {
    const [dotData, setDotData] = useState(null);
    const [dotHistoryData, setDotHistoryData] = useState(null);

    const dotURL = 'http://localhost:8080/api/polkadot';

    useEffect(() => {
        axios.get(dotURL).then((response) => {
            const dotHistoryStr = response.data.price_history_hourly_24h_usd[0];
            const dotHistoryStrArr = dotHistoryStr.split(',');

            const dotHistory = dotHistoryStrArr.map((str: string) => {
                return Number(str);
            });

            setDotData(response.data);
            setDotHistoryData(dotHistory);
        });
    }, []);

    if (!dotData) return null;

    return [dotData, dotHistoryData];
};

export default GetPolkadotData;
