import { AddressComponent } from 'react-native-google-places-autocomplete';

export function getAdressFromGooglePlaceDetails(addressComponents: AddressComponent[]): string {
    const addresTypes = ['premise', 'street_number', 'route'];

    const address: string = addressComponents.reduce((address, addressComponent) => {
        return addressComponent.types.some(type => addresTypes.includes(type))
            ? `${address} ${addressComponent.long_name}`
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
