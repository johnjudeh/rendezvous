import { createSlice, CreateSliceOptions, PayloadAction } from '@reduxjs/toolkit';
import { LatLng } from 'react-native-maps';

type CurrentLocation = LatLng | null;

interface State {
    currLocation: CurrentLocation,
}

const sliceObject: CreateSliceOptions<CurrentLocation> = {
    name: 'currLocation',
    initialState: null,
    reducers: {
        set: (state, action: PayloadAction<LatLng>) => {
            return action.payload;
        },
    }

};

export const selectCurrLocation = (state: State) => state.currLocation;

export const slice = createSlice(sliceObject);
export const { set } = slice.actions;
export default slice.reducer;
