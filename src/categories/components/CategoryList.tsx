import React from 'react';
import { ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CategoryThumbnail from './CategoryThumbnail';

const CATEGORIES = [
    {
        name: 'Restaurants',
    },
    {
        name: 'Bars',
    },
    {
        name: 'Museums',
    },
];

function CategoryList() {
    const navigation = useNavigation();

    return (
        <ScrollView horizontal={true}>
            {CATEGORIES.map(category => (
                <CategoryThumbnail
                    key={category.name.toLowerCase()}
                    category={category.name}
                    onPress={() => navigation.navigate('category', { category })}
                />
            ))}
        </ScrollView>
    );
}

export default CategoryList;
