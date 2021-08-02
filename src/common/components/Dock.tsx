import React from 'react';
import { StyleSheet, View, Text, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ChildrenProps } from 'common/types';
import Color from 'common/constants/colors';
import FontFamily from 'common/constants/fonts';

interface DockProps extends ChildrenProps {
    title?: string,
    style?: Object,
}

function Dock({ children, title, style }: DockProps) {
    const dock = <View style={[styles.dock, style]}>
        {title
            ? <View style={styles.titleContainer}>
                <Text style={styles.title}>{title}</Text>
            </View>
            : null
        }
        <View style={styles.childrenContainer}>
            {children}
        </View>
    </View>;

    return (
        Platform.OS == 'ios'
            ? dock
            : <LinearGradient
                // This component is used to create a shadow on
                // Android as elevation is not featureful enough
                colors={['transparent', Color.DARK_GREY]}
                end={{ x: 0, y: 0.40 }}
                style={styles.dockShadow}
            >
                {dock}
            </LinearGradient>
    );
}

const styles = StyleSheet.create({
    dockShadow: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        paddingTop: 7,
        borderTopRightRadius: 5,
        borderTopLeftRadius: 5,
    },
    dock: {
        ...Platform.select({
            ios: {
                position: 'absolute',
                bottom: 0,
                width: '100%',
                shadowOffset: {
                    width: 0,
                    height: -2,
                },
                shadowRadius: 5,
                shadowOpacity: 0.20,
            }
        }),
        backgroundColor: Color.OFF_WHITE,
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        shadowColor: Color.DARK_GREY,
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
