import React from 'react';
import { Provider } from 'react-redux';
import { AppContainer, store } from 'app';

function App() {
    return (
        <Provider store={store}>
            <AppContainer />
        </Provider>
    );
}

export default App;
