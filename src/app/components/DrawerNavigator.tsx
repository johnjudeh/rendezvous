import React from 'react';
import { Platform, StyleSheet } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Privacy from 'privacy/components';
import Color, { Opacity } from 'common/constants/colors';
import StackNavigator from './StackNavigator';

const Drawer = createDrawerNavigator();

function DrawerNavigator() {
    return (
        <Drawer.Navigator
            initialRouteName='Home'
            screenOptions={{
                headerShown: false,
                drawerPosition: 'right',
                drawerHideStatusBarOnOpen: Platform.OS === 'ios' ? true : false,
                overlayColor: Color.DARK_GREY + Opacity.OVERLAY,
                drawerStyle: styles.drawer,
                drawerActiveTintColor: Color.ORANGE,
                drawerInactiveTintColor: Color.MID_GREY,
                drawerLabelStyle: styles.drawerLabel,
            }}
        >
            <Drawer.Screen name='Home' component={StackNavigator} />
            <Drawer.Screen name='Privacy Policy' component={Privacy} />
        </Drawer.Navigator>
    );
}

const styles = StyleSheet.create({
    drawer: {
        paddingTop: 12,
        backgroundColor: Color.OFF_WHITE,
    },
    drawerLabel: {
        // Resolves an issue with the clickable being less than 48px
        // Adjusts for the padding and margin of parent containers
        height: 48 - (8 * 2 + 5 * 2),
    }
});

export default DrawerNavigator;
