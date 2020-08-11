import React from 'react';
import { StyleSheet, Text, TouchableOpacity, Dimensions } from 'react-native';
import { DARK_GREY, WHITE } from '../constants/colors';

function MainButton(props) {
    const { text } = props;

    return (
        <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>{text}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: DARK_GREY,
        width: Dimensions.get('window').width - 58,
        height: 52,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 6,
    },
    buttonText: {
        color: WHITE,
        fontSize: 14,
        textTransform: 'uppercase',
        fontWeight: 'bold',
    }
});

export default MainButton;
