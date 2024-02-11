import React, { useEffect, useState } from 'react';
import { View, StyleSheet, AppState, AppStateStatus } from 'react-native';

import { useAppDispatch, useAppSelector } from 'common/hooks';
import { getNetworkStateAsync, NetworkState } from 'expo-network';
import { StatusBar } from 'expo-status-bar';
import { addListener as addUpdateListener, checkForUpdateAsync, fetchUpdateAsync, reloadAsync, UpdateEvent, UpdateEventType } from 'expo-updates';
import { EventSubscription } from 'fbemitter';
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

    const addListenerForUpdate = () => {
        if (!__DEV__) {
            const subscription: EventSubscription = addUpdateListener((event: UpdateEvent) => {
                if (event.type === UpdateEventType.UPDATE_AVAILABLE) {
                    showModal();
                }
            });
            return subscription.remove;
        }
    };

    const checkForUpdate = () => {
        if (!__DEV__ && appState === 'active') {
            checkForUpdateAsync()
                .then(updateState => {
                    if (updateState.isAvailable) {
                        return fetchUpdateAsync();
                    }
                })
                .then(update => {
                    if (update && update.isNew) {
                        showModal();
                    }
                });
        }
    };

    useEffect(addListenerForUpdate, []);
    useEffect(checkForUpdate, [appState]);

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
