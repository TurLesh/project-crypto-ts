interface IChartTypeAction {
    type: string;
    payload?: any;
}

export const CHANGE_CHART_TYPE = 'CHANGE_CHART_TYPE';

const defaultState = {
    selectedChartType: 'line'
};

export const chartTypeReducer = (state = defaultState, action: IChartTypeAction) => {
    switch (action.type) {
        case CHANGE_CHART_TYPE:
            return { ...state, selectedChartType: action.payload };

        default:
            return state;
    }
};
