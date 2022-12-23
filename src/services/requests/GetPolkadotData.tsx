import { useState, useEffect } from 'react';
import axios from 'axios';

const GetPolkadotData = () => {
    const [dotData, setDotData] = useState(null);

    const dotURL = 'http://localhost:8080/api/polkadot';

    useEffect(() => {
        axios.get(dotURL).then((response) => {
            setDotData(response.data);
        });
    }, []);

    if (!dotData) return null;

    return dotData;
};

export default GetPolkadotData;
