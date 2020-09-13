import { createSlice } from '@reduxjs/toolkit';

export const slice = createSlice({
    name: 'locations',
    initialState: [],
    reducers: {
        add: (state, action) => {
            state.push(action.payload);
        },
    },
});

export default slice.reducer;
