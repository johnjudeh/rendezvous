import React from 'react';
import { StyleSheet, Text, TouchableOpacity, Dimensions } from 'react-native';
import { ButtonProps } from '../common/types';
import Color from '../constants/colors';

interface MainButtonProps extends ButtonProps {
    text: string,
}

function MainButton(props: MainButtonProps) {
    const { text, onPress } = props;

    return (
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text style={styles.buttonText}>{text}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: Color.DARK_GREY,
        width: Dimensions.get('window').width - 58,
        height: 52,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 6,
    },
    buttonText: {
        color: Color.WHITE,
        fontSize: 14,
        textTransform: 'uppercase',
        fontWeight: 'bold',
    }
});

export default MainButton;
