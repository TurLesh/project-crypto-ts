import { useState, useEffect } from 'react';
import axios from 'axios';

const GetEthereumData = () => {
    const [ethData, setEthData] = useState(null);

    const ethURL = 'http://localhost:8080/api/ethereum';

    useEffect(() => {
        axios.get(ethURL).then((response) => {
            setEthData(response.data);
        });
    }, []);

    if (!ethData) return null;

    return ethData;
};

export default GetEthereumData;
