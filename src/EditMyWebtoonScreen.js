import React, { Component } from 'react';
import { View, StyleSheet, Image, Dimensions, ScrollView } from 'react-native';
import { Text, Button, Content, Input, Item, Container, Header, Icon, Footer, FooterTab, Row } from 'native-base';
import { TouchableOpacity } from 'react-native-gesture-handler';

// import Carousel from 'react-native-banner-carousel';
// import { TouchableOpacity } from 'react-native-gesture-handler';

export default class ForYou extends Component {
    constructor() {
        super();
        this.state = {
            banner: [{
                title: 'Episode 2',
                subtitle: '30 September 2019',
                picture: 'http://blog.evercoss.com/wp-content/uploads/2016/10/84a42-rekomendasi2bjudul2bline2bwebtoon2b-2bfeatured.jpg'
            }, {
                title: 'Episode 1',
                subtitle: '20 September 2019',
                picture: 'https://i.pinimg.com/originals/c1/6a/fd/c16afd4f703e5895bbf9867a82404142.jpg'
            },
            ]
        }
    }

    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Edit Webtoon',
            headerRight: (
                <Icon type="FontAwesome" name="check" style={{ marginRight: 10 }} onPress={() => navigation.navigate
                    ('MyWebtoonCreation')}
                />
            ),
        };
    }

    render() {
        return (
            <Container style={style.container}>
                <Content>
                    <View>
                        <Text style={style.title}>Title</Text>
                        <Item style={style.placeHolder} regular>
                            <Input placeholder='iMarried' />
                        </Item>
                        <Text style={style.title}>Episode</Text>
                    </View>
                    <View>
                        {this.state.banner.map((item) => (
                            <View key={item.picture}>
                                <Row>
                                    <TouchableOpacity onPress={() => this.props.navigation.navigate
                                        ('EditMyWebtoonEpisodeScreen')} >
                                        <Image style={style.imageFavorite} source={{ uri: item.picture }}
                                        />
                                    </TouchableOpacity>
                                    <View>
                                        <Text style={style.titleImage} >{item.title}</Text>
                                        <Text style={style.subtitle} >{item.subtitle}</Text>
                                    </View>
                                </Row>
                            </View>
                        ))}
                        <View>
                            <Button style={style.button} block success>
                                <Text>+ Episode</Text>
                            </Button>
                            <Button style={style.buttonDelete} block danger>
                                <Text>Delete Webtoon</Text>
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
    subtitle: {
        marginLeft: 20,
    }
})