import React from 'react';
import { ScrollView } from 'react-native';
import { useAppSelector } from 'common/hooks';
import { selectLocations } from 'locations/state';
import LocationCard from './LocationCard';

function LocationCards() {
    const locations = useAppSelector(selectLocations);

    return (
        <ScrollView>
            {locations.map((location, i) => (
                <LocationCard
                    key={location.id}
                    id={location.id}
                    address={location.address}
                    country={location.country}
                    postcode={location.postcode}
                    index={i}
                />
            ))}
        </ScrollView>
    );
}

export default LocationCards;