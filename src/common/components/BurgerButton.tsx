import React from 'react';
import { StyleSheet, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Constants from 'expo-constants';
import Color from 'common/constants/colors';

interface BurgerButtonProps extends TouchableOpacityProps {
    color?: Color,
}

function BurgerButton({ onPress, color }: BurgerButtonProps) {
    return (
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <Ionicons name="menu" size={30} color={color ? color : Color.DARK_GREY} />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        width: 48,
        height: 48,
        position: 'absolute',
        zIndex: 2,
        right: 17,
        top: Constants.statusBarHeight + 25,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default BurgerButton;
