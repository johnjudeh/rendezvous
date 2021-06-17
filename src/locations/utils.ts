import { AddressComponent } from 'react-native-google-places-autocomplete';
import { LatLng } from 'react-native-maps';
import { LatLngShort } from 'locations/types';

export function getPostcodeFromGoogleAddressComponents(addressComponents: AddressComponent[]): string | undefined {
    const postcode: string | undefined = addressComponents.find(addressComponent => {
        return addressComponent.types.includes('postal_code');
    })?.long_name;

    return postcode;
}

export function getCountryFromGoogleAddressComponents(addressComponents: AddressComponent[]): string | undefined {
    const country: string | undefined = addressComponents.find(addressComponent => {
        return addressComponent.types.includes('country');
    })?.short_name;

    return country;
}

export function formatAddress(address: string, maxLength: number): string {
    const elipsis = '...';
    return address.length > maxLength
        ? address.slice(0, maxLength) + elipsis
        : address;
}

export function calculateCenter(coordinates: LatLng[]): LatLng {
    const coordinateLngs = coordinates.map(coords => coords.longitude);
    const coordinateLats = coordinates.map(coords => coords.latitude);

    const max = (a: number, b: number): number => b > a ? b : a;
    const min = (a: number, b: number): number => b < a ? b : a;

    const calculateMiddle = (nums: number[]): number => {
        const minNum = nums.reduce(min);
        const maxNum = nums.reduce(max);
        return minNum + (maxNum - minNum) / 2
    }

    return {
        longitude: calculateMiddle(coordinateLngs),
        latitude: calculateMiddle(coordinateLats),
    }
}

export function calculateDistance(pointA: LatLng, pointB: LatLng): number {
    /* Calculates the metre distance between 2 sets of latLng coordinates.

    This uses the *haversine* formula to calculate the great-circule distance
    between 2 points - i.e. the shortest distance over the earth's surface. It
    assumes a spherical earth and ignores changes in altitude at different
    points.

    The formula is as follows:

        a = sin²(Δφ/2) + cos φ1 ⋅ cos φ2 ⋅ sin²(Δλ/2)
        c = 2 ⋅ atan2( √a, √(1−a) )
        d = R ⋅ c

    where:

        φ is latitude, λ is longitude, R is earth’s radius (mean radius = 6,371km);
        note that angles need to be in radians to pass to trig functions!

    Source: https://www.movable-type.co.uk/scripts/latlong.html
     */
    const lat1 = pointA.latitude;
    const lon1 = pointA.longitude;

    const lat2 = pointB.latitude;
    const lon2 = pointB.longitude;

    const coordToRadians = (coord: number): number => coord * Math.PI / 180;

    const R = 6371e3; // radius of earth in metres
    const φ1 = coordToRadians(lat1); // φ1 in radians
    const φ2 = coordToRadians(lat2); // φ2 in radians
    const Δφ = coordToRadians(lat2 - lat1); // Δφ in radians
    const Δλ = coordToRadians(lon2 - lon1); // Δλ in radians

    const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
        Math.cos(φ1) * Math.cos(φ2) *
        Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const d = R * c; // in metres

    return d;
}

export function averageDistanceFromPoint(fromPoints: LatLng[], toPoint: LatLng) {
    const distances = fromPoints.map(fromPoint => calculateDistance(fromPoint, toPoint));

    const sum = (accumulator: number, currentVal: number) => accumulator + currentVal;
    const averageDistance = Math.round(distances.reduce(sum) / distances.length);

    return averageDistance;
}

export function latLngToString(latLng: LatLng): string {
    const { latitude, longitude } = latLng;
    return `${latitude},${longitude}`;
}

export function latLngShortToLatLng(latLng: LatLngShort): LatLng {
    return {
        latitude: latLng.lat,
        longitude: latLng.lng,
    }
}
