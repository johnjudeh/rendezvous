import React, { useEffect } from 'react';
import { Dimensions, ScrollView, Text, View, StyleSheet, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { LatLng } from 'react-native-maps';
import { useDispatch, useSelector } from 'react-redux';
import { selectLocations } from 'locations/state';
import { calculateCenter } from 'locations/utils';
import { setCategoryResults, selectCategoryCreator, SetActionPayload } from 'categories/state';
import { Dictionary, NavigationProps } from 'common/types';
import { BackButton, Dock } from 'common/components';
import Color from 'common/constants/colors';
import FontFamily from 'common/constants/fonts';
import GooglePlacesAPI, { PlaceType, Result as GooglePlacesResult } from 'common/clients/googlePlaces';
import { SEARCH_RADIUS } from 'map/constants';
import { CATEGORY_LABELS, CATEGORY_PHOTOS_LARGE } from '../constants';
import CategoryResult from './CategoryResult';

function CategoryResults({ navigation, route }: NavigationProps) {
    const categoryName: PlaceType = route.params?.category;
    const dispatch = useDispatch();
    const locations = useSelector(selectLocations);
    const category = useSelector(selectCategoryCreator(categoryName));
    const results = category?.results;
    const center: LatLng = calculateCenter(locations.map(loc => loc.latLng));
    const radius = SEARCH_RADIUS;

    useEffect(() => {
        if (
            !category
            || category.center.latitude !== center.latitude
            || category.center.longitude !== center.longitude
            || category.radius !== radius
        ) {
            GooglePlacesAPI.nearbySearch(center, radius, categoryName)
                .then(res => {
                    const placeResults: Dictionary<GooglePlacesResult> = {};
                    res.forEach(result => placeResults[result.place_id] = result);
                    const action: SetActionPayload = {
                        categoryName,
                        category: {
                            center,
                            radius,
                            results: placeResults,
                        }
                    };
                    dispatch(setCategoryResults(action));
                });
        }
    }, [center.latitude, center.longitude, categoryName]);

    return (
        <View style={styles.container}>
            <StatusBar style='light' />
            <BackButton onPress={navigation.goBack} color={Color.OFF_WHITE} />
            <Image
                source={CATEGORY_PHOTOS_LARGE[categoryName]}
                style={styles.imageContainer}
            />
            <Dock title={CATEGORY_LABELS[categoryName]} style={styles.dock}>
                <View style={styles.resultsContainer}>
                    {results === undefined
                        ? <Text style={styles.loadingText}>Loading...</Text>
                        : Object.keys(results).length === 0
                            ? <Text style={styles.loadingText}>
                                There are no open {CATEGORY_LABELS[categoryName].toLowerCase()} in this area right now
                            </Text>
                            : <ScrollView>
                                {Object.keys(results).map(result => (
                                    <CategoryResult
                                        key={results[result].place_id}
                                        id={results[result].place_id}
                                        category={categoryName}
                                        name={results[result].name}
                                        address={results[result].vicinity}
                                        rating={results[result].rating}
                                        numOfRatings={results[result].user_ratings_total}
                                        photoRef={results[result].photos?.[0]?.photo_reference}
                                        photoDataURL={results[result].photos?.[0]?.photo_data_url}
                                        photoAttrHTML={results[result].photos?.[0]?.html_attributions[0]}
                                    />
                                ))}
                            </ScrollView>
                    }
                </View>
            </Dock>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.DARK_GREEN,
    },
    imageContainer: {
        width: '100%',
    },
    dock: {
        flex: 1,
    },
    resultsContainer: {
        // TODO: This needs to be dynamic rather than static
        // for when users turn their screen horizontally.
        height: Dimensions.get('window').height - 300,
    },
    loadingText: {
        fontSize: 15,
        textAlign: 'center',
        marginTop: 10,
        fontFamily: FontFamily.BODY,
    }
});

export default CategoryResults;
