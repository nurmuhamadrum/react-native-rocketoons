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
                title: 'Episode 4',
                subtitle: '30 September 2019',
                picture: 'http://blog.evercoss.com/wp-content/uploads/2016/10/84a42-rekomendasi2bjudul2bline2bwebtoon2b-2bfeatured.jpg'
            }, {
                title: 'Episode 3',
                subtitle: '20 September 2019',
                picture: 'https://i.pinimg.com/originals/c1/6a/fd/c16afd4f703e5895bbf9867a82404142.jpg'
            }, {
                title: 'Episode 2',
                subtitle: '10 September 2019',
                picture: 'https://www.teknosaurus.com/wp-content/uploads/2017/07/CV-Aplikasi-Baca-Komik-Si-Juki-dan-Mang-Awung.jpg'
            }, {
                title: 'Episode 1',
                subtitle: '1 September 2019',
                picture: 'https://i.ytimg.com/vi/w8In94uz_EY/maxresdefault.jpg'
            },
            ]
        }
    }

    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Create Webtoon Screen',
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
                            <Input placeholder='Input the Title' />
                        </Item>
                        <Text style={style.title}>Episode</Text>
                    </View>
                    <View>
                        {this.state.banner.map((item) => (
                            <View key={item.picture}>
                                <Row>
                                    <Image style={style.imageFavorite} source={{ uri: item.picture }}
                                    />
                                    <View>
                                        <Text style={style.titleFav} >{item.title}</Text>
                                        <Text style={style.subtitleFav} >{item.subtitle}</Text>
                                    </View>
                                </Row>
                            </View>
                        ))}
                        <View>
                            <Button onPress={() => this.props.navigation.navigate
                                ('CreateWebtoonEpisodeScreen')} style={style.button} block success>
                                <Text>+ Add Episode</Text>
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
        height: 80,
        width: 80,
        marginLeft: 30,
        marginTop: 10,
        borderWidth: 1,
        borderColor: 'silver',
        borderRadius: 5
    },
    titleFav: {
        fontSize: 20,
        marginLeft: 20,
        marginTop: 20
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
    }
})