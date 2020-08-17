import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import Color from '../constants/colors';

function CategoryResult() {
    return (
        <View style={styles.container}>
            <View style={styles.image} />
            <View style={styles.detailsContainer}>
                <Text style={styles.description}>Steak house</Text>
                <Text style={styles.name}>Flat Iron</Text>
                <Text style={styles.address}>17-18 Henrietta St, WC2E 8QH</Text>
                <View style={styles.ratingContainer}>
                    <FontAwesome name='star' size={16} color={Color.ORANGE} />
                    <Text style={styles.rating}>4.6</Text>
                    <Text style={styles.numOfRatings}>(4,441)</Text>
                    <View style={styles.actionsContainer}>
                        <TouchableOpacity style={styles.action}>
                            <Ionicons name="md-heart" size={28} color={Color.ORANGE} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.action}>
                            <Ionicons name="md-share-alt" size={28} color={Color.MID_LIGHT_GREY} style={styles.action} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 130,
        borderColor: Color.LIGHT_GREY,
        borderBottomWidth: 1,
    },
    image: {
        height: 100,
        width: 100,
        backgroundColor: Color.DARK_RED,
        borderRadius: 5,
    },
    detailsContainer: {
        flexGrow: 1,
        alignItems: 'stretch',
        marginLeft: 17,
    },
    description: {
        fontSize: 12,
        color: Color.MID_GREY,
    },
    name: {
        fontSize: 18,
        color: Color.DARK_GREY,
        fontWeight: 'bold',
        marginTop: 3,
    },
    address: {
        fontSize: 10,
        color: Color.MID_LIGHT_GREY,
        marginTop: 3,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 2,
    },
    rating: {
        fontSize: 12,
        color: Color.DARK_GREY,
        paddingLeft: 4,
    },
    numOfRatings: {
        fontSize: 12,
        color: Color.MID_LIGHT_GREY,
        marginLeft: 3,
    },
    actionsContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        flexGrow: 1,
    },
    action: {
        marginLeft: 7,
        marginRight: 6,
    },
})

export default CategoryResult;
