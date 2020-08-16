import React from 'react';
import { ScrollView } from 'react-native';
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
    return (
        <ScrollView horizontal={true}>
            {CATEGORIES.map(category => (
                <CategoryThumbnail key={category.name.toLowerCase()} category={category.name} />
            ))}
        </ScrollView>
    );
}

export default CategoryList;
