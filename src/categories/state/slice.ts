import { createSlice, CreateSliceOptions, PayloadAction } from '@reduxjs/toolkit';
import { LatLng } from 'react-native-maps';
import { PlaceType, Result as GooglePlacesResult, Photo } from 'common/clients/googlePlaces';

interface EnrichedPhoto extends Photo {
    photo_data_url?: string,
}

export interface CategoryResult extends GooglePlacesResult {
    photos?: EnrichedPhoto[],
}

interface CategoryResults {
    [place_id: string]: CategoryResult,
};

interface Category {
    center: LatLng,
    radius: number,
    results: CategoryResults,
}

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
    categoryName: PlaceType,
    category: Category,
}

export interface SetPlacePhotoActionPaylod {
    categoryName: PlaceType,
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
            const { categoryName, category } = action.payload;
            state[categoryName] = category;
        },
        setPlacePhoto: (state, action: PayloadAction<SetPlacePhotoActionPaylod>) => {
            const { categoryName, placeId, photoRef, photoDataURL } = action.payload;
            const place = state[categoryName]?.results?.[placeId];
            place?.photos?.forEach(photo => {
                if (photo.photo_reference === photoRef) {
                    photo.photo_data_url = photoDataURL;
                }
            })
        }
    },
};

// TODO: Checkout best practices on how to write this type of dynamic selector
export const selectCategoryCreator = (category: PlaceType) => (state: State): CategoryOrNull => state.categories[category];

export const slice = createSlice(sliceObject);
export const { set, setPlacePhoto } = slice.actions;
export default slice.reducer;
