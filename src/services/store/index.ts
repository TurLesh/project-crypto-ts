import { configureStore } from '@reduxjs/toolkit';
import { currencyReducer } from './reducers/currencyReducer';
import { chartTypeReducer } from './reducers/chartTypeReducer';
import { showRowsReducer } from './reducers/showRowsReducer';
import { categoriesReducer } from './reducers/categoriesReducer';
import { userReducer } from './reducers/userReducer';

export const store = configureStore({
    reducer: {
        currency: currencyReducer,
        chartType: chartTypeReducer,
        rowsAmount: showRowsReducer,
        selectedCategory: categoriesReducer,
        user: userReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
