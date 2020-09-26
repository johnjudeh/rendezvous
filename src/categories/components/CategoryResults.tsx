import React, { useEffect } from 'react';
import { Dimensions, ScrollView, Text } from 'react-native';
import { View, StyleSheet } from 'react-native';
import { LatLng } from 'react-native-maps';
import { useDispatch, useSelector } from 'react-redux';
import { selectLocations } from 'locations/state';
import { calculateCenter } from 'locations/utils';
import { setCategoryResults, selectCategoryResultsCreator, SetActionPayload } from 'categories/state';
import { NavigationProps } from 'common/types';
import { BackButton, Dock } from 'common/components';
import Color from 'common/constants/colors';
import GooglePlacesAPI, { PlaceType } from 'common/clients/googlePlaces';
import { SEARCH_RADIUS } from 'map/constants';
import { CATEGORY_LABELS } from '../constants';
import CategoryResult from './CategoryResult';

function CategoryResults({ navigation, route }: NavigationProps) {
    const category: PlaceType = route.params?.category;
    const dispatch = useDispatch();
    const locations = useSelector(selectLocations);
    const results = useSelector(selectCategoryResultsCreator(category));
    const center: LatLng = calculateCenter(locations.map(loc => loc.latLng));

    useEffect(() => {
        if (Object.keys(results).length === 0) {
            GooglePlacesAPI.nearbySearch(center, SEARCH_RADIUS, category)
                .then(res => {
                    const action: SetActionPayload = {
                        category,
                        places: res,
                    };
                    dispatch(setCategoryResults(action));
                });
        }
    }, [center.latitude, center.longitude, category]);

    return (
        <View style={styles.container}>
            <BackButton onPress={navigation.goBack}/>
            <View style={styles.imageContainer}></View>
            <Dock title={CATEGORY_LABELS[category]} style={styles.dock}>
                <View style={styles.resultsContainer}>
                    {/* TODO: Handle the ZERO_RESULTS in a neater way */}
                    {Object.keys(results).length === 0
                        ? <Text style={styles.loadingText}>Loading...</Text>
                        : <ScrollView>
                            {Object.keys(results).map(result => (
                                <CategoryResult
                                    key={results[result].place_id}
                                    id={results[result].place_id}
                                    name={results[result].name}
                                    address={results[result].vicinity}
                                    rating={results[result].rating}
                                    numOfRatings={results[result].user_ratings_total}
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
        height: 185,
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
    }
});

export default CategoryResults;
