import React, { useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, PixelRatio, Dimensions } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import HTMLView from 'react-native-htmlview';
import { LatLng } from 'react-native-maps';
import Color from 'common/constants/colors';
import FontFamily from 'common/constants/fonts';
import GooglePlacesAPI, { PlaceType, PriceLevel } from 'common/clients/googlePlaces';
import { openBrowser } from 'common/utils';
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
    priceLevel: PriceLevel,
    photoRef?: string,
    photoDataURL?: string,
    photoAttrHTML?: string,
}

function CategoryResult(props: CategoryResultProps) {
    const { id, category, name, address, latLng, center, rating, numOfRatings, priceLevel, photoRef, photoDataURL, photoAttrHTML } = props;
    const dispatch = useDispatch();

    const openGoogleMaps = () => {
        const url = new URL('https://www.google.com/maps/search/');
        url.searchParams.append('api', '1');
        url.searchParams.append('query', encodeURIComponent(name));
        url.searchParams.append('query_place_id', id);
        openBrowser(url.toString());
    }

    const renderPriceLevel = () => {
        if (priceLevel === undefined) {
            return null;
        } else if (priceLevel === PriceLevel.Free) {
            return <Text style={styles.priceLevelFree}>{PriceLevel[priceLevel]}</Text>
        }

        const priceLevelComponents = [];

        for (let i = PriceLevel.Inexpensive; i <= PriceLevel.VeryExpensive; i++) {
            priceLevelComponents.push(
                <FontAwesome
                    name="gbp"
                    size={14}
                    color={i <= priceLevel ? Color.ORANGE : Color.MID_LIGHT_GREY}
                    style={styles.priceLevelMoneyIcon}
                />
            )
        }
        return priceLevelComponents;
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
        <TouchableOpacity style={styles.container} onPress={openGoogleMaps}>
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
                                onLinkPress={(url: string) => openBrowser(url)}
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
                    <View style={styles.priceLevelContainer}>{renderPriceLevel()}</View>
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
    priceLevelContainer: {
        flexDirection: 'row',
        marginLeft: 20,
    },
    priceLevelMoneyIcon: {
        marginRight: 2,
    },
    priceLevelFree: {
        fontFamily: FontFamily.CTA,
        fontSize: 14,
        color: Color.ORANGE,
        textTransform: 'uppercase',
    }
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
