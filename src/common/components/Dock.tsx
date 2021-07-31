import React from 'react';
import { StyleSheet, View, Text, Platform } from 'react-native';
import { ChildrenProps } from 'common/types';
import Color from 'common/constants/colors';
import FontFamily from 'common/constants/fonts';

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
        position: 'absolute',
        bottom: 0,
        width: '100%',
        backgroundColor: Color.OFF_WHITE,
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        ...Platform.select({
            android: {
                elevation: 30,
            },
            default: {
                shadowColor: Color.DARK_GREY,
                shadowOffset: {
                    width: 0,
                    height: -2,
                },
                shadowRadius: 5,
                shadowOpacity: 0.20,
            },
        }),
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
        fontFamily: FontFamily.TITLE,
    },
    childrenContainer: {
        paddingLeft: 14,
        paddingRight: 14,
        paddingTop: 20,
        paddingBottom: Platform.OS === 'ios' ? 30 : 20,
        justifyContent: 'center',
        flexGrow: 1,
    }
});

export default Dock;
