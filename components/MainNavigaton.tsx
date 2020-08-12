import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MapperView from './MapperView';
import LocationSearch from './LocationSearch';

const Stack = createStackNavigator();

function MainNavigaton() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='home' screenOptions={{ headerShown: false }}>
                <Stack.Screen name='home' component={MapperView} />
                <Stack.Screen name='locations' component={LocationSearch} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default MainNavigaton;
