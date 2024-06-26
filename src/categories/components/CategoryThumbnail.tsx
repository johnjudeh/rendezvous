import React from 'react';
import { StyleSheet, TouchableOpacity, Text, ImageBackground, TouchableOpacityProps } from 'react-native';
import Color from 'common/constants/colors';
import FontFamily from 'common/constants/fonts';
import { CATEGORY_PHOTOS, CATEGORY_LABELS } from '../constants';

interface CategoryThumbnailProps extends TouchableOpacityProps {
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
        fontFamily: FontFamily.CTA,
        color: Color.OFF_WHITE,
        textShadowColor: Color.DARK_GREY,
        textShadowRadius: 20,
    },
});

export default CategoryThumbnail;
