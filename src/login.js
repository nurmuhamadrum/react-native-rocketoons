import React, { Component } from 'react';
import axios from 'axios';
import { View, Image, StyleSheet, StatusBar, TouchableOpacity } from 'react-native';
import { Text, Button, Content, Input, Item, Container } from 'native-base';
import { storeAuthKey, getAuthKey } from './config/auth'
import Modal from "react-native-modal";

import Icon from 'react-native-vector-icons/FontAwesome';

export default class Webtoon extends Component {
  constructor() {
    super();
    this.state = {
      icon: "eye-slash",
      pass: true,
      password: true,
      isDisabled: true,
      invalidPass: false,
      username: "",
      token: "",
      id: null,
      isModalVisible: false,
    }
    this.checkAuthorized();
  }

  checkAuthorized = async () => {
    try {
      const hasKey = await getAuthKey();
      this.props.navigation.navigate(hasKey ? 'ForYouScreen' : 'LoginScreen');
    } catch (error) {
      console.log(error);
    }
  }

  // Function Modal
  toggleModal = () => {
    this.setState({ isModalVisible: false })
  }

  // Function Button Sign In
  handleButtonFunction = () => {
    axios({
      method: 'POST',
      url: `http://192.168.1.30:5000/api/v1/login`, // REST API pada Backend
      data: {
        email: this.state.username,
        password: this.state.password
      }
    }).then(res => {
      this.setState({
        token: (res.data.code == "ERR_WRONG_EMAIL_PASS" ? null : res.data.token),
        id: (res.data.code == "ERR_WRONG_EMAIL_PASS" ? null : res.data.user.id)
      })

      if (this.state.token) {
        const user = {
          token: this.state.token,
          id: this.state.id,
        }
        storeAuthKey(user);
        this.props.navigation.navigate('ForYouScreen') // Navigasi ke For You Screen
      } else {
        this.setState({ isModalVisible: true })
      }
    }).catch((err) => {
      console.log("axios error:", err)
    })
  }

  // Function Eye Icon pada Password
  changeIcon() {
    this.setState(prevState => ({
      icon: prevState.icon === 'eye' ? 'eye-slash' : 'eye',
      pass: !prevState.pass
    }));
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
          <View style={style.imageContent}>
            <Image style={style.logoImage} source={{ uri: 'https://i.ibb.co/CBcY8K9/LOGO4.png' }} />
          </View>
          <Text style={style.emailInfo}>Login with your account <Text style={style.webtoon}>FAKETOON</Text></Text>
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
          <Button onPress={() => this.handleButtonFunction()}
            warning disabled={this.state.isDisabled} style={style.loginButton} rounded block>
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>SIGN IN</Text>
          </Button>
          <View style={style.registerNow}>
            <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Don't have an account?</Text>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('register')}>
              <Text style={style.registerFont}> REGISTER NOW!</Text>
            </TouchableOpacity>
          </View>
          <Modal isVisible={this.state.isModalVisible}>
            <View style={style.Modal}>
              <Text style={style.modalText}>Sorry, Wrong Email or Password!</Text>
              <TouchableOpacity title="Hide modal" onPress={() => this.toggleModal()}>
                <Text style={style.modalTryagain}>Please Try Again</Text>
              </TouchableOpacity>
            </View>
          </Modal>
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
  },
  emailInfo: {
    marginHorizontal: 50,
    marginBottom: 40
  },
  email: {
    marginBottom: 5,
    marginLeft: 5
  },
  password: {
    marginBottom: 1,
    marginLeft: 5,
    marginTop: 5
  },
  loginButton: {
    marginTop: 20,
    borderRadius: 10,
    elevation: 1
  },
  eyeIcon: {
    fontSize: 23,
    marginRight: 10
  },
  webtoon: {
    fontSize: 20,
    color: '#008B8B',
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
  logoImage: {
    height: 330,
    width: 330,
    alignItems: 'center',
    resizeMode: 'contain',

  },
  imageContent: {
    alignItems: 'center',
    marginBottom: -120,
    marginTop: -20
  },
  registerNow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 18
  },
  registerFont: {
    color: '#008B8B',
    fontWeight: 'bold',
    fontSize: 18
  },
  Modal: {
    backgroundColor: '#fafafa',
    alignItems: 'center',
    borderRadius: 10,
  },
  modalText: {
    marginTop: 15,
    marginBottom: 20,
    fontSize: 18
  },
  modalTryagain: {
    marginBottom: 15,
    fontWeight: 'bold',
    fontSize: 20
  }


})