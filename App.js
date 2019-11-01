import React from 'react';
import { Provider } from 'react-redux';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import store from './src/_store';
import Route from './Route'

const RootNavigation = createAppContainer(
    createSwitchNavigator(
        {
            AuthLoading: Route
        },
        {
            initialRouteName: 'AuthLoading',
        },
    ),
);

const App = () => {
    return (
        <Provider store={store}>
            <RootNavigation />
        </Provider>
    );
};

export default App;