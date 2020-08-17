import { ReactElement } from 'react';
import { NativeSyntheticEvent, NativeTouchEvent } from 'react-native';

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
