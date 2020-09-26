import { configureStore } from '@reduxjs/toolkit';
import { reducer as locationsReducer } from 'locations/state';
import { reducer as categoriesReducer } from 'categories/state';

export default configureStore({
    reducer: {
        locations: locationsReducer,
        categories: categoriesReducer,
    }
});
