import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MapperView from '../../../components/MapperView';
import LocationSearch from '../../../components/LocationSearch';
import CategoryResults from '../../../components/CategoryResults';

const Stack = createStackNavigator();

function MainNavigaton() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='map' screenOptions={{ headerShown: false }}>
                <Stack.Screen name='map' component={MapperView} />
                <Stack.Screen name='locations' component={LocationSearch} />
                <Stack.Screen name='category' component={CategoryResults} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default MainNavigaton;
