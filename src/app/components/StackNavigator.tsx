import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MapperView from 'map/components';
import LocationSearch from 'locations/components';
import CategoryResults from 'categories/components';

const Stack = createStackNavigator();

function StackNavigator() {
    return (
        <Stack.Navigator initialRouteName='Map' screenOptions={{ headerShown: false }}>
            <Stack.Screen name='Map' component={MapperView} />
            <Stack.Screen name='Locations' component={LocationSearch} />
            <Stack.Screen name='Category' component={CategoryResults} />
        </Stack.Navigator>
    );
}

export default StackNavigator;
