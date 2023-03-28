interface ICurrencyAction {
    type: string;
    payload?: any;
}

const getActiveCurrencyFromLocalStorage = () => {
    const activeCurrencyGet = localStorage.getItem('activeCurrency');

    if (activeCurrencyGet) {
        const activeCurrency: string = activeCurrencyGet;
        return activeCurrency;
    } else {
        const activeCurrency = 'usd';
        return activeCurrency;
    }
};

export const CHANGE_ACTIVE_CURRENCY = 'CHANGE_ACTIVE_CURRENCY';

const defaultState = {
    activeCurrency: getActiveCurrencyFromLocalStorage()
};

export const currencyReducer = (state = defaultState, action: ICurrencyAction) => {
    switch (action.type) {
        case CHANGE_ACTIVE_CURRENCY:
            return { ...state, activeCurrency: action.payload };

        default:
            return state;
    }
};
