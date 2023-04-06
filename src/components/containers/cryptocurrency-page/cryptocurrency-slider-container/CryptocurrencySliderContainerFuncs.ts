import { ICoinListData } from '../../../../configs/interfaces/CryptocurrencyPageInterfaces';

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
