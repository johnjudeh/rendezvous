import React, { useEffect } from 'react';
import { Dimensions, FlatList, Text, View, StyleSheet, Image, ListRenderItem } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { LatLng } from 'react-native-maps';
import { useDispatch, useSelector } from 'react-redux';
import { selectLocations } from 'locations/state';
import { calculateCenter, latLngShortToLatLng } from 'locations/utils';
import { setCategoryResults, selectCategoryCreator, SetActionPayload, CategoryResult as CategoryResultInterface } from 'categories/state';
import { Dictionary, NavigationProps } from 'common/types';
import { BackButton, Dock } from 'common/components';
import Color from 'common/constants/colors';
import FontFamily from 'common/constants/fonts';
import GooglePlacesAPI, { PlaceType, PlacesResult as GooglePlacesResult } from 'common/clients/googlePlaces';
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

    const renderCategoryResult: ListRenderItem<CategoryResultInterface> = ({ item }) => {
        return (
            <CategoryResult
                id={item.place_id}
                category={categoryName}
                name={item.name}
                latLng={latLngShortToLatLng(item.geometry.location)}
                center={center}
                address={item.vicinity}
                rating={item.rating}
                numOfRatings={item.user_ratings_total}
                photoRef={item.photos?.[0]?.photo_reference}
                photoDataURL={item.photos?.[0]?.photo_data_url}
                photoAttrHTML={item.photos?.[0]?.html_attributions[0]}
            />
        );
    };

    const renderEmptyList = () => {
        return (
            <Text style={styles.loadingText}>
                There are no open {CATEGORY_LABELS[categoryName].toLowerCase()} in this area right now
            </Text>
        );
    };

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
                        : <FlatList
                            data={Object.values(results)}
                            renderItem={renderCategoryResult}
                            keyExtractor={item => item.place_id}
                            extraData={categoryName}
                            initialNumToRender={5}
                            ListEmptyComponent={renderEmptyList}
                        />
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
