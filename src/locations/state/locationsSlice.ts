import { Action, createSlice, CreateSliceOptions, PayloadAction, ThunkAction, createSelector } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import { LocationData } from 'locations/types';

interface LocationSlice {
    [id: string]: LocationData,
}

type LocationsThunkAction = ThunkAction<void, RootState, undefined, Action<string>>;

const sliceObject: CreateSliceOptions<LocationSlice> = {
    name: 'locations',
    initialState: {},
    reducers: {
        add: (state, action: PayloadAction<LocationData>) => {
            state[action.payload.id] = action.payload;
        },
        remove: (state, action: PayloadAction<string>) => {
            delete state[action.payload];
        },
        removeAllExcept: (state, action: PayloadAction<number>) => {
            Object.keys(state).forEach((id, i) => {
                const lastIndexToKeep = action.payload - 1;
                if (i > lastIndexToKeep) delete state[id];
            });
        },
    },
};

export const slice = createSlice(sliceObject);
export const { add, remove, removeAllExcept } = slice.actions;

export const selectLocationsDict: (state: RootState) => LocationSlice = state => state.locations;
export const selectLocations = createSelector(selectLocationsDict, locations => Object.values(locations));

export const handleAdd = (location: LocationData): LocationsThunkAction => dispatch => {
    dispatch(add(location));
};

export const handleRemove = (id: string): LocationsThunkAction => dispatch => {
    dispatch(remove(id));
};

export const handleRemoveAllExcept = (numToKeep: number): LocationsThunkAction => dispatch => {
    dispatch(removeAllExcept(numToKeep));
};

export const handleRemoveAll = () => handleRemoveAllExcept(0);

export default slice.reducer;
