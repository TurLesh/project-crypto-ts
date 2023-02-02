import axios from 'axios';

const link = 'https://api.coingecko.com/api/v3/coins/categories/list';

export const getCategoriesList = () => {
    return axios.get(link);
};
