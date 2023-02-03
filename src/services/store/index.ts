import { configureStore } from '@reduxjs/toolkit';
import { currencyReducer } from './currencyReducer';
import { chartTypeReducer } from './chartTypeReducer';
import { showRowsReducer } from './showRowsReducer';
import { categoriesReducer } from './categoriesReducer';

export const store = configureStore({
    reducer: {
        currency: currencyReducer,
        chartType: chartTypeReducer,
        rowsAmount: showRowsReducer,
        selectedCategory: categoriesReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
