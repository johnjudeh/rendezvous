import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { ChildrenProps } from '../common/types';
import Color from '../constants/colors';

interface DockProps extends ChildrenProps {
    title?: string,
    style?: Object,
}

function Dock({ children, title, style }: DockProps) {
    return (
        <View style={[styles.dock, style]}>
            {title
                ? <View style={styles.titleContainer}>
                    <Text style={styles.title}>{title}</Text>
                </View>
                : null
            }
            <View style={styles.childrenContainer}>
                {children}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    dock: {
        minHeight: 110,
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
    titleContainer: {
        height: 56,
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomColor: Color.LIGHT_GREY,
        borderBottomWidth: 1,
    },
    title: {
        fontSize: 20,
        color: Color.DARK_GREY,
        fontWeight: '500',
    },
    childrenContainer: {
        paddingLeft: 14,
        paddingRight: 14,
        paddingTop: 20,
        paddingBottom: 30,
        justifyContent: 'center',
        flexGrow: 1,
    }
});

export default Dock;
