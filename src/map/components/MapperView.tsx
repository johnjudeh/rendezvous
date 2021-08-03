import React, { useRef, MutableRefObject } from 'react';
import { StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';
import MapView from 'react-native-maps';
import { selectCurrLocation, selectLocations } from 'locations/state';
import { NavigationProps } from 'common/types';
import { Dock, MainButton, BackButton, BurgerButton } from 'common/components';
import { CategoryList } from 'categories/components';
import MyLocationButton from './MyLocationButton';
import Map from './Map';

function MapperView({ navigation }: NavigationProps) {
    const locations = useSelector(selectLocations);
    const showDock = locations.length >= 2;
    const mapRef: MutableRefObject<MapView | null> = useRef(null);
    const currLocation = useSelector(selectCurrLocation);

    const animateToCurrLocation = () => {
        if (mapRef.current !== null && currLocation !== null) {
            mapRef.current.animateCamera({ center: currLocation });
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.mapContainer}>
                {showDock
                    ? <BackButton onPress={() => navigation.navigate('Locations')}/>
                    : null
                }
                <BurgerButton onPress={() => navigation.toggleDrawer()} />
                {showDock
                    ? null
                    : <MyLocationButton onPress={animateToCurrLocation} />
                }
                <Map mapRef={mapRef} />
            </View>
            {showDock
                ? <Dock title='Explore the middle'>
                    <CategoryList />
                </Dock>
                : <Dock>
                    <View style={styles.buttonContainer}>
                        <MainButton text='Get started' onPress={() => navigation.navigate('Locations')} />
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
