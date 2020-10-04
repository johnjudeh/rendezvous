import { configureStore } from '@reduxjs/toolkit';
import { currLocationReducer, locationsReducer } from 'locations/state';
import { reducer as categoriesReducer } from 'categories/state';

export default configureStore({
    reducer: {
        currLocation: currLocationReducer,
        locations: locationsReducer,
        categories: categoriesReducer,
    }
});
