import { Action, createSlice, CreateSliceOptions, PayloadAction, ThunkAction } from '@reduxjs/toolkit';
import * as Segment from 'expo-analytics-segment';
import { LocationData } from 'locations/types';

interface LocationSlice {
    [id: string]: LocationData,
}

interface State {
    locations: LocationSlice;
}

type LocationsThunkAction = ThunkAction<void, State, undefined, Action<string>>;

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

export const selectLocationsDict: (state: State) => LocationSlice = state => state.locations;
export const selectLocations: (state: State) => LocationData[] = state => Object.values(state.locations);

export const handleAdd = (location: LocationData): LocationsThunkAction => (dispatch, getState) => {
    const locations = selectLocations(getState());
    Segment.trackWithProperties('Add location', {
        numOfLocations: locations.length,
    });
    dispatch(add(location));
};

export const handleRemove = (id: string): LocationsThunkAction => (dispatch, getState) => {
    const locations = selectLocations(getState());
    Segment.trackWithProperties('Remove location', {
        numOfLocations: locations.length,
    });
    dispatch(remove(id));
};

export const handleRemoveAllExcept = (numToKeep: number): LocationsThunkAction => (dispatch, getState) => {
    const locations = selectLocations(getState());
    Segment.trackWithProperties('Remove all locations except', {
        numOfLocations: locations.length,
        numToKeep,
    });
    dispatch(removeAllExcept(numToKeep));
};

export const handleRemoveAll = () => handleRemoveAllExcept(0);

export default slice.reducer;
