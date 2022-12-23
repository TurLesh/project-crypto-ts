import { useState, useEffect } from 'react';
import axios from 'axios';

const GetCardanoData = () => {
    const [adaData, setAdaData] = useState(null);

    const adaURL = 'http://localhost:8080/api/cardano';

    useEffect(() => {
        axios.get(adaURL).then((response) => {
            setAdaData(response.data);
        });
    }, []);

    if (!adaData) return null;

    return adaData;
};

export default GetCardanoData;
