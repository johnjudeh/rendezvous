import * as Location from 'expo-location';

export function requestLocation() {
    Location.requestForegroundPermissionsAsync();
}