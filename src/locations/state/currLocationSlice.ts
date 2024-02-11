import { Action, createSlice, CreateSliceOptions, PayloadAction, ThunkAction } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import { LatLng } from 'react-native-maps';

type CurrentLocation = LatLng | null;

type CurrLocationThunkAction = ThunkAction<void, RootState, undefined, Action<string>>;

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

export const selectCurrLocation = (state: RootState) => state.currLocation;

export const handleSet = (location: LatLng): CurrLocationThunkAction => dispatch => {
    dispatch(set(location));
};

export default slice.reducer;
