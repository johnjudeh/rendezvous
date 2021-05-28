import React, { useEffect, useState } from 'react';
import { View, StyleSheet, AppState, AppStateStatus } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getNetworkStateAsync, NetworkState } from 'expo-network';
import { StatusBar } from 'expo-status-bar';
import Toast from 'common/components/Toast';
import { selectAppState, setAppState } from 'common/state';
import MainNavigaton from './MainNavigaton';

function AppContainer() {
    const dispatch = useDispatch();

    // Sets the appState in the redux store to be used to monitor when
    // the app is in the background or foreground (active)
    const appState = useSelector(selectAppState);
    useEffect(() => {
        const updateAppState = (appState: AppStateStatus) => dispatch(setAppState(appState));
        AppState.addEventListener('change', updateAppState);
        const cleanup = () => {
            AppState.removeEventListener('change', updateAppState);
        };
        return cleanup;
    });

    // Checks that network is up when app loads and keeps checking every
    // 2 seconds until it is
    const [ networkUp, setNetworkUp ] = useState(true);
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

    return (
        <View style={styles.container}>
            <StatusBar style='dark' />
            <MainNavigaton />
            <Toast visible={!networkUp} message={'You seem to be offline'} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default AppContainer;
