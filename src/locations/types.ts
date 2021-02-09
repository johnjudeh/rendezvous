import { LatLng } from 'react-native-maps';
import { UniqueObject } from 'common/types';

export interface LocationData extends UniqueObject {
    address: string,
    postcode: string,
    latLng: LatLng,
}

export interface LatLngShort {
    lat: number,
    lng: number,
}