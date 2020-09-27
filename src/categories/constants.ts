import { PlaceType } from 'common/clients/googlePlaces';
import { Dictionary } from 'common/types';
import { ImageSourcePropType } from 'react-native';

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

export const CATEGORY_PHOTOS: Dictionary<ImageSourcePropType> = {
    [CATEGORY_RESTAURANT]: require('./img/restaurant.jpg'),
    [CATEGORY_BAR]: require('./img/bar.jpg'),
    [CATEGORY_CAFE]: require('./img/cafe.jpg'),
    [CATEGORY_MUSEUM]: require('./img/museum.jpg'),
    [CATEGORY_PARK]: require('./img/park.jpg'),
}