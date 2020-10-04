import { LatLng } from 'react-native-maps';
import { Language } from 'react-native-google-places-autocomplete';
import { latLngToString } from 'locations/utils';

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

interface NearbySearchQueryParams {
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

interface PlacePhotoQueryParams {
    key: string,
    photoreference: string,
    maxheight?: number,
    maxwidth?: number,
}

interface LatLngShort {
    lat: number,
    lng: number,
}

export interface Photo {
    photo_reference: string,
    height: number,
    width: number,
    html_attributions: string[],
}

export interface Result {
    place_id: string,
    name: string,
    geometry: {
        location: LatLngShort,
        viewport?: {
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
    opening_hours: {
        open_now?: Boolean,
    },
    photos?: Photo[],
    business_status?: BusinessStatus,
    permanently_closed?: Boolean,
}

interface Response {
    status: StatusCode,
    results: Result[],
    html_attributions: [],
    next_page_token?: string,
    error_message?: string,
}

export class Client {
    static BASE_URL: string = 'https://maps.googleapis.com/maps/api/place';
    static OUTPUT_TYPE: OutputType = 'json';
    static ALLOWED_STATUSES: StatusCode[] = ['OK', 'ZERO_RESULTS'];

    private apiKey: string;

    constructor(key: string) {
        this.apiKey = key;
    }

    static getUrl(path: string): string {
        return `${Client.BASE_URL}${path}`;
    }

    static addQueryToUrl(baseUrl: string, queryParams: { [key: string]: any }): string {
        let newUrl: string = `${baseUrl}?`;

        for (let q of Object.keys(queryParams)) {
            newUrl += `${q}=${queryParams[q]}&`;
        }
        newUrl = newUrl.slice(0, -1);

        return newUrl;
    }

    async nearbySearch(location: LatLng, radius: number, type?: PlaceType, openNow: boolean = true): Promise<Result[]> {
        const path: string = `/nearbysearch/${Client.OUTPUT_TYPE}`;
        const queryParams: NearbySearchQueryParams = {
            key: this.apiKey,
            location: latLngToString(location),
            radius,
            opennow: openNow,
        };

        if (type) {
            queryParams.type = type;
        }

        const url = Client.addQueryToUrl(Client.getUrl(path), queryParams);

        try {
            const res = await fetch(url);
            const json: Response = await res.json();

            if (!res.ok || !Client.ALLOWED_STATUSES.includes(json.status)) {
                throw new Error(
                    `API responded with HTTP status code of ${res.status}. GooglePlaces status of ${json.status} with message ${json.error_message}. Response message: ${JSON.stringify(json, undefined, 2)}`
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
        const path: string = '/photo';
        const queryParams: PlacePhotoQueryParams = {
            key: this.apiKey,
            photoreference: photoRef,
        };

        if (maxHeight) {
            queryParams.maxheight = maxHeight;
        }
        if (maxWidth) {
            queryParams.maxwidth = maxWidth;
        }

        const url = Client.addQueryToUrl(Client.getUrl(path), queryParams);

        try {
            const res = await fetch(url);
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
}

export default new Client('***REMOVED***');
