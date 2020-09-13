import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import { ButtonProps } from 'common/types';
import Color from 'common/constants/colors';

interface CategoryThumbnailProps extends ButtonProps {
    category: string,
}

function CategoryThumbnail({ category, onPress }: CategoryThumbnailProps) {
    return (
        <TouchableOpacity onPress={onPress} style={styles.thumbnail}>
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
