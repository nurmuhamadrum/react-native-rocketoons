import React, { Component } from 'react';
import axios from 'axios';
import { StyleSheet, StatusBar } from 'react-native';
import { Text, Button, Content, Input, Item, Container } from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';

import Icon from 'react-native-vector-icons/FontAwesome'

export default class Register extends Component {
    constructor() {
        super();
        this.state = {
            icon: "eye-slash",
            pass: true,
            password: true,
            isDisabled: true,
            invalidPass: false,
            username: "",
            name: "",
            token: "",
            id: null

        }
    }

    // Function Button Register or Create Account
    handleSubmit = () => {
        axios({
            method: 'POST',
            url: `http://192.168.1.30:5000/api/v1/register`,
            data: {
                email: this.state.username,
                password: this.state.password
            }
        }).then(res => {
            console.log(res)
            this.props.navigation.navigate('LoginScreen') // Navigasi ke Login Screen

        }).catch(err => {
            console.log(err)
            alert("Something Wrong")
        })
    }

    // Function Merubah Eye Icon pada Password
    changeIcon() {
        this.setState(prevState => ({
            icon: prevState.icon === 'eye' ? 'eye-slash' : 'eye',
            pass: !prevState.pass
        }));
    }

    // Function Validasi Name or Username
    nameValidation(name) {
        const reg = /^[a-zA-Z0-9]+([a-zA-Z0-9](_|-| )[a-zA-Z0-9])*[a-zA-Z0-9]+$/
        if (reg.test(name) == true && this.state.password != null) {
            this.setState({
                name,
                isDisabled: false,
            })
        } else {
            this.setState({
                name,
                isDisabled: true,
            })
        }
        this.setState({
            name,
        })
    }

    // Function Validasi Email
    emailValidation(username) {
        const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (reg.test(username) == true && this.state.password != null) {
            this.setState({
                username,
                isDisabled: false,
            })
        } else {
            this.setState({
                username,
                isDisabled: true,
            })
        }
        this.setState({
            username,
        })
    }

    // Function Validasi Password
    passwordValidation(password) {
        const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        if (password != null && reg.test(this.state.username) == true) {
            this.setState({
                password,
                isDisabled: false,
            })
        } else {
            this.setState({
                password,
                isDisabled: true
            })
        }
        this.setState({
            password
        })
    }

    render() {
        return (
            <Container style={style.container}>
                <StatusBar barStyle="dark-content" hidden={false} backgroundColor="#008B8B" translucent={false} />
                <Content showsVerticalScrollIndicator={false} Vertical={true}>
                    <Text style={style.login}>CREATE <Text style={style.faketoon}>ACCOUNT</Text></Text>
                    <Text style={style.name}>Name</Text>
                    <Item style={style.placeHolder} regular>
                        <Input onChangeText={(text) => this.nameValidation(text)} placeholder='Enter the Name...' />
                    </Item>
                    <Text style={style.email}>Email</Text>
                    <Item style={style.placeHolder} regular>
                        <Input onChangeText={(text) => this.emailValidation(text)} placeholder='Enter the Email...' />
                    </Item>
                    <Text style={style.password}>Password</Text>
                    <Item style={style.placeHolder} regular>
                        <Input onChangeText={(pass) => this.passwordValidation(pass)}
                            secureTextEntry={this.state.pass}
                            placeholder='Enter the Password...' /><Icon style={style.eyeIcon} name={this.state.icon}
                                onPress={() => this.changeIcon()} />
                    </Item>
                    <Button onPress={() => this.handleSubmit()} success disabled={this.state.isDisabled} style={style.loginButton} rounded block>
                        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Create an Account</Text>
                    </Button>
                </Content>
            </Container>
        );
    }
}



const style = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#fafafa',
        alignItems: 'center',
    },
    login: {
        fontWeight: 'bold',
        fontSize: 50,
        color: '#008B8B',
        marginVertical: 10,
        marginTop: 130,
        marginBottom: 30
    },
    emailInfo: {
        marginHorizontal: 50,
        marginBottom: 40
    },
    email: {
        marginBottom: 5,
        marginLeft: 5,
        marginTop: 5
    },
    password: {
        marginBottom: 1,
        marginLeft: 5,
        marginTop: 5
    },
    loginButton: {
        marginTop: 20,
        borderRadius: 10,
    },
    eyeIcon: {
        fontSize: 23,
        marginRight: 10
    },
    webtoon: {
        fontSize: 20,
        color: '#FFA500',
        fontWeight: 'bold'
    },
    placeHolder: {
        borderRadius: 10,
        marginTop: 5,
        borderColor: 'silver',
        elevation: 1
    },
    faketoon: {
        fontSize: 50,
        color: '#FFA500',
        fontWeight: 'bold'
    },
    name: {
        marginBottom: 5,
        marginLeft: 5
    },


})