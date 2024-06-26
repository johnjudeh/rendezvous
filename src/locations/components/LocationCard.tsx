import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAppDispatch } from 'common/hooks';
import { useSafeAreaFrame } from 'react-native-safe-area-context';
import Color from 'common/constants/colors';
import FontFamily from 'common/constants/fonts';
import { UniqueObject } from 'common/types';
import { formatAddress } from 'locations/utils';
import { removeLocation } from '../state'

interface LocationCardProps extends UniqueObject {
    address: string,
    country: string,
    postcode: string,
    index: number,
}

const BAKGROUND_COLORS: Color[] = [
    Color.DARK_GREEN,
    Color.DARK_RED,
    Color.LIGHT_GREEN,
]

const COLORS: Color[] = [
    Color.PLATINUM,
    Color.PLATINUM,
    Color.DARK_GREY,
]

function LocationCard(props: LocationCardProps) {
    // This needs to be used instead of Dimensions.get('window') as
    // the behaviour is inconsistent across Android devices
    const frame = useSafeAreaFrame();

    const POSTCODE_LENGTH = 6;
    const ADDRESS_MAX_LENGTH = Math.round(frame.width / 20);

    const { id, address, country, postcode, index } = props;
    const dispatch = useAppDispatch();

    const handleLocationRemoval = () => dispatch(removeLocation(id));

    return (
        <View style={styles.container}>
            <View style={[styles.postcodeContainer, { backgroundColor: BAKGROUND_COLORS[index % BAKGROUND_COLORS.length] }]}>
                <Text style={[styles.postcode, { color: COLORS[index % COLORS.length] }]}>
                    {postcode.length !== 0 ? postcode.substring(0, 3) : country}
                </Text>
            </View>
            <View style={styles.locationContainer}>
                <Text style={styles.name}>
                    {index === 0 ? 'Your location' : `Friend ${index}`}
                </Text>
                <Text style={styles.address}>{
                    postcode === ''
                        ? `${formatAddress(address, ADDRESS_MAX_LENGTH + POSTCODE_LENGTH)}`
                        : `${formatAddress(address, ADDRESS_MAX_LENGTH)}, ${postcode}`
                }</Text>
            </View>
            <View style={styles.removeContainer}>
                <TouchableOpacity onPress={handleLocationRemoval}>
                    <Ionicons name="close" size={22} color={Color.DARK_GREY} />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: 50,
        flexDirection: 'row',
        padding: 5,
        paddingRight: 2,
        paddingLeft: 2,
        marginTop: 10,
    },
    postcodeContainer: {
        width: 45,
        height: 45,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 22.5,
    },
    postcode: {
        fontSize: 14,
        fontFamily: FontFamily.BODY,
    },
    locationContainer: {
        justifyContent: 'center',
        paddingLeft: 10,
        flexGrow: 1,
    },
    name: {
        fontSize: 15,
        fontFamily: FontFamily.BODY,
    },
    address: {
        fontSize: 13,
        color: Color.MID_GREY,
        fontFamily: FontFamily.BODY,
    },
    removeContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default LocationCard;
