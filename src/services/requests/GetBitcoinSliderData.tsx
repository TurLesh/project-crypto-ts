import { useState, useEffect } from 'react';
import axios from 'axios';

const GetBitcoinData = () => {
    const [btcData, setBtcData] = useState(null);

    const btcURL = 'http://localhost:8080/api/bitcoin';

    useEffect(() => {
        axios.get(btcURL).then((response) => {
            setBtcData(response.data);
        });
    }, []);

    if (!btcData) return null;

    return btcData;
};

export default GetBitcoinData;
