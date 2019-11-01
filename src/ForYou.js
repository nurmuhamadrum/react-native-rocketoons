import React, { Component } from 'react';
import { View, StyleSheet, Image, ScrollView, StatusBar } from 'react-native';
import { Text, Button, Content, Input, Item, Container, Header, Icon, Row } from 'native-base';
import { connect } from 'react-redux';

import { getAuthKey } from './config/auth';
import { setHeaderAuth } from './config/api';
import fetchAllToons from './_store/toons';
import fetchFavorites from './_store/favorites';

import { METHOD_GET, METHOD_POST, METHOD_DELETE, } from './config/constants';

import Carousel from 'react-native-banner-carousel';
import { TouchableOpacity } from 'react-native-gesture-handler';

const BannerWidth = 408;
const BannerHeight = 210;

class ForYou extends Component {
    constructor() {
        super();
        this.state = {
            bannerSlider: [
                {
                    title: 'Tahilalats',
                    image: 'https://media.skyegrid.id/wp-content/uploads/2018/08/komik-tahilalats_20170608_124932-1600x800.jpg'
                },
                {
                    title: 'Si Ocong',
                    image: 'https://obs.line-scdn.net/0hMOyCN9hsEmBEOj8CkgRtN31sEQ93VgFjIAxDfhRUTFQ6C1FjK1tVBjM-T1ZuWVU-LV1bA2V_TVlsCVQ1fFQ/w580'
                },
                {
                    title: 'Si Juki',
                    image: 'https://d26bwjyd9l0e3m.cloudfront.net/wp-content/uploads/2016/08/Si-Juki-Kerokan-Master-Featured.jpg'
                }
            ],
        }
    }

    componentDidMount() {
        this.handleGetAllToons();
    }

    handleGetAllToons = async () => {
        try {
            const user = await getAuthKey();
            setHeaderAuth(user.token);
            this.props.fetchAllToons(user.id, false, null);
            this.props.fetchFavorites(METHOD_GET, user.id, null);
        } catch (error) {
            console.log(error);
        }
    };

    renderPage(image, index) {
        return (
            <View key={index}>
                <Image style={{ width: BannerWidth, height: BannerHeight }}
                    source={{ uri: image.image }} />
            </View>
        );
    }

    handleSearchToon = async title => {
        try {
            const user = await getAuthKey();
            this.props.fetchAllToons(user.id, true, title);
        } catch (error) {
            console.log(error);
        }
    };

    render() {
        const { toons, favorites } = this.props;

        if (toons.isLoading)
            return <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontWeight: 'bold' }}>Loading, Please Wait...</Text>
            </View>

        return (
            <Container style={style.container}>
                <Header style={style.header} searchBar rounded>
                    <StatusBar barStyle="dark-content" hidden={false} backgroundColor="#008B8B" translucent={false} />
                    <Item>
                        <Input placeholder=" Search"
                            onChangeText={title => this.handleSearchToon(title)} />
                        <Icon name="ios-search" />
                    </Item>
                    <Button transparent>
                        <Text>Search</Text>
                    </Button>
                </Header>

                <Content>
                    <View>
                        <View style={style.imageCarousel}>
                            <Carousel
                                autoplay
                                autoplayTimeout={6000}
                                loop
                                index={0}
                                pageSize={BannerWidth}>
                                {this.state.bannerSlider.map((image, index) => this.renderPage(image, index))}
                            </Carousel>
                        </View>
                        <View>
                            <Text style={style.favorite}>Your Favorite Comics</Text>
                            <ScrollView showsHorizontalScrollIndicator={false} horizontal={true} >
                                {favorites.data.map((favorites) => (
                                    <View key={favorites.id}>
                                        <TouchableOpacity onPress={() => {
                                            this.props.navigation.navigate('DetailWebtoonScreen', { imageBanner: favorites.webtoons.image })
                                        }}>
                                            <Image style={style.imageFavorite}
                                                source={{ uri: favorites.webtoons.image }}
                                            />
                                        </TouchableOpacity>
                                        <Text style={style.textFav}>{favorites.webtoons.title} </Text>
                                    </View>
                                ))}
                            </ScrollView>
                        </View>
                        <View>
                            <Text style={style.allText}>All</Text>
                            {toons.data.map((toon) => (
                                <View key={toon.id}>
                                    <Row>
                                        <TouchableOpacity onPress={() => {
                                            this.props.navigation.navigate('DetailWebtoonScreen', { imageBanner: toon.image })
                                        }}>
                                            <Image style={style.imageRow} source={{ uri: toon.image }}
                                            />
                                        </TouchableOpacity>
                                        <View>
                                            <Text style={style.titleFav} >{toon.title}</Text>
                                            <Button small style={style.titleButton}>
                                                <Text style={style.favButton}>+ Favourite</Text>
                                            </Button>
                                        </View>
                                    </Row>
                                </View>
                            ))}
                        </View>
                    </View>

                </Content>
            </Container>
        );
    }
}

const mapStateToProps = state => {
    return {
        toons: state.toons,
        favorites: state.favorites,
    };
};

const mapDispatchToProps = {
    fetchAllToons,
    fetchFavorites,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ForYou);

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FAFAFA'
    },
    header: {
        backgroundColor: '#008B8B'
    },
    footer: {

    },
    favorite: {
        fontSize: 20,
        marginTop: 10,
        marginLeft: 20,
        marginBottom: 10
    },
    imageFavorite: {
        height: 150,
        width: 130,
        marginLeft: 10,
        marginTop: 5,
        borderWidth: 0.5,
        borderColor: '#D3D3D3',
        borderRadius: 4,
    },
    imageRow: {
        height: 110,
        width: 100,
        marginLeft: 20,
        marginBottom: 10,
        marginTop: 5,
        borderWidth: 0.5,
        borderColor: '#D3D3D3',
        borderRadius: 4
    },
    allText: {
        marginLeft: 20,
        marginTop: 5,
        marginBottom: 5,
        fontSize: 20
    },
    titleFav: {
        marginLeft: 20,
        marginTop: 20
    },
    titleButton: {
        marginLeft: 20,
        marginTop: 10,
        borderRadius: 10,
        backgroundColor: "#FFA500",
        elevation: 5
    },
    textFav: {
        marginLeft: 20,
        marginTop: 10,
        marginBottom: 10
    },
    imageCarousel: {
        borderWidth: 0.5,
        borderColor: '#D3D3D3',
        // marginTop: 10,
        // marginRight: 10,
        // marginLeft: 10,
    },

})


