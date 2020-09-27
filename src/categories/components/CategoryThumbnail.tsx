import React from 'react';
import { StyleSheet, TouchableOpacity, Text, ImageBackground, ImageSourcePropType } from 'react-native';
import { ButtonProps } from 'common/types';
import Color from 'common/constants/colors';
import { CATEGORY_PHOTOS, CATEGORY_LABELS } from '../constants';

interface CategoryThumbnailProps extends ButtonProps {
    category: string,
}

function CategoryThumbnail({ category, onPress }: CategoryThumbnailProps) {
    return (
        <TouchableOpacity onPress={onPress} style={styles.thumbnail}>
            <ImageBackground
                source={CATEGORY_PHOTOS[category]}
                style={styles.imageBackground}
                imageStyle={styles.image}
            >
                <Text style={styles.name}>{CATEGORY_LABELS[category]}</Text>
            </ImageBackground>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    thumbnail: {
        justifyContent: 'center',
        height: 125,
        width: 125,
        backgroundColor: Color.DARK_GREEN,
        borderRadius: 5,
        marginRight: 16,
    },
    imageBackground: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        borderRadius: 5,
    },
    name: {
        fontSize: 20,
        fontWeight: 'bold',
        color: Color.OFF_WHITE,
        textShadowColor: Color.DARK_GREY,
        textShadowRadius: 20,
    },
});

export default CategoryThumbnail;
