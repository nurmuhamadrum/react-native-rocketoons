import React, { Component } from 'react';
import { View, StyleSheet, Image, Dimensions, ScrollView } from 'react-native';
import { Text, Button, Content, Input, Item, Container, Header, Icon, Footer, FooterTab, Row } from 'native-base';
import { TouchableOpacity } from 'react-native-gesture-handler';

// import Carousel from 'react-native-banner-carousel';

export default class ForYou extends Component {
    constructor() {
        super();
        this.state = {
            banner: [{
                title: 'Tahilalats',
                subtitle: '100+ Favorite',
                picture: 'http://blog.evercoss.com/wp-content/uploads/2016/10/84a42-rekomendasi2bjudul2bline2bwebtoon2b-2bfeatured.jpg'
            }, {
                title: 'Si Ocong',
                subtitle: '95 Favorite',
                picture: 'https://i.pinimg.com/originals/c1/6a/fd/c16afd4f703e5895bbf9867a82404142.jpg'
            }, {
                title: 'Si Juki',
                subtitle: '50 Favorite',
                picture: 'https://www.teknosaurus.com/wp-content/uploads/2017/07/CV-Aplikasi-Baca-Komik-Si-Juki-dan-Mang-Awung.jpg'
            }, {
                title: 'Dracko',
                subtitle: '80 Favorite',
                picture: 'https://i.ytimg.com/vi/w8In94uz_EY/maxresdefault.jpg'
            },
            ]
        }
    }

    static navigationOptions = ({ navigation }) => {
        return {
            title: 'My Webtoon Creation',
        };
    }


    render() {
        return (
            <Container style={style.container}>
                <Content>
                    <View>
                        {this.state.banner.map((item) => (
                            <View key={item.picture}>
                                <Row>
                                    <TouchableOpacity onPress={() => this.props.navigation.navigate
                                        ('EditMyWebtoonScreen')}>
                                        <Image style={style.imageFavorite} source={{ uri: item.picture }}
                                        />
                                    </TouchableOpacity>
                                    <View>
                                        <Text style={style.titleFav} >{item.title}</Text>
                                        <Text style={style.subtitleFav} >{item.subtitle}</Text>
                                    </View>
                                </Row>
                            </View>
                        ))}
                    </View>
                    <View>
                        <Icon onPress={() => this.props.navigation.navigate('CreateWebtoonScreen')} style={style.iconPlus} type="FontAwesome" name="plus" />
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
        marginTop: 20,
        borderWidth: 2,
        borderColor: '#008B8B',
        borderRadius: 4
    },
    titleFav: {
        fontSize: 22,
        marginLeft: 20,
        marginTop: 40
    },
    subtitleFav: {
        marginLeft: 20,
        fontSize: 15
    },
    iconPlus: {
        fontSize: 60,
        color: 'orange',
        marginLeft: 340,
        marginTop: 40
    }
})