import { createSlice, CreateSliceOptions, PayloadAction } from '@reduxjs/toolkit';
import { PlaceType, Result as GooglePlacesResult, Photo } from 'common/clients/googlePlaces';
import { Dictionary } from 'common/types';

interface EnrichedPhoto extends Photo {
    photo_data_url?: string,
}

interface CategoryResult extends GooglePlacesResult {
    photos?: EnrichedPhoto[],
}

interface Category {
    [place_id: string]: CategoryResult,
};

type CategoryOrNull = Category | null;

// TODO: Update interface definition to be DRY with syntax like: { [key: PlaceType]: Category }
// Read Typescript issue: https://github.com/microsoft/TypeScript/issues/5683
interface CategorySlice {
    restaurant: CategoryOrNull,
    bar: CategoryOrNull,
    cafe: CategoryOrNull,
    museum: CategoryOrNull,
    park: CategoryOrNull,
}

interface State {
    categories: CategorySlice,
}

export interface SetActionPayload {
    category: PlaceType,
    places: GooglePlacesResult[],
}

export interface SetPlacePhotoActionPaylod {
    category: PlaceType,
    placeId: string,
    photoRef: string,
    photoDataURL: string,
}

const sliceObject: CreateSliceOptions<CategorySlice> = {
    name: 'categories',
    initialState: {
        restaurant: null,
        bar: null,
        cafe: null,
        museum: null,
        park: null,
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
        setPlacePhoto: (state, action: PayloadAction<SetPlacePhotoActionPaylod>) => {
            const { category, placeId, photoRef, photoDataURL } = action.payload;
            const place = state[category]?.[placeId];
            place?.photos?.forEach(photo => {
                if (photo.photo_reference === photoRef) {
                    photo.photo_data_url = photoDataURL;
                }
            })
        }
    },
};

// TODO: Checkout best practices on how to write this type of dynamic selector
export const selectCategoryResultsCreator = (category: PlaceType) => (state: State): CategoryOrNull => state.categories[category];

export const slice = createSlice(sliceObject);
export const { set, setPlacePhoto } = slice.actions;
export default slice.reducer;
