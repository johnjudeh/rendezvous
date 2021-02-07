import { AddressComponent } from 'react-native-google-places-autocomplete';
import { LatLng } from 'react-native-maps';
import { LatLngShort } from 'common/types';

export function getAdressFromGooglePlaceDetails(addressComponents: AddressComponent[]): string {
    // TODO: Move to constants?
    const addresTypes = ['premise', 'street_number', 'route', 'neighborhood'];

    const address: string = addressComponents.reduce((address, addressComponent, i) => {
        const separator = i === 0 ? '' : ' ';
        return addressComponent.types.some(type => addresTypes.includes(type))
            ? `${address}${separator}${addressComponent.long_name}`
            : address;
    }, '');

    return address;
}

export function getPostcodeFromGooglePlaceDetails(addressComponents: AddressComponent[]): string | undefined {
    const postcode: string | undefined = addressComponents.find(addressComponent => {
        return addressComponent.types.includes('postal_code');
    })?.long_name;

    return postcode;
}

export function formatAddress(address: string, maxLength: number): string {
    const separator = ' ';
    const elipsis = '...';
    let formattedAddress: string = address;

    if (address.length > maxLength) {
        formattedAddress = '';
        const addressComponents: string[] = address.split(separator);

        for (let comp of addressComponents) {
            if (formattedAddress.length + comp.length > maxLength) {
                formattedAddress = formattedAddress.trim();
                formattedAddress += elipsis;
                break;
            }
            formattedAddress += comp + separator;
        }
    }

    return formattedAddress.trim();
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

export function latLngToString(latLng: LatLng): string {
    const { latitude, longitude } = latLng;
    return `${latitude},${longitude}`;
}

export function convertLatLngShortToLong(latLng: LatLngShort): LatLng {
    return {
        latitude: latLng.lat,
        longitude: latLng.lng,
    }
}
