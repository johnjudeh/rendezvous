import { configureStore } from '@reduxjs/toolkit';
import { currLocationReducer, locationsReducer } from 'locations/state';
import { reducer as categoriesReducer } from 'categories/state';
import { appStateReducer } from 'common/state';

const store = configureStore({
    reducer: {
        appState: appStateReducer,
        currLocation: currLocationReducer,
        locations: locationsReducer,
        categories: categoriesReducer,
    }
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
