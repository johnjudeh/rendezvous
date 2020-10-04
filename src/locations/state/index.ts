export {
    default as locationsReducer,
    add as addLocation,
    remove as removeLocation,
    removeAll as removeAllLocations,
    selectLocations,
} from './locationsSlice';
export {
    default as currLocationReducer,
    set as setCurrLocation,
    selectCurrLocation,
} from './currLocationSlice';