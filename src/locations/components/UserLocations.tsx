import React from 'react';
import { ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import { selectLocations } from 'locations/state';
import UserLocation from './UserLocation';

function UserLocations() {
    const locations = useSelector(selectLocations);

    return (
        <ScrollView>
            {locations.map((location, i) => (
                <UserLocation
                    key={location.id}
                    id={location.id}
                    address={location.address}
                    postcode={location.postcode}
                    index={i}
                />
            ))}
        </ScrollView>
    );
}

export default UserLocations;