import React, { Component } from 'react';
import { View, StyleSheet, Image, Dimensions, ScrollView } from 'react-native';
import { Text, Button, Content, Input, Item, Container, Header, Icon, Footer, FooterTab, Row } from 'native-base';

// import Carousel from 'react-native-banner-carousel';
// import { TouchableOpacity } from 'react-native-gesture-handler';

export default class ForYou extends Component {
    constructor() {
        super();
        this.state = {
            banner: [{
                title: '1.cover.png',
                picture: 'http://blog.evercoss.com/wp-content/uploads/2016/10/84a42-rekomendasi2bjudul2bline2bwebtoon2b-2bfeatured.jpg'
            }, {
                title: '2.introduction.png',
                picture: 'https://i.pinimg.com/originals/c1/6a/fd/c16afd4f703e5895bbf9867a82404142.jpg'
            },
            ]
        }
    }

    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Edit Episode',
            headerRight: (
                <Icon type="FontAwesome" name="check" style={{ marginRight: 10 }} onPress={() => navigation.navigate
                    ('EditMyWebtoonScreen')}
                />
            ),
        };
    }

    render() {
        return (
            <Container style={style.container}>
                <Content>
                    <View>
                        <Text style={style.title}>Name</Text>
                        <Item style={style.placeHolder} regular>
                            <Input placeholder='Ep. 1' />
                        </Item>
                        <Text style={style.title}>Add Images</Text>
                    </View>
                    <View>
                        {this.state.banner.map((item) => (
                            <View key={item.picture}>
                                <Row>
                                    <Image style={style.imageFavorite} source={{ uri: item.picture }}
                                    />
                                    <View>
                                        <Text style={style.titleImage} >{item.title}</Text>
                                    </View>
                                </Row>
                            </View>
                        ))}
                        <View>
                            <Button style={style.button} block success>
                                <Text>+ Image</Text>
                            </Button>
                            <Button style={style.buttonDelete} block danger>
                                <Text>Delete Episode</Text>
                            </Button>
                        </View>
                    </View>
                </Content>
            </Container>
        );
    }
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fafafa'
    },

    imageFavorite: {
        height: 100,
        width: 100,
        marginLeft: 30,
        marginTop: 10,
        borderWidth: 1,
        borderColor: 'silver',
        borderRadius: 5
    },
    titleImage: {
        fontSize: 23,
        marginLeft: 20,
        marginTop: 27
    },
    subtitleFav: {
        marginLeft: 20,
        fontSize: 15
    },
    title: {
        fontSize: 20,
        marginTop: 10,
        marginLeft: 20
    },
    placeHolder: {
        marginRight: 20,
        marginLeft: 20,
        marginTop: 5,
    },
    button: {
        marginLeft: 20,
        marginRight: 20,
        marginTop: 30
    },
    buttonDelete: {
        marginLeft: 20,
        marginRight: 20,
        marginTop: 20
    },
})