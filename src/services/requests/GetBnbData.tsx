import { useState, useEffect } from 'react';
import axios from 'axios';

const GetBnbData = () => {
    const [bnbData, setBnbData] = useState(null);

    const bnbURL = 'http://localhost:8080/api/oec-binance-coin';

    useEffect(() => {
        axios.get(bnbURL).then((response) => {
            setBnbData(response.data);
        });
    }, []);

    if (!bnbData) return null;

    return bnbData;
};

export default GetBnbData;
