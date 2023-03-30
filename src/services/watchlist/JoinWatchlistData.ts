import { ICoinListData } from '../../configs/interfaces/CryptocurrencyPageInterfaces';
import { getWatchlistCoinsData } from '../requests/GetWatchlistCoinsData';

// fist step - check for coin data in object given by parent
// second step - get unfound coin data from api (in no unfound -> return coin data from prev step)
// third step - get all objects into one array, using spread operator
export const joinWatchlistData = async (
    coinsDataFromCryptocurrencyList: ICoinListData[],
    watchlistItems: string[],
    activeCurrency: string
) => {
    let coinsData: ICoinListData[] = [];
    let unfoundItems: string[] = [];
    watchlistItems.forEach((element) => {
        let obj = coinsDataFromCryptocurrencyList.find((x) => x.id === element);
        if (obj) {
            coinsData = [...coinsData, obj];
        } else {
            unfoundItems = [...unfoundItems, element];
        }
    });
    if (unfoundItems.length === 0) {
        return coinsData;
    } else {
        const unfoundCoinsFromApi = await unfoundCoinsResolver(activeCurrency, unfoundItems);
        const userSliderCoinsData = [...coinsData, ...unfoundCoinsFromApi];
        return userSliderCoinsData;
    }
};

const unfoundCoinsResolver = async (activeCurrency: string, unfoundItems: string[]) => {
    try {
        const unfoundCoinsPromise = await getWatchlistCoinsData(activeCurrency, unfoundItems);
        const data: ICoinListData[] = unfoundCoinsPromise.data;
        return data;
    } catch (error) {
        return [];
    }
};
