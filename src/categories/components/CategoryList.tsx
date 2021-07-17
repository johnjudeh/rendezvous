import React from 'react';
import { ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { CATEGORY_LABELS } from '../constants';
import CategoryThumbnail from './CategoryThumbnail';

function CategoryList() {
    const navigation = useNavigation();

    return (
        <ScrollView
            horizontal={true}
            fadingEdgeLength={20}
            overScrollMode={'always'}
        >
            {Object.keys(CATEGORY_LABELS).map(category => (
                <CategoryThumbnail
                    key={category}
                    category={category}
                    onPress={() => navigation.navigate('Category', { category })}
                />
            ))}
        </ScrollView>
    );
}

export default CategoryList;
