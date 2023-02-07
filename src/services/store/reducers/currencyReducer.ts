interface ICurrencyAction {
    type: string;
    payload?: any;
}

export const CHANGE_ACTIVE_CURRENCY = 'CHANGE_ACTIVE_CURRENCY';

const defaultState = {
    activeCurrency: localStorage.getItem('activeCurrency')
};

export const currencyReducer = (state = defaultState, action: ICurrencyAction) => {
    switch (action.type) {
        case CHANGE_ACTIVE_CURRENCY:
            return { ...state, activeCurrency: action.payload };

        default:
            return state;
    }
};
