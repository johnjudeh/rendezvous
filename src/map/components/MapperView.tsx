import React from 'react';
import { StyleSheet, View } from 'react-native';
import { NavigationProps } from 'common/types';
import { useSelector } from 'react-redux';
import { selectLocations } from 'locations/state';
import { Dock, MainButton, BackButton } from 'common/components';
import { CategoryList } from 'categories/components';
import Map from './Map';

function MapperView({ navigation }: NavigationProps) {
    const locations = useSelector(selectLocations);

    return (
        <View style={styles.container}>
            <View style={styles.mapContainer}>
                {locations.length !== 0
                    ? <BackButton onPress={() => navigation.navigate('locations')}/>
                    : null
                }
                <Map />
            </View>
            {locations.length !== 0
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
