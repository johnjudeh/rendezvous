import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ButtonProps } from '../common/types';
import { DARK_GREY, WHITE } from '../constants/colors';

function BackButton({ onPress }: ButtonProps) {
    return (
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <Ionicons name="md-arrow-round-back" size={38} color={DARK_GREY} />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        position: 'absolute',
        left: 15,
        top: 60,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default BackButton;
