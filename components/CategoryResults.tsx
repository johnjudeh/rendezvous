import React from 'react';
import { View, StyleSheet } from 'react-native';
import { NavigationProps } from '../common/types';
import BackButton from './BackButton';
import Dock from './Dock';
import Color from '../constants/colors';

function CategoryResults({ navigation, route }: NavigationProps) {
    return (
        <View style={styles.container}>
            <BackButton onPress={navigation.goBack}/>
            <View style={styles.imageContainer}></View>
            <Dock title={route.params?.category.name}>{null}</Dock>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.DARK_GREEN,
    },
    imageContainer: {
        flexGrow: 1,
    },
});

export default CategoryResults;
