import React, { Component } from 'react';
import { Image, PixelRatio, StyleSheet, TouchableOpacity, View, } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import { Text, Button, Content, Input, Item, Container, Header, Icon, Footer, FooterTab, Row } from 'native-base';

export default class Profile extends Component {
    state = {
        avatarSource: null,
        videoSource: null,
    };

    constructor(props) {
        super(props);

        this.selectPhotoTapped = this.selectPhotoTapped.bind(this);
        this.selectVideoTapped = this.selectVideoTapped.bind(this);
    }

    selectPhotoTapped() {
        const options = {
            quality: 1.0,
            maxWidth: 500,
            maxHeight: 500,
            storageOptions: {
                skipBackup: true,
            },
        };

        ImagePicker.showImagePicker(options, response => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled photo picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                let source = { uri: response.uri };

                // You can also display the image using data:
                // let source = { uri: 'data:image/jpeg;base64,' + response.data };

                this.setState({
                    avatarSource: source,
                });
            }
        });
    }

    selectVideoTapped() {
        const options = {
            title: 'Video Picker',
            takePhotoButtonTitle: 'Take Video...',
            mediaType: 'video',
            videoQuality: 'medium',
        };

        ImagePicker.showImagePicker(options, response => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled video picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                this.setState({
                    videoSource: response.uri,
                });
            }
        });
    }

    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Edit Profile',
            headerRight: (
                <Icon type="FontAwesome" name="check" style={{ marginRight: 10 }} onPress={() => navigation.navigate('Profile')}
                />
            ),
        };
    }

    render() {
        return (
            <Container style={style.container}>
                <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
                    <View
                        style={[style.avatar, style.avatarContainer, { marginBottom: 10 }]}>
                        {this.state.avatarSource === null ? (
                            <Text>Select a Photo</Text>
                        ) : (
                                <Image style={style.avatarImage} source={this.state.avatarSource} />
                            )}
                    </View>
                </TouchableOpacity>
                <View >
                    <Item style={style.placeholder} regular>
                        <Input placeholder='Edit Your Name Here' />
                    </Item>
                </View>
            </Container>
        );
    }
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#F5FCFF',
    },
    avatarContainer: {
        borderColor: '#9B9B9B',
        borderWidth: 2 / PixelRatio.get(),
        marginTop: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatar: {
        borderRadius: 100,
        width: 200,
        height: 200,
        marginLeft: 100,
        marginTop: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    placeholder: {
        marginTop: 20,
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 300,
        borderWidth: 1,
        borderColor: 'silver'
    },
    avatarImage: {
        borderRadius: 100,
        width: 195,
        height: 195,
        marginLeft: 5,
        marginRight: 5,
        marginTop: 1,
    }
});