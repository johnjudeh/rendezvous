import { AppStateStatus } from 'react-native';
import { RootState } from 'app/store';
import { createSlice, CreateSliceOptions, PayloadAction } from "@reduxjs/toolkit";

const sliceObject: CreateSliceOptions<AppStateStatus> = {
    name: 'appState',
    initialState: 'active',
    reducers: {
        set: (state, action: PayloadAction<AppStateStatus>) => {
            return action.payload;
        }
    },
}

const slice = createSlice(sliceObject);
export const { set } = slice.actions;

export const selectAppState = (state: RootState) => state.appState;

export default slice.reducer;
