import React from 'react';
import { View, StyleSheet } from 'react-native';
import { NavigationProps } from '../common/types';
import BackButton from './BackButton';
import Dock from './Dock';
import Color from '../constants/colors';
import CategoryResult from './CategoryResult';
import { ScrollView } from 'react-native-gesture-handler';

function CategoryResults({ navigation, route }: NavigationProps) {
    return (
        <View style={styles.container}>
            <BackButton onPress={navigation.goBack}/>
            <View style={styles.imageContainer}></View>
            <Dock title={route.params?.category.name} style={styles.dock}>
                <View style={styles.resultsContainer}>
                    <ScrollView>
                        <CategoryResult />
                        <CategoryResult />
                        <CategoryResult />
                        <CategoryResult />
                        <CategoryResult />
                    </ScrollView>
                </View>
            </Dock>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.DARK_GREEN,
    },
    imageContainer: {
        height: 185,
    },
    dock: {
        flex: 1,
    },
    resultsContainer: {
        flex: 1,
    },
});

export default CategoryResults;
