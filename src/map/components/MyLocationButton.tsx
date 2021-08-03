import React from 'react';
import {
    TouchableOpacity,
    TouchableOpacityProps,
    StyleSheet,
    Platform
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import Color from 'common/constants/colors';

function MyLocationButton({ onPress }: TouchableOpacityProps) {
    return (
        <TouchableOpacity onPress={onPress} style={styles.button}>
            <MaterialIcons name="my-location" size={24} color={Color.DARK_GREY} />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        position: 'absolute',
        right: 12,
        alignItems: 'center',
        justifyContent: 'center',
        width: 55,
        height: 55,
        backgroundColor: Color.OFF_WHITE,
        borderRadius: 100,
        zIndex: 2,
        ...Platform.select({
            ios: {
                bottom: 111,
                shadowColor: Color.DARK_GREY,
                shadowOffset: {
                    width: 0,
                    height: 4,
                },
                shadowRadius: 5,
                shadowOpacity: 0.3,
            },
            android: {
                elevation: 5,
                bottom: 100
            }
        }),
    },
});

export default MyLocationButton;
