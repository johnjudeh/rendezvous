import React from 'react';
import { StyleSheet } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Privacy from 'privacy/components';
import Color, { Opacity } from 'common/constants/colors';
import StackNavigator from './StackNavigator';

const Drawer = createDrawerNavigator();

function DrawerNavigator() {
    return (
        <Drawer.Navigator
            initialRouteName='Home'
            drawerPosition='right'
            hideStatusBar={true}
            overlayColor={Color.DARK_GREY + Opacity.OVERLAY}
            drawerStyle={styles.drawer}
            drawerContentOptions={{
                activeTintColor: Color.ORANGE,
                inactiveTintColor: Color.MID_GREY,
            }}
        >
            <Drawer.Screen name='Home' component={StackNavigator} />
            <Drawer.Screen name='Privacy Policy' component={Privacy} />
        </Drawer.Navigator>
    );
}

const styles = StyleSheet.create({
    drawer: {
        backgroundColor: Color.OFF_WHITE,
    },
});

export default DrawerNavigator;
