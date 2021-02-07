import { LatLng } from 'react-native-maps';
import { latLngToString, convertLatLngShortToLong } from 'locations/utils';
import { LocationData, LatLngShort } from '../types';

type OutputType = 'json' | 'xml';

export type PlaceType =
    | 'restaurant'
    | 'bar'
    | 'cafe'
    | 'museum'
    | 'park';

type StatusCode =
    | 'OK'
    | 'ZERO_RESULTS'
    | 'OVER_QUERY_LIMIT'
    | 'REQUEST_DENIED'
    | 'INVALID_REQUEST'
    | 'UNKNOWN_ERROR';

type BusinessStatus =
    | 'OPERATIONAL'
    | 'CLOSED_TEMPORARILY'
    | 'CLOSED_PERMANENTLY';

enum PriceLevel {
    Free,
    Inexpensive,
    Moderate,
    Expensive,
    VeryExpensive,
};

export interface Photo {
    photo_reference: string,
    height: number,
    width: number,
    html_attributions: string[],
}

interface Geometry {
    location: LatLngShort,
    viewport?: {
        northeast: LatLngShort,
        southwest: LatLngShort,
    },
}

export interface PlacesResult {
    place_id: string,
    name: string,
    geometry: Geometry,
    icon: string,
    price_level: PriceLevel,
    rating: number,
    types: string[],
    user_ratings_total: number,
    vicinity: string,
    opening_hours: {
        open_now?: Boolean,
    },
    photos?: Photo[],
    business_status?: BusinessStatus,
    permanently_closed?: Boolean,
}

interface PlacesResponse {
    status: StatusCode,
    results: PlacesResult[],
    html_attributions: [],
    next_page_token?: string,
    error_message?: string,
}

interface AddressComponent {
    long_name: string,
    short_name: string,
    types: string[],
}

interface ReverseGeocodeResult {
    place_id: string,
    formatted_address: string,
    geometry: Geometry,
    types: string[],
    address_components: AddressComponent[],
}

interface ReverseGeocodeResponse {
    status: StatusCode,
    results: ReverseGeocodeResult[],
    error_message?: string,
}

export class Client {
    static BASE_URL: string = 'https://maps.googleapis.com/maps/api';
    static OUTPUT_TYPE: OutputType = 'json';
    static ALLOWED_STATUSES: StatusCode[] = ['OK', 'ZERO_RESULTS'];

    private apiKey: string;

    constructor(key: string) {
        this.apiKey = key;
    }

    async nearbySearch(location: LatLng, radius: number, type?: PlaceType, openNow: boolean = true): Promise<PlacesResult[]> {
        const path: string = `/place/nearbysearch/${Client.OUTPUT_TYPE}`;
        const url = new URL(path, Client.BASE_URL);
        const queryParams = url.searchParams;
        queryParams.append('key', this.apiKey);
        queryParams.append('location', latLngToString(location));
        queryParams.append('radius', String(radius));
        queryParams.append('opennow', String(openNow));

        if (type) {
            queryParams.append('type', type);
        }

        try {
            const res = await fetch(url.toString());
            if (!res.ok) {
                throw new Error(
                    `API responded with HTTP status code of ${res.status}`
                );
            }

            const json: PlacesResponse = await res.json();
            if (!Client.ALLOWED_STATUSES.includes(json.status)) {
                throw new Error(
                    `GooglePlaces status of ${json.status} with message ${json.error_message}. Response message: ${JSON.stringify(json, undefined, 2)}`
                );
            }

            return json.results;

        } catch (err) {
            // TODO: Do something more sophistcated with the error.
            console.error(err);
            return [];
        }
    }

    async placePhotoURL(photoRef: string, maxHeight?: number, maxWidth?: number): Promise<string | undefined> {
        const path: string = '/place/photo';
        const url = new URL(path, Client.BASE_URL);
        const queryParams = url.searchParams;
        queryParams.append('key', this.apiKey);
        queryParams.append('photoreference', photoRef);

        if (maxHeight) {
            queryParams.append('maxheight', String(maxHeight));
        }
        if (maxWidth) {
            queryParams.append('maxwidth', String(maxWidth));
        }

        try {
            const res = await fetch(url.toString());
            const photoBlob = await res.blob();

            const photoDataURI: string = await new Promise((resolve, reject) => {
                const fileReader = new FileReader();
                fileReader.onload = () => resolve(fileReader.result as string);
                fileReader.readAsDataURL(photoBlob);
            });

            return photoDataURI;

        } catch (err) {
            console.error(err);
        }
    }

    async reverseGeocode(LatLng: LatLng): Promise<LocationData | undefined> {
        const path: string = `/geocode/${Client.OUTPUT_TYPE}`;
        const url = new URL(path, Client.BASE_URL);
        const queryParams = url.searchParams;
        queryParams.append('key', this.apiKey);
        queryParams.append('latlng', latLngToString(LatLng));

        try {
            const res = await fetch(url.toString());
            if (!res.ok) {
                throw new Error(
                    `API responded with HTTP status code of ${res.status}`
                );
            }

            const json: ReverseGeocodeResponse = await res.json();
            if (!Client.ALLOWED_STATUSES.includes(json.status)) {
                throw new Error(
                    `GooglePlaces status of ${json.status} with message ${json.error_message}. Response message: ${JSON.stringify(json, undefined, 2)}`
                );
            }

            for (let result of json.results) {
                // Check for an appropriate result, once found go with that result regardless of other results
                if (result.types.includes('street_address') && result.place_id && result.geometry.location) {
                    const location: LocationData = {
                        id: result.place_id,
                        latLng: convertLatLngShortToLong(result.geometry.location),
                        address: result.formatted_address.split(',')[0],
                        postcode: '',
                    };

                    for (let addressComponent of result.address_components) {
                        if (addressComponent.types.includes('postal_code')) {
                            location.postcode = addressComponent.long_name;
                            break;
                        }
                    }

                    // Successfully created location, can safely return value
                    return location;
                }
            }

            // If this is reached, no suitable location was found
            throw new Error(`Location could not be extracted from the reverse geocoding API: ${JSON.stringify(json, undefined, 2)}`);

        } catch (err) {
            console.error(err);
        }
    }
}

export default new Client('***REMOVED***');
