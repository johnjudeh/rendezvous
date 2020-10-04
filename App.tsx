import React from 'react';
import { Provider } from 'react-redux';
import { AppLoading } from 'expo';
import {
    useFonts,
    Roboto_400Regular,
    Roboto_400Regular_Italic,
    Roboto_500Medium,
    Roboto_500Medium_Italic,
    Roboto_700Bold,
    Roboto_700Bold_Italic,
} from '@expo-google-fonts/roboto';
import { AppContainer, store } from 'app';

function App() {
    const [fontsLoaded] = useFonts({
        Roboto_400Regular,
        Roboto_400Regular_Italic,
        Roboto_500Medium,
        Roboto_500Medium_Italic,
        Roboto_700Bold,
        Roboto_700Bold_Italic,
    });

    if (!fontsLoaded) {
        return <AppLoading />;
    }

    return (
        <Provider store={store}>
            <AppContainer />
        </Provider>
    );
}

export default App;
