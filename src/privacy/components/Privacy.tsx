import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';
import { openBrowserAsync } from 'expo-web-browser';
import { NavigationProps } from 'common/types';
import { BurgerButton } from 'common/components';
import Color from 'common/constants/colors';
import FontFamily from 'common/constants/fonts';
import { PRIVACY_POLICY_URL } from '../constants';

function Privacy({ navigation }: NavigationProps) {
    const privacyPolicyPress = () => openBrowserAsync(PRIVACY_POLICY_URL, {
        toolbarColor: Color.OFF_WHITE,
        controlsColor: Color.ORANGE,
    });

    return (
        <View style={styles.container}>
            <BurgerButton onPress={() => navigation.toggleDrawer()} />
            <View style={styles.headerContainer}>
                <Text style={styles.header}>Privacy Policy</Text>
            </View>
            <View style={styles.contentContainer}>
                <View style={styles.paragraph}>
                    <Text>Rendez Vous helps you meet up with friends in big cities. We also care about protecting your privacy.</Text>
                </View>
                <View style={styles.paragraph}>
                    <Text>Take a look at our </Text>
                    <TouchableOpacity onPress={privacyPolicyPress}>
                        <Text style={styles.link}>privacy policy</Text>
                    </TouchableOpacity>
                    <Text> for more information.</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: Color.OFF_WHITE,
        paddingTop: Constants.statusBarHeight,
        paddingLeft: 24,
        paddingRight: 24,
    },
    headerContainer: {
        height: 55,
        width: '100%',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    header: {
        fontFamily: FontFamily.TITLE,
        color: Color.DARK_GREY,
        fontSize: 22,
    },
    contentContainer: {
        paddingTop: 30
    },
    paragraph: {
        flexDirection: 'row',
        marginBottom: 22,
        fontSize: 14,
    },
    link: {
        fontFamily: FontFamily.CTA,
        color: Color.DARK_GREEN,
    }
});

export default Privacy;
