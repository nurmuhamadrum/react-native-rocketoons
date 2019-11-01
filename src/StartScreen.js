import React, { Component } from 'react'
import { StyleSheet, Image, View } from 'react-native'
import { getToken } from './config'

export default class StartScreen extends Component {
    async componentDidMount() {
        const data = await getToken()
        try {
            if (data) {
                this.props.navigation.navigate('MainPage')
            } else {
                this.props.navigation.navigate('LoginScreen')
            }
        } catch (error) {
            console.log(error)
        }
    }

    render() {
        return (
            <View style={style.imageContent}>
                <Image style={style.logoImage} source={{ uri: 'https://i.ibb.co/CBcY8K9/LOGO4.png' }} />
            </View>
        )
    }

}

const style = StyleSheet.create({
    logoImage: {
        height: 330,
        width: 330,
        resizeMode: 'contain',

    },
    imageContent: {
        alignItems: 'center',
        marginTop: 150,
    }
})
