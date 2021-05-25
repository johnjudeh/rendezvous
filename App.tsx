import React, { useEffect, useState } from 'react';
import { AppState, AppStateStatus } from 'react-native';
import { Provider } from 'react-redux';
import AppLoading from 'expo-app-loading';
import { getNetworkStateAsync, NetworkState } from 'expo-network';
import { useAssets } from 'expo-asset';
import {
    useFonts,
    Roboto_400Regular,
    Roboto_400Regular_Italic,
    Roboto_500Medium,
    Roboto_500Medium_Italic,
    Roboto_700Bold,
    Roboto_700Bold_Italic,
} from '@expo-google-fonts/roboto';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { AppContainer, store } from 'app';
import Toast from 'common/components/Toast';

function App() {
    const [ fontsLoaded ] = useFonts({
        Roboto_400Regular,
        Roboto_400Regular_Italic,
        Roboto_500Medium,
        Roboto_500Medium_Italic,
        Roboto_700Bold,
        Roboto_700Bold_Italic,
        ...FontAwesome.font,
        ...Ionicons.font,
    });
    const [ assets ] = useAssets([
        require('categories/img/restaurant.jpg'),
        require('categories/img/bar.jpg'),
        require('categories/img/cafe.jpg'),
        require('categories/img/museum.jpg'),
        require('categories/img/park.jpg'),
        require('categories/img/restaurant-large.jpg'),
        require('categories/img/bar-large.jpg'),
        require('categories/img/cafe-large.jpg'),
        require('categories/img/museum-large.jpg'),
        require('categories/img/park-large.jpg'),
    ]);

    // Checks the app state to ensure that network checks are only done
    // when the app is active - i.e. in the foreground. Worth moving this to
    // the redux store at some point
    const [ appState, setAppState ] = useState(AppState.currentState);
    useEffect(() => {
        const updateAppState = (state: AppStateStatus) => setAppState(state);
        AppState.addEventListener('change', updateAppState);
        const cleanup = () => {
            AppState.removeEventListener('change', updateAppState);
        };
        return cleanup;
    });

    // Checks that network is up when app loads and keeps checking every
    // 2 seconds until it is
    const [ networkUp, setNetworkUp ] = useState(false);
    const checkNetworkStatus = () => {
        getNetworkStateAsync()
            .then((networkState: NetworkState) => {
                setNetworkUp(networkState.isInternetReachable || false);
                if (!networkState.isInternetReachable && appState === 'active') {
                    setTimeout(checkNetworkStatus, 2000);
                }
            });
    };
    useEffect(checkNetworkStatus, [ appState ]);

    if (!fontsLoaded || !assets) {
        return <AppLoading />;
    }

    return (
        <Provider store={store}>
            <AppContainer />
            <Toast visible={!networkUp} message={'You seem to be offline'} />
        </Provider>
    );
}

export default App;
