import React from 'react';
import { StyleSheet, Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import Color from 'common/constants/colors';

interface MainButtonProps extends TouchableOpacityProps {
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
        height: 52,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 6,
    },
    buttonText: {
        color: Color.OFF_WHITE,
        textTransform: 'uppercase',
        fontWeight: 'bold',
    }
});

export default MainButton;
