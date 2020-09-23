import { LatLng } from 'react-native-maps';
import { Language } from 'react-native-google-places-autocomplete';

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

type PriceLevel = 0 | 1 | 2 | 3 | 4;

interface QueryParams {
    key: string,
    location: string,
    radius: number,
    keyword?: string,
    language?: Language,
    minprice?: PriceLevel,
    maxprice?: PriceLevel,
    opennow?: boolean,
    rankby?: 'prominence' | 'distance',
    type?: PlaceType,
    pagetoken?: string,
}

interface LatLngShort {
    lat: number,
    lng: number,
}

interface Result {
    place_id: string,
    name: string,
    business_status: string,
    geometry: {
        location: LatLngShort,
        viewport: {
            northeast: LatLngShort,
            southwest: LatLngShort,
        }
    },
    icon: string,
    price_level: PriceLevel,
    rating: number,
    types: string[],
    user_ratings_total: number,
    vicinity: string,
}

interface Response {
    status: StatusCode,
    results: Result[],
    html_attributions: [],
    next_page_token: string,
}

export class Client {
    static BASE_URL: string = 'https://maps.googleapis.com/maps/api/place';
    static OUTPUT_TYPE: OutputType = 'json';

    private apiKey: string;

    constructor(key: string) {
        this.apiKey = key;
    }

    static getUrl(path: string): string {
        return `${Client.BASE_URL}${path}`;
    }

    static latLngToString(latLng: LatLng): string {
        const { latitude, longitude } = latLng;
        return `${latitude},${longitude}`;
    }

    async nearbySearch(location: LatLng, radius: number, type?: PlaceType, openNow: boolean = true): Promise<Result[]> {
        const path: string = `/nearbysearch/${Client.OUTPUT_TYPE}`;
        const queryParams: QueryParams = {
            key: this.apiKey,
            location: Client.latLngToString(location),
            radius,
            opennow: openNow,
        };

        if (type !== undefined) {
            queryParams.type = type;
        }

        let url = Client.getUrl(path) + '?';

        let q: keyof typeof queryParams;
        for (q in queryParams) {
            url += `${q}=${queryParams[q]}&`;
        }
        url = url.slice(0, -1);

        try {
            const res = await fetch(url);
            const json: Response = await res.json();

            if (!res.ok || json.status !== 'OK') {
                throw new Error(
                    `API responded with HTTP status code of ${res.status}. GooglePlaces status of ${json.status}. Response message: ${JSON.stringify(json, undefined, 2)}`
                );
            }

            return json.results;

        } catch (err) {
            // TODO: Do something more sophistcated with the error.
            console.error(err);
            return [];
        }
    }
}

export default new Client('***REMOVED***');
