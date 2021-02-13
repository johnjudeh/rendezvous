import React, { useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';
import * as Segment from 'expo-analytics-segment';
import { useFocusEffect } from '@react-navigation/native';
import { LatLng } from 'react-native-maps';
import { NavigationProps } from 'common/types';
import { Dock, MainButton, BackButton, BurgerButton } from 'common/components';
import { selectCurrLocation, selectLocations } from 'locations/state';
import { calculateCenter, calculateDistance } from 'locations/utils';
import { CategoryList } from 'categories/components';
import Map from './Map';

function MapperView({ navigation }: NavigationProps) {
    const currLocation = useSelector(selectCurrLocation);
    const locations = useSelector(selectLocations);
    const showMarkers = locations.length > 1;
    const center: LatLng | null = showMarkers
        ? calculateCenter(locations.map(loc => loc.latLng))
        : null;
    const showDock = locations.length >= 2;

    useFocusEffect(useCallback(() => {
        // As the center is equa-distance from all locations, it is sufficient to calculate
        // the distance between any single location and the center. If the way the center is
        // calculated changes, it it important that this calculation is changed alongside that
        const avgDistanceFromCenter: number | null = center
            ? Math.round(calculateDistance(locations[0].latLng, center))
            : null;

        Segment.screenWithProperties('Map', {
            showingCategories: showDock,
            numOfLocations: locations.length,
            locationsAvgDistanceFromCenter: avgDistanceFromCenter,
            center,
        }, currLocation ? { location: currLocation } : undefined);
    }, [showDock]));

    return (
        <View style={styles.container}>
            <View style={styles.mapContainer}>
                {showDock
                    ? <BackButton onPress={() => navigation.navigate('Locations')}/>
                    : null
                }
                <BurgerButton onPress={() => navigation.toggleDrawer()} />
                <Map />
            </View>
            {showDock
                ? <Dock title='Explore the middle'>
                    <CategoryList />
                </Dock>
                : <Dock>
                    <View style={styles.buttonContainer}>
                        <MainButton text='Add location' onPress={() => navigation.navigate('Locations')} />
                    </View>
                </Dock>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    mapContainer: {
        flexGrow: 1,
    },
    buttonContainer: {
        paddingLeft: 15,
        paddingRight: 15,
    },
});

export default MapperView;
