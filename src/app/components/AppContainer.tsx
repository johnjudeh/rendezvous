import React, { useEffect, useState } from 'react';
import { View, StyleSheet, AppState, AppStateStatus } from 'react-native';

import { useAppDispatch, useAppSelector } from 'common/hooks';
import { getNetworkStateAsync, NetworkState } from 'expo-network';
import { StatusBar } from 'expo-status-bar';
import { useUpdates, checkForUpdateAsync, fetchUpdateAsync, reloadAsync } from 'expo-updates';
import { Modal, Toast } from 'common/components';
import { selectAppState, setAppState } from 'common/state';
import MainNavigaton from './MainNavigaton';

function AppContainer() {
    const dispatch = useAppDispatch();

    // Sets the appState in the redux store to be used to monitor when
    // the app is in the background or foreground (active)
    const appState = useAppSelector(selectAppState);
    useEffect(() => {
        const updateAppState = (appState: AppStateStatus) => dispatch(setAppState(appState));
        const subscription = AppState.addEventListener('change', updateAppState);
        const cleanup = () => {
            subscription.remove();
        };
        return cleanup;
    });

    // App updates handled below
    const [modalVisible, setModalVisible] = useState(false);
    const showModal = () => setModalVisible(true);
    const hideModal = () => setModalVisible(false);
    const okModalFn = () => {
        hideModal();
        reloadAsync();
    };

    const { isUpdateAvailable } = useUpdates();

    const fetchUpdate = async () => {
        if (!__DEV__) {
            const update = await fetchUpdateAsync();
            if (update && update.isNew) {
                showModal();
            }
        }
    };

    const checkForUpdateWhenActive = () => {
        if (appState === 'active' && isUpdateAvailable) {
            fetchUpdate();
        }
    }
    useEffect(checkForUpdateWhenActive, [appState, isUpdateAvailable]);

    // Network connectivity handled below
    // Checks that network is up when app loads and keeps checking every
    // 2 seconds until it is
    const [networkUp, setNetworkUp] = useState(true);
    const checkNetworkStatus = () => {
        getNetworkStateAsync()
            .then((networkState: NetworkState) => {
                setNetworkUp(networkState.isInternetReachable || false);
                if (!networkState.isInternetReachable && appState === 'active') {
                    setTimeout(checkNetworkStatus, 2000);
                }
            });
    };
    useEffect(checkNetworkStatus, [appState]);

    return (
        <View style={styles.container}>
            <StatusBar style='dark' />
            <MainNavigaton />
            <Modal
                visible={modalVisible}
                message={'There is a new update available'}
                okButtonText={'Refresh'}
                okButtonFn={okModalFn}
                cancelButtonFn={hideModal}
            />
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
