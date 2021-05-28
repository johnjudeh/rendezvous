import { configureStore } from '@reduxjs/toolkit';
import { currLocationReducer, locationsReducer } from 'locations/state';
import { reducer as categoriesReducer } from 'categories/state';
import { appStateReducer } from 'common/state';

export default configureStore({
    reducer: {
        appState: appStateReducer,
        currLocation: currLocationReducer,
        locations: locationsReducer,
        categories: categoriesReducer,
    }
});
