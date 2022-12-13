import { useState, useEffect } from 'react';
import axios from 'axios';

const GetEthereumData = () => {
    const [ethData, setEthData] = useState(null);
    const [ethHistoryData, setEthHistoryData] = useState(null);

    const ethURL = 'http://localhost:8080/api/ethereum';

    useEffect(() => {
        axios.get(ethURL).then((response) => {
            const ethHistoryStr = response.data.price_history_hourly_24h_usd[0];
            const ethHistoryStrArr = ethHistoryStr.split(',');

            const ethHistory = ethHistoryStrArr.map((str: string) => {
                return Number(str);
            });

            setEthData(response.data);
            setEthHistoryData(ethHistory);
        });
    }, []);

    if (!ethData) return null;

    return [ethData, ethHistoryData];
};

export default GetEthereumData;
