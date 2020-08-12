import React from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import MainNavigaton from './components/MainNavigaton';

function App() {
    return (
        <View style={styles.container}>
            <StatusBar barStyle='dark-content' />
            <MainNavigaton />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});

export default App;
