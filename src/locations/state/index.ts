export {
    default as locationsReducer,
    handleAdd as addLocation,
    handleRemove as removeLocation,
    handleRemoveAllExcept as removeAllLocationsExcept,
    handleRemoveAll as removeAllLocations,
    selectLocations,
    selectLocationsDict,
} from './locationsSlice';
export {
    default as currLocationReducer,
    handleSet as setCurrLocation,
    selectCurrLocation,
} from './currLocationSlice';