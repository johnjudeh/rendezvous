import React from 'react';
import { StyleSheet, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Constants from 'expo-constants';
import Color from 'common/constants/colors';

interface BackButtonProps extends TouchableOpacityProps {
    color?: Color,
}

function BackButton({ onPress, color }: BackButtonProps) {
    return (
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <Ionicons name="arrow-back" size={30} color={color ? color : Color.DARK_GREY} />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        position: 'absolute',
        zIndex: 2,
        left: 27,
        top: Constants.statusBarHeight + 25,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default BackButton;
