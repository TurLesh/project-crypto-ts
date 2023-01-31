import { configureStore } from '@reduxjs/toolkit';
import { currencyReducer } from './currencyReducer';
import { chartTypeReducer } from './chartTypeReducer';

export const store = configureStore({
    reducer: {
        currency: currencyReducer,
        chartType: chartTypeReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
