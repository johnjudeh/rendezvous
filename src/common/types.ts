import { ReactElement } from 'react';

export interface NavigationProps {
    navigation: {
        navigate: (route: string, params?: Object) => void,
        goBack: () => void,
        toggleDrawer: () => void,
    },
    route: {
        params?: {
            [index: string]: any,
        },
    }
}

export interface ChildrenProps {
    children: ReactElement | ReactElement[] | null,
}

export interface UniqueObject {
    id: string,
}

export interface Dictionary<T> {
    [key: string]: T,
}
