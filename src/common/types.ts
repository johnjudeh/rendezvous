import { ReactElement } from 'react';
import { NativeSyntheticEvent, NativeTouchEvent } from 'react-native';
import { LatLng } from 'react-native-maps';

export interface NavigationProps {
    navigation: {
        navigate: (route: string, params?: Object) => void,
        goBack: () => void,
    },
    route: {
        params?: {
            [index: string]: any,
        },
    }
}

export interface ButtonProps {
    onPress: (ev: NativeSyntheticEvent<NativeTouchEvent>) => void,
}

export interface ChildrenProps {
    children: ReactElement | ReactElement[] | null,
}

export interface UniqueObject {
    id: string,
}

export interface LocationData extends UniqueObject {
    address: string,
    postcode: string,
    latLng: LatLng,
}
