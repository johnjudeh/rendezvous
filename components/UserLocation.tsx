import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Color from '../constants/colors';

interface UserLocationProps {
    address: string,
    postcode: string,
    index: number,
}

class UserLocation extends Component<UserLocationProps> {
    static BAKGROUND_COLORS: Color[] = [
        Color.DARK_GREEN,
        Color.DARK_RED,
        Color.LIGHT_GREEN,
    ]

    static COLORS: Color[] = [
        Color.PLATINUM,
        Color.PLATINUM,
        Color.DARK_GREY,
    ]

    render() {
        const { address, postcode, index } = this.props;

        return (
            <View style={styles.container}>
                <View style={[styles.postcodeContainer, { backgroundColor: UserLocation.BAKGROUND_COLORS[index] }]}>
                    <Text style={[styles.postcode, { color: UserLocation.COLORS[index] }]}>
                        {postcode.substring(0, 3)}
                    </Text>
                </View>
                <View style={styles.locationContainer}>
                    <Text style={styles.name}>
                        {index === 0 ? 'Your location' : `Friend ${index}`}
                    </Text>
                    <Text style={styles.address}>{`${address}, ${postcode}`}</Text>
                </View>
                <View style={styles.removeContainer}>
                    <TouchableOpacity>
                        <Ionicons name="md-close" size={22} color={Color.DARK_GREY} />
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
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
    },
    locationContainer: {
        justifyContent: 'center',
        paddingLeft: 10,
        flexGrow: 1,
    },
    name: {
        fontSize: 15,
    },
    address: {
        fontSize: 13,
        color: Color.MID_GREY,
    },
    removeContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default UserLocation;
