import React from 'react';
import { View, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import reducer from './reducers';
import MainNavigaton from './components/MainNavigaton';

const store = configureStore({
    reducer,
});

function App() {
    return (
        <Provider store={store}>
            <View style={styles.container}>
                <StatusBar style='dark' />
                <MainNavigaton />
            </View>
        </Provider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default App;
