import { Platform } from 'react-native';
import { modelId } from 'expo-device';

type Device = 'iPad' | 'iPhone' | undefined;

export function appleDeviceHasDockBar(): boolean {
    const DEVICE_REGEX: RegExp = /(iPad|iPhone)(\d+),(\d+)/;

    if (Platform.OS === 'android' || !DEVICE_REGEX.test(modelId)) {
        return false;
    }

    const match = DEVICE_REGEX.exec(modelId);
    const device: Device = match?.[1] as Device;
    const major: string | undefined = match?.[2];
    const minor: string | undefined = match?.[3];

    switch (device) {
        case 'iPhone':
            if (Number(major) >= 11 && Number(minor) < 8) {
                return true;
            }
            return false;

        case 'iPad':
            if (Number(major) >= 8) {
                return true;
            }
            return false;

        default:
            return false;
    }
}