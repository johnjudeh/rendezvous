import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ChildrenProps } from '../common/types';
import Color from '../constants/colors';

function Dock(props: ChildrenProps) {
    return (
        <View style={styles.dock}>
            {props.children}
        </View>
    );
}

const styles = StyleSheet.create({
    dock: {
        justifyContent: 'center',
        minHeight: 110,
        paddingLeft: 29,
        paddingRight: 29,
        backgroundColor: Color.OFF_WHITE,
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        shadowColor: Color.DARK_GREY,
        shadowOffset: {
            width: 0,
            height: -2,
        },
        shadowRadius: 5,
        shadowOpacity: 0.20,
    },
});

export default Dock;
