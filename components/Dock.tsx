import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

function Dock(props) {
    return (
        <View style={styles.dock}>
            {props.children}
        </View>
    );
}

const styles = StyleSheet.create({
    dock: {
        flex: 1,
        width: '100%',
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        backgroundColor: '#fafafa',
        shadowColor: '#353745',
        shadowOffset: {
            width: 0,
            height: -2,
        },
        shadowRadius: 5,
        shadowOpacity: 0.20,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default Dock;
