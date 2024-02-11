import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { useAssets } from 'expo-asset';
import * as SplashScreen from 'expo-splash-screen';
import {
    useFonts,
    Roboto_400Regular,
    Roboto_400Regular_Italic,
    Roboto_500Medium,
    Roboto_500Medium_Italic,
    Roboto_700Bold,
    Roboto_700Bold_Italic,
} from '@expo-google-fonts/roboto';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { AppContainer, store } from 'app';

SplashScreen.preventAutoHideAsync();

function App() {
    const [fontsLoaded] = useFonts({
        Roboto_400Regular,
        Roboto_400Regular_Italic,
        Roboto_500Medium,
        Roboto_500Medium_Italic,
        Roboto_700Bold,
        Roboto_700Bold_Italic,
        ...FontAwesome.font,
        ...Ionicons.font,
    });
    const [assets] = useAssets([
        require('categories/img/restaurant.jpg'),
        require('categories/img/bar.jpg'),
        require('categories/img/cafe.jpg'),
        require('categories/img/museum.jpg'),
        require('categories/img/park.jpg'),
        require('categories/img/restaurant-large.jpg'),
        require('categories/img/bar-large.jpg'),
        require('categories/img/cafe-large.jpg'),
        require('categories/img/museum-large.jpg'),
        require('categories/img/park-large.jpg'),
    ]);

    useEffect(() => {
        const hideSplashScreen = async () => {
            if (fontsLoaded && assets) {
                await SplashScreen.hideAsync();
            }
        }
        hideSplashScreen();
    }, [fontsLoaded, assets]);

    if (!fontsLoaded || !assets) {
        return null;
    }

    return (
        <Provider store={store}>
            <AppContainer />
        </Provider>
    );
}

export default App;
