import { createSlice, CreateSliceOptions, PayloadAction } from '@reduxjs/toolkit';
import { LocationData } from 'common/types';

interface LocationSlice {
    [id: string]: LocationData,
}

interface State {
    locations: LocationSlice;
}

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

export const selectLocations: (state: State) => LocationData[] = state => Object.values(state.locations);

export default slice.reducer;
