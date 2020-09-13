import React from 'react';
import { StyleSheet, View } from 'react-native';
import { NavigationProps } from 'common/types';
import Map from './Map';
import { Dock, MainButton, BackButton } from 'common/components';
import { CategoryList } from 'categories/components';

function MapperView({ navigation, route }: NavigationProps) {
    return (
        <View style={styles.container}>
            <View style={styles.mapContainer}>
                {route.params?.userLocations && <BackButton onPress={() => navigation.navigate('locations')}/>}
                <Map />
            </View>
            {route.params?.userLocations
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
