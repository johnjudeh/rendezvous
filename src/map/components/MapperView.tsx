import React, { useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import { NavigationProps } from 'common/types';
import { useSelector } from 'react-redux';
import * as Segment from 'expo-analytics-segment';
import { useFocusEffect } from '@react-navigation/native';
import { LatLng } from 'react-native-maps';
import { selectCurrLocation, selectLocations } from 'locations/state';
import { calculateCenter } from 'locations/utils';
import { Dock, MainButton, BackButton } from 'common/components';
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
        Segment.screenWithProperties('Map', {
            showingCategories: showDock,
            numOfLocations: locations.length,
            locations,
            center,
        }, currLocation ? { location: currLocation } : undefined);
    }, [showDock]));

    return (
        <View style={styles.container}>
            <View style={styles.mapContainer}>
                {showDock
                    ? <BackButton onPress={() => navigation.navigate('locations')}/>
                    : null
                }
                <Map />
            </View>
            {showDock
                ? <Dock title='Explore the middle'>
                    <CategoryList />
                </Dock>
                : <Dock>
                    <View style={styles.buttonContainer}>
                        <MainButton text='Add location' onPress={() => navigation.navigate('locations')} />
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
