import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';
import { NavigationProps } from 'common/types';
import { Dock, MainButton, BackButton, BurgerButton } from 'common/components';
import { selectLocations } from 'locations/state';
import { CategoryList } from 'categories/components';
import Map from './Map';

function MapperView({ navigation }: NavigationProps) {
    const locations = useSelector(selectLocations);
    const showDock = locations.length >= 2;

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
