import React from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import MapperView from './components/MapperView';

function App() {
    return (
        <View style={styles.container}>
            <StatusBar barStyle='dark-content' />
            <MapperView />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});

export default App;
