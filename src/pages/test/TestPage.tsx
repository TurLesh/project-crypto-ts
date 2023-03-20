import axios from 'axios';

const TestPage = () => {
    const URL =
        'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=true&price_change_percentage=1h%2C24h%2C7d%2C30d';
    const makeRequest = () => {
        const promise = axios.get(URL);
        return promise;
    };

    const promiseResolve = () => {
        const promise = makeRequest();

        promise.then((response) => {
            console.log(response.data);
        });
        promise.catch((error) => {
            console.log(error.message);
        });
    };
    return (
        <div>
            <button onClick={() => promiseResolve()}>Get Data</button>
        </div>
    );
};

export default TestPage;
