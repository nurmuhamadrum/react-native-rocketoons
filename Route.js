/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import login from './src/login';
import ForYou from './src/ForYou';
import DetailWebtoon from './src/DetailWebtoon';
import DetailEpisodeScreen from './src/DetailEpisodeScreen';
import MyFavoriteScreen from './src/MyFavoriteScreen';
import Profile from './src/Profile';
import EditProfileScreen from './src/EditProfileScreen';
import MyWebtoonCreation from './src/MyWebtoonCreation';
import CreateWebtoonScreen from './src/CreateWebtoonScreen';
import CreateWebtoonEpisodeScreen from './src/CreateWebtoonEpisodeScreen';
import EditMyWebtoonScreen from './src/EditMyWebtoonScreen';
import EditMyWebtoonEpisodeScreen from './src/EditMyWebtoonEpisodeScreen';
import register from './src/register';
import StartScreen from './src/StartScreen'

import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import { createBottomTabNavigator } from 'react-navigation-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';

import { Container, Content, View, Text, Row, Form, Item, Input, Button } from 'native-base';


const MainPage = createStackNavigator(
    {
        ForYouScreen: {
            screen: ForYou,
            title: 'For You',
            navigationOptions: { header: null },
        },
        DetailWebtoonScreen: {
            screen: DetailWebtoon,
            title: 'Detail Webtoon',
        },
        DetailEpisodeScreen: {
            screen: DetailEpisodeScreen,
            title: 'Detail Episode'
        },

        initialRouteName: 'ForYou',
    });

const ProfileStack = createStackNavigator({
    Profile: {
        screen: Profile,
        navigationOptions: { header: null },
        title: 'My Favorite Screen'
    },
    EditProfileScreen: {
        screen: EditProfileScreen,
    }, MyWebtoonCreation: {
        screen: MyWebtoonCreation,
        title: 'My Webtoon Creation'
    },
    CreateWebtoonScreen: {
        screen: CreateWebtoonScreen,
        title: 'Create Webtoon Screen'
    },
    CreateWebtoonEpisodeScreen: {
        screen: CreateWebtoonEpisodeScreen,
        title: 'Create Webtoon Episode Screen'
    },
    EditMyWebtoonScreen: {
        screen: EditMyWebtoonScreen,
        title: 'Edit My Webtoon Screen'
    },
    EditMyWebtoonEpisodeScreen: {
        screen: EditMyWebtoonEpisodeScreen,
        title: 'Edit My Webtoon Episode Screen'
    },
})

const TabNavigator = createBottomTabNavigator({
    ForYou: MainPage,
    Favorite: {
        screen: MyFavoriteScreen,
        title: 'My Favorite Screen'
    },
    Profile: ProfileStack,
}, {
    defaultNavigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ horizontal, tintColor }) => {
            const { routeName } = navigation.state;
            let iconName;
            if (routeName === 'ForYou') {
                iconName = `th-large`;
            } else if (routeName === 'Favorite') {
                iconName = `star`;
            } else if (routeName === 'Profile') {
                iconName = `user`;
            }
            return <Icon type="FontAwesome" name={iconName} size={30} style={{ color: tintColor, }} />;
        },
    }),
    tabBarOptions: {
        activeTintColor: '#FFA500',
        inactiveTintColor: 'white',
        style: {
            backgroundColor: '#008B8B',
            paddingTop: 10,

        },
    },
});

const Login = createSwitchNavigator({
    StartScreen: {
        screen: StartScreen,
        navigationOptions: { header: null },
    },
    LoginScreen: {
        screen: login,
        navigationOptions: { header: null },
    },
    MainPage: TabNavigator,
    register: {
        screen: register,
        title: 'register',
        navigationOptions: { header: null },
    },
},

    { initialRoutineName: 'LoginScreen', }
);

export default createAppContainer(Login);

// export default StartScreen;
