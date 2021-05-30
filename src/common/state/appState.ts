import { AppStateStatus } from 'react-native';
import { createSlice, CreateSliceOptions, PayloadAction } from "@reduxjs/toolkit";

interface State {
    appState: AppStateStatus
}

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

export const selectAppState = (state: State) => state.appState;

export default slice.reducer;
