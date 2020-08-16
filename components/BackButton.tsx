import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Constants from 'expo-constants';
import { ButtonProps } from '../common/types';
import Color from '../constants/colors';

function BackButton({ onPress }: ButtonProps) {
    return (
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <Ionicons name="md-arrow-back" size={30} color={Color.DARK_GREY} />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        position: 'absolute',
        zIndex: 1,
        left: 15,
        top: Constants.statusBarHeight + 25,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default BackButton;
