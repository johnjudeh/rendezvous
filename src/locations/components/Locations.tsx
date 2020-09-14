import React from 'react';
import { StyleSheet, View } from 'react-native';
import Color from 'common/constants/colors';
import { LocationData } from 'common/types';
import LocationSearchBar from './LocationSearchBar';
import UserLocation from './UserLocation';

interface LocationsProps {
    locations: LocationData[]
}

function Locations({ locations }: LocationsProps) {
    return (
        <View style={styles.container}>
            <LocationSearchBar />
            {locations.map((location, i) => (
                <UserLocation
                    key={location.id}
                    id={location.id}
                    address={location.address}
                    postcode={location.postcode}
                    index={i}
                />
            ))}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        minHeight: 80,
        paddingLeft: 45,
        paddingRight: 45,
        borderStyle: 'solid',
        borderBottomColor: Color.LIGHT_GREY,
        borderBottomWidth: 1,
        paddingBottom: 20,
        marginBottom: 20,
        zIndex: 1,
    }
});

export default Locations;