import React, { useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, PixelRatio, Dimensions, Linking } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import HTMLView from 'react-native-htmlview';
import { LatLng } from 'react-native-maps';
import * as WebBrowser from 'expo-web-browser';
import Color from 'common/constants/colors';
import FontFamily from 'common/constants/fonts';
import GooglePlacesAPI, { PlaceType } from 'common/clients/googlePlaces';
import { setPlacePhoto, SetPlacePhotoActionPaylod } from '../state';

interface CategoryResultProps {
    id: string,
    category: PlaceType,
    name: string,
    address: string,
    latLng: LatLng,
    center: LatLng,
    rating: number,
    numOfRatings: number,
    photoRef?: string,
    photoDataURL?: string,
    photoAttrHTML?: string,
}

function CategoryResult(props: CategoryResultProps) {
    const { id, category, name, address, latLng, center, rating, numOfRatings, photoRef, photoDataURL, photoAttrHTML } = props;
    const dispatch = useDispatch();

    const navigateToGoogleMaps = () => {
        const url = new URL('https://www.google.com/maps/search/');
        url.searchParams.append('api', '1');
        url.searchParams.append('query', encodeURIComponent(name));
        url.searchParams.append('query_place_id', id);
        Linking.openURL(url.toString());
    }

    useEffect(() => {
        if (photoRef && !photoDataURL) {
            const pixelSize = PixelRatio.getPixelSizeForLayoutSize(100);
            GooglePlacesAPI.placePhotoURL(photoRef, pixelSize, pixelSize)
                .then(photoURL => {
                    if (photoURL) {
                        const action: SetPlacePhotoActionPaylod = {
                            categoryName: category,
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
        <TouchableOpacity style={styles.container} onPress={navigateToGoogleMaps}>
            <View style={styles.imageContainer}>
                <Image
                    source={photoDataURL
                        ? { uri: photoDataURL }
                        : {}
                    }
                    style={styles.image}
                />
                <View style={styles.attributionContainer}>
                    {photoAttrHTML
                        ? <View style={styles.attributionTextContainer}>
                            <Text style={styles.attributionText}>By </Text>
                            <HTMLView
                                value={photoAttrHTML}
                                stylesheet={HTMLStyles}
                                onLinkPress={(url: string) => WebBrowser.openBrowserAsync(url, {
                                    toolbarColor: Color.OFF_WHITE,
                                    controlsColor: Color.ORANGE,
                                })}
                            />
                        </View>
                        : null
                    }
                </View>
            </View>
            <View style={styles.detailsContainer}>
                <Text style={styles.name}>{name}</Text>
                <Text style={styles.address}>{address}</Text>
                <View style={styles.secondaryContainer}>
                    <FontAwesome name='star' size={16} color={Color.ORANGE} />
                    <Text style={styles.rating}>{rating ? rating.toPrecision(2) : 'Unrated'}</Text>
                    <Text style={styles.numOfRatings}>{rating ? `(${numOfRatings})` : ''}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 160,
        borderColor: Color.LIGHT_GREY,
        borderBottomWidth: 1,
    },
    imageContainer: {
        alignItems: 'center',
    },
    image: {
        height: 110,
        width: 110,
        backgroundColor: Color.DARK_RED,
        borderRadius: 5,
    },
    attributionContainer: {
        marginTop: 2,
        maxWidth: 110,
    },
    attributionTextContainer: {
        flexDirection: 'row',
    },
    attributionText: {
        fontFamily: FontFamily.BODY,
        fontSize: 11,
        color: Color.MID_GREY,
    },
    detailsContainer: {
        flexGrow: 1,
        alignItems: 'stretch',
        marginLeft: 17,
    },
    name: {
        fontSize: 18,
        color: Color.DARK_GREY,
        fontFamily: FontFamily.TITLE,
        marginTop: 3,
        maxWidth: Dimensions.get('window').width - 110 - 17 - 28,
    },
    address: {
        fontSize: 11,
        color: Color.MID_LIGHT_GREY,
        fontFamily: FontFamily.TITLE,
        marginTop: 3,
        maxWidth: Dimensions.get('window').width - 110 - 17 - 28,
    },
    secondaryContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 9,
    },
    ratingContainer: {
        flexDirection: 'row',
    },
    rating: {
        fontSize: 14,
        color: Color.DARK_GREY,
        fontFamily: FontFamily.BODY,
        paddingLeft: 4,
    },
    numOfRatings: {
        fontSize: 14,
        color: Color.MID_LIGHT_GREY,
        fontFamily: FontFamily.BODY,
        marginLeft: 3,
    },
});

const HTMLStyles = StyleSheet.create({
    a: {
        fontFamily: FontFamily.CTA,
        fontSize: 11,
        color: Color.DARK_GREEN,
        textDecorationLine: 'underline'
    }
});

export default CategoryResult;
