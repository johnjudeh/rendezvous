import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NavigationProps } from 'common/types';
import { BurgerButton } from 'common/components';

function Privacy({ navigation }: NavigationProps) {
    return (
        <View style={styles.container}>
            <BurgerButton onPress={() => navigation.toggleDrawer()} />
            <Text>Privacy Policy</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
});

export default Privacy;
