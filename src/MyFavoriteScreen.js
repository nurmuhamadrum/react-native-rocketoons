import React, { Component } from 'react';
import axios from 'axios';
import { View, StyleSheet, Image, StatusBar } from 'react-native';
import { Text, Button, Content, Input, Item, Container, Header, Icon, Row } from 'native-base';
import { connect } from 'react-redux';

import { getAuthKey } from './config/auth';
import { setHeaderAuth } from './config/api';
import { METHOD_GET, METHOD_POST, METHOD_DELETE, } from './config/constants';
import fetchFavorites from './_store/favorites';
class MyFavoriteScreen extends Component {
    constructor() {
        super();
        this.state = {
            banner: []
        }
    }

    componentDidMount() {
        this.handleGetFavToons();
    }

    handleGetFavToons = async () => {
        try {
            const user = await getAuthKey();
            setHeaderAuth(user.token);
            this.props.fetchFavorites(METHOD_GET, user.id, null);
        } catch (error) {
            console.log(error);
        }
    };

    handleSearchToon = async title => {
        try {
            const user = await getAuthKey();
            this.props.fetchFavorites(user.id, true, title);
        } catch (error) {
            console.log(error);
        }
    };

    render() {
        const { favorites } = this.props;

        if (favorites.isLoading)
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
                        {favorites.data.map((favorites) => (
                            <View key={favorites.image}>
                                <Row>
                                    <Image style={style.imageFavorite} source={{ uri: favorites.webtoons.image }}
                                    />
                                    <View>
                                        <Text style={style.titleFav}>{favorites.webtoons.title}</Text>
                                        <Text style={style.subtitleFav}>{favorites.webtoons.subtitle}</Text>
                                    </View>
                                </Row>
                            </View>
                        ))}
                    </View>

                </Content>
            </Container>
        );
    }
}

const mapStateToProps = state => {
    return {
        favorites: state.favorites,
    };
};

const mapDispatchToProps = {
    fetchFavorites,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(MyFavoriteScreen);


const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fafafa'
    },
    header: {
        backgroundColor: '#008B8B'
    },
    footer: {

    },
    footerTab: {
        backgroundColor: 'green'
    },
    imageFavorite: {
        height: 100,
        width: 100,
        marginLeft: 30,
        marginTop: 15,
        borderWidth: 0.5,
        borderColor: '#D3D3D3',
        borderRadius: 4
    },
    titleFav: {
        fontSize: 20,
        marginLeft: 20,
        marginTop: 30
    },
    subtitleFav: {
        marginLeft: 20,
        fontSize: 15
    }
})