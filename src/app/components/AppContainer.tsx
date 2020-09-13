import React from 'react';
import { View, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import MainNavigaton from './MainNavigaton';

function AppContainer() {
    return (
        <View style={styles.container}>
            <StatusBar style='dark' />
            <MainNavigaton />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default AppContainer;
