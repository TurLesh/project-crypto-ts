import { useState, useEffect } from 'react';
import { useAuth } from '../../../../services/hooks/useAuth';
import { ICoinListData } from '../../../../configs/interfaces/CryptocurrencyPageInterfaces';
import { getSliderCoinsData } from '../../../../services/requests/GetSliderData';

export const useGetSliderCoinsData = (coinListData: ICoinListData[], activeCurrency: string) => {
    const { isAuth, watchlist } = useAuth();
    const [sliderCoinsData, setSliderCoinsData] = useState<ICoinListData[]>([]);

    useEffect(() => {
        getCoinsData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAuth, watchlist, coinListData]);

    const getCoinsData = async () => {
        const coinsDataTopFive = coinListData.slice(0, 5);
        if (isAuth) {
            const watchlistLenght = watchlist.length;
            if (watchlistLenght < 4) {
                if (watchlistLenght === 0) {
                    setSliderCoinsData(coinsDataTopFive);
                } else {
                    const watchlistItemsOutOfTopFive = getWatchlistItemsOutOfTopFive(coinsDataTopFive);
                    if (watchlistItemsOutOfTopFive.length !== 0) {
                        const coinsDataExceptTopFive = coinListData.slice(5);
                        const userSliderCoinsData = await getUserSliderCoinsData(
                            coinsDataExceptTopFive,
                            watchlistItemsOutOfTopFive
                        );
                        const topFiveAndUserCoins = [...coinsDataTopFive, ...userSliderCoinsData];
                        setSliderCoinsData(topFiveAndUserCoins);
                    } else {
                        setSliderCoinsData(coinsDataTopFive);
                    }
                }
            } else {
                const userSliderCoinsData = await getUserSliderCoinsData(coinListData, watchlist);
                if (userSliderCoinsData.length < 4) {
                    setSliderCoinsData(coinsDataTopFive);
                } else {
                    setSliderCoinsData(userSliderCoinsData);
                }
            }
        } else {
            setSliderCoinsData(coinsDataTopFive);
        }
    };

    // check if watchlist items equal to top 5 ids. Returns array with watchlist ids out of top 5
    const getWatchlistItemsOutOfTopFive = (coinsDataTopFive: ICoinListData[]) => {
        let watchlistItemsNotInTopFive = watchlist;
        coinsDataTopFive.forEach((element) => {
            const itemId = element.id;
            if (watchlist.includes(itemId)) {
                watchlistItemsNotInTopFive = watchlistItemsNotInTopFive.filter((x) => x !== itemId);
            }
        });
        return watchlistItemsNotInTopFive;
    };

    // fist step - check for coin data in object given by parent
    // second step - get unfound coin data from api (in no unfound -> return coin data from prev step)
    // third step - get all objects into one array, using spread operator
    const getUserSliderCoinsData = async (coinsDataFromParent: ICoinListData[], watchlistItems: string[]) => {
        let coinsData: ICoinListData[] = [];
        let unfoundItems: string[] = [];
        watchlistItems.forEach((element) => {
            let obj = coinsDataFromParent.find((x) => x.id === element);
            if (obj) {
                coinsData = [...coinsData, obj];
            } else {
                unfoundItems = [...unfoundItems, element];
            }
        });
        if (unfoundItems.length === 0) {
            return coinsData;
        } else {
            const unfoundCoinsFromApi = await unfoundCoinsResolver(unfoundItems);
            const userSliderCoinsData = [...coinsData, ...unfoundCoinsFromApi];
            return userSliderCoinsData;
        }
    };

    const unfoundCoinsResolver = async (unfoundItems: string[]) => {
        try {
            const unfoundCoinsPromise = await getSliderCoinsData(activeCurrency, unfoundItems);
            const data: ICoinListData[] = unfoundCoinsPromise.data;
            return data;
        } catch (error) {
            return [];
        }
    };

    return sliderCoinsData;
};

export const transformCryptocurrencySliderData = (item: ICoinListData) => {
    const symbolInUpper = item.symbol.toUpperCase();

    //24h
    let isChange24hRisingValue: boolean;

    if (item.price_change_percentage_24h_in_currency < 0) {
        isChange24hRisingValue = false;
    } else {
        isChange24hRisingValue = true;
    }

    const priceChangePercentage24hNumber = Math.abs(item.price_change_percentage_24h_in_currency);
    const priceChangePercentage24hRounded = priceChangePercentage24hNumber.toFixed(2);

    //7d
    let isChange7dRisingValue: boolean;

    if (item.price_change_percentage_7d_in_currency < 0) {
        isChange7dRisingValue = false;
    } else {
        isChange7dRisingValue = true;
    }

    const priceChangePercentage7dNumber = Math.abs(item.price_change_percentage_7d_in_currency);
    const priceChangePercentage7dRounded = priceChangePercentage7dNumber.toFixed(2);

    //30d
    let isChange30dRisingValue: boolean;

    if (item.price_change_percentage_30d_in_currency < 0) {
        isChange30dRisingValue = false;
    } else {
        isChange30dRisingValue = true;
    }

    const priceChangePercentage30dNumber = Math.abs(item.price_change_percentage_30d_in_currency);
    const priceChangePercentage30dRounded = priceChangePercentage30dNumber.toFixed(2);

    const data = {
        symbolInUpper,
        isChange24hRisingValue,
        priceChangePercentage24hRounded,
        isChange7dRisingValue,
        priceChangePercentage7dRounded,
        isChange30dRisingValue,
        priceChangePercentage30dRounded
    };

    return data;
};
