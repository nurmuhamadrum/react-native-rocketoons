import React, { Component } from 'react';
import axios from 'axios';
import { View, StyleSheet, Image, Share } from 'react-native';
import { Text, Button, Content, Input, Item, Container, Row, Icon } from 'native-base';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';


export default class DetailWebtoon extends Component {

    constructor(props) {
        super(props);
        this.state = {
            detailEps: [],
            id: props.navigation.getParam('imageEps')
        }
    }

    componentDidMount() {
        console.log(this.state.id)
        //console.log(this.props.navigation.state)
        axios.get(`http://192.168.1.30:5000/api/v1/webtoon/${this.state.id}/episodes`)
            .then(res => {
                const data = res.data
                this.setState({ detailEps: data })
            })
    }

    static navigationOptions = ({ navigation }) => {
        return {
            title: 'All Chapter',
            headerRight: (
                <Icon type="FontAwesome" name="share-alt" style={{ marginRight: 10 }} onPress={() => Share.share({ message: "tes" })}
                />
            ),
        };
    }

    render() {
        return (
            <Container style={style.container}>
                <Content>
                    <View>
                        <Image style={style.imageBanner} source={{ uri: this.props.navigation.getParam('imageBanner') }} />
                    </View>
                    <Text style={style.chapterText}>All Chapter</Text>
                    <View>
                        <FlatList
                            data={this.state.detailEps}
                            keyExtractor={(item) => item.id}
                            renderItem={({ item }) =>
                                <View>
                                    <View key={item.image}>
                                        <Row>
                                            <TouchableOpacity onPress={() => this.props.navigation.navigate
                                                ('DetailEpisodeScreen', { EpsId: item.id, WebtoonId: item.webtoon_id })}>
                                                <Image style={style.imageItem} source={{ uri: item.image }} />
                                            </TouchableOpacity>
                                            <View>
                                                <Text style={style.titleImage}>{item.title}</Text>
                                                <Text style={style.titleDate}>{item.date}</Text>
                                            </View>
                                        </Row>
                                    </View>
                                </View>
                            }
                        />
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
    imageBanner: {
        height: 250,
        width: 390,
        borderWidth: 1,
        borderColor: '#D3D3D3',
        marginTop: 10,
        marginLeft: 10,
        borderRadius: 5
    },
    imageItem: {
        height: 100,
        width: 100,
        marginLeft: 30,
        borderWidth: 1,
        borderColor: '#D3D3D3',
        marginTop: 10,
        borderRadius: 5,
        marginBottom: 10,

    },
    chapterText: {
        fontSize: 22,
        marginLeft: 30,
        marginTop: 15
    },
    titleImage: {
        fontSize: 20,
        marginTop: 30,
        marginLeft: 15
    },
    titleDate: {
        marginLeft: 16,
        fontSize: 14
    }
})

