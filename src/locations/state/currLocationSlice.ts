import { Action, createSlice, CreateSliceOptions, PayloadAction, ThunkAction } from '@reduxjs/toolkit';
import * as Segment from 'expo-analytics-segment';
import { LatLng } from 'react-native-maps';

type CurrentLocation = LatLng | null;

interface State {
    currLocation: CurrentLocation,
}

type CurrLocationThunkAction = ThunkAction<void, State, undefined, Action<string>>;

const sliceObject: CreateSliceOptions<CurrentLocation> = {
    name: 'currLocation',
    initialState: null,
    reducers: {
        set: (state, action: PayloadAction<LatLng>) => {
            return action.payload;
        },
    }

};

export const slice = createSlice(sliceObject);
export const { set } = slice.actions;

export const selectCurrLocation = (state: State) => state.currLocation;

export const handleSet = (location: LatLng, country: string = ""): CurrLocationThunkAction => dispatch => {
    Segment.trackWithProperties('Current location set', {
        country,
    });
    dispatch(set(location));
};

export default slice.reducer;
