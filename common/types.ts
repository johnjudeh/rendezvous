import { ReactElement } from 'react';

export interface NavigationProps {
    navigation: {
        navigate: (route: string, params?: Object) => void,
        goBack: () => void,
    }
}

export interface ButtonProps {
    onPress: () => void,
}

export interface ChildrenProps {
    children: ReactElement | ReactElement[],
}
