import React from 'react';
import { ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { CATEGORY_LABELS } from '../constants';
import CategoryThumbnail from './CategoryThumbnail';

function CategoryList() {
    const navigation = useNavigation();

    return (
        <ScrollView horizontal={true}>
            {Object.keys(CATEGORY_LABELS).map(category => (
                <CategoryThumbnail
                    key={category}
                    category={CATEGORY_LABELS[category]}
                    onPress={() => navigation.navigate('category', { category })}
                />
            ))}
        </ScrollView>
    );
}

export default CategoryList;
