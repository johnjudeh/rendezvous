import { createSlice, CreateSliceOptions, PayloadAction } from '@reduxjs/toolkit';
import { PlaceType, Result as GooglePlacesResult } from 'common/clients/googlePlaces';
import { Dictionary } from 'common/types';

interface Category {
    [place_id: string]: GooglePlacesResult,
};

// TODO: Update interface definition to be DRY with syntax like: { [key: PlaceType]: Category }
// Read Typescript issue: https://github.com/microsoft/TypeScript/issues/5683
interface CategorySlice {
    restaurant: Category,
    bar: Category,
    cafe: Category,
    museum: Category,
    park: Category,
}

interface State {
    categories: CategorySlice,
}

export interface SetActionPayload {
    category: PlaceType,
    places: GooglePlacesResult[],
}

const sliceObject: CreateSliceOptions<CategorySlice> = {
    name: 'categories',
    initialState: {
        restaurant: {},
        bar: {},
        cafe: {},
        museum: {},
        park: {},
    },
    reducers: {
        set: (state, action: PayloadAction<SetActionPayload>) => {
            const { category, places } = action.payload;
            const placesDict: Dictionary<GooglePlacesResult> = {};

            for (const p of places) {
                placesDict[p.place_id] = p;
            }

            state[category] = placesDict;
        },
    },
};

// TODO: Checkout best practices on how to write this type of dynamic selector
export const selectCategoryResultsCreator = (category: PlaceType) => (state: State): Category => state.categories[category];

export const slice = createSlice(sliceObject);
export const { set } = slice.actions;
export default slice.reducer;
