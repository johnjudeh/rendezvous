import React from 'react';
import { StyleSheet, Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import Color, { Opacity } from 'common/constants/colors';

interface MainButtonProps extends TouchableOpacityProps {
    text: string,
}

function MainButton(props: MainButtonProps) {
    const { text, disabled, onPress } = props;

    return (
        <TouchableOpacity
            style={disabled ? [styles.button, styles.disabled] : styles.button}
            disabled={disabled}
            onPress={onPress}
        >
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
    disabled: {
        backgroundColor: Color.DARK_GREY + Opacity.DISABLED,
    },
    buttonText: {
        color: Color.OFF_WHITE,
        textTransform: 'uppercase',
        fontWeight: 'bold',
    }
});

export default MainButton;
