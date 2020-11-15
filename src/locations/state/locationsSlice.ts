import { Action, createSlice, CreateSliceOptions, PayloadAction, ThunkAction } from '@reduxjs/toolkit';
import * as Segment from 'expo-analytics-segment';
import { LocationData } from 'common/types';

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
        removeAll: state => {
            Object.keys(state).forEach(id => {
                delete state[id];
            });
        },
    },
};

export const slice = createSlice(sliceObject);
export const { add, remove, removeAll } = slice.actions;

export const selectLocationsDict: (state: State) => LocationSlice = state => state.locations;
export const selectLocations: (state: State) => LocationData[] = state => Object.values(state.locations);

export const handleAdd = (location: LocationData): LocationsThunkAction => dispatch => {
    Segment.trackWithProperties('Add location', {
        location,
    });
    dispatch(add(location));
};

export const handleRemove = (id: string): LocationsThunkAction => (dispatch, getState) => {
    const locationsDict = selectLocationsDict(getState());
    Segment.trackWithProperties('Remove location', {
        location: locationsDict[id],
    });
    dispatch(remove(id));
};

export const handleRemoveAll = (): LocationsThunkAction => (dispatch, getState) => {
    const locations = selectLocations(getState());
    Segment.trackWithProperties('Remove all locations', {
        locations,
    });
    dispatch(removeAll());
};


export default slice.reducer;
