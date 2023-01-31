interface IRowsAmountAction {
    type: string;
    payload?: any;
}

export const CHANGE_ROWS_AMOUNT = 'CHANGE_ROWS_AMOUNT';

const defaultState = {
    rowsAmount: 20
};

export const showRowsReducer = (state = defaultState, action: IRowsAmountAction) => {
    switch (action.type) {
        case CHANGE_ROWS_AMOUNT:
            return { ...state, rowsAmount: action.payload };

        default:
            return state;
    }
};
