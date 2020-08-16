import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import Color from '../constants/colors';

interface CategoryThumbnailProps {
    category: string,
}

function CategoryThumbnail({ category }: CategoryThumbnailProps) {
    return (
        <TouchableOpacity style={styles.thumbnail}>
            <Text style={styles.name}>{category}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    thumbnail: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 125,
        width: 125,
        backgroundColor: Color.DARK_GREEN,
        borderRadius: 5,
        marginRight: 16,
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Color.OFF_WHITE,
    },
});

export default CategoryThumbnail;
