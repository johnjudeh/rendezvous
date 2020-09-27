import React, { useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, PixelRatio } from 'react-native';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import Color from 'common/constants/colors';
import GooglePlacesAPI, { PlaceType } from 'common/clients/googlePlaces';
import { setPlacePhoto, SetPlacePhotoActionPaylod } from '../state';

interface CategoryResultProps {
    id: string,
    category: PlaceType,
    name: string,
    address: string,
    rating: number,
    numOfRatings: number,
    photoRef?: string,
    photoDataURL?: string,
}

function CategoryResult(props: CategoryResultProps) {
    const { id, category, name, address, rating, numOfRatings, photoRef, photoDataURL } = props;
    const dispatch = useDispatch();

    useEffect(() => {
        if (photoRef && !photoDataURL) {
            const pixelSize = PixelRatio.getPixelSizeForLayoutSize(100);
            GooglePlacesAPI.placePhotoURL(photoRef, pixelSize, pixelSize)
                .then(photoURL => {
                    if (photoURL) {
                        const action: SetPlacePhotoActionPaylod = {
                            category,
                            placeId: id,
                            photoRef,
                            photoDataURL: photoURL,
                        }
                        dispatch(setPlacePhoto(action));
                    }
                });
        }
    }, [id, photoRef]);

    return (
        <View style={styles.container}>
            <Image
                source={photoDataURL
                    ? { uri: photoDataURL }
                    : {}
                }
                style={styles.image}
            />
            <View style={styles.detailsContainer}>
                <Text style={styles.name}>{name}</Text>
                <Text style={styles.address}>{address}</Text>
                <View style={styles.secondaryContainer}>
                    <FontAwesome name='star' size={16} color={Color.ORANGE} />
                    <Text style={styles.rating}>{rating ? rating.toPrecision(2) : 'Unrated'}</Text>
                    <Text style={styles.numOfRatings}>{rating ? `(${numOfRatings})` : ''}</Text>
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
    secondaryContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 2,
    },
    ratingContainer: {
        flexDirection: 'row',
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
