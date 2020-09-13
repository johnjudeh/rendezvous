import { configureStore } from '@reduxjs/toolkit';
import { reducer as locationsReducer } from 'locations/state';

export default configureStore({
    reducer: {
        locations: locationsReducer,
    }
});
