import axios from 'axios';

const TestPage = () => {
    const URL = 'http://localhost:5000/aboba';
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
            console.log(error);
        });
    };
    return (
        <div>
            <button onClick={() => promiseResolve()}>Get Data</button>
        </div>
    );
};

export default TestPage;
