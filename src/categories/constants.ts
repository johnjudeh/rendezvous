import { PlaceType } from 'common/clients/googlePlaces';
import { Dictionary } from 'common/types';

export const CATEGORY_RESTAURANT: PlaceType = 'restaurant';
export const CATEGORY_BAR: PlaceType = 'bar';
export const CATEGORY_CAFE: PlaceType = 'cafe';
export const CATEGORY_MUSEUM: PlaceType = 'museum';
export const CATEGORY_PARK: PlaceType = 'park';

export const CATEGORY_LABELS: Dictionary<string> = {
    [CATEGORY_RESTAURANT]: 'Restaurants',
    [CATEGORY_BAR]: 'Bars',
    [CATEGORY_CAFE]: 'Cafés',
    [CATEGORY_MUSEUM]: 'Museums',
    [CATEGORY_PARK]: 'Parks',
}