import React, { Component } from 'react';
import axios from 'axios';
import { View, StyleSheet, Image, Share } from 'react-native';
import { Text, Button, Content, Input, Item, Container, Row, Icon } from 'native-base';
import { FlatList } from 'react-native-gesture-handler';

export default class DetailEpisodeScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            Episode: [],
            webtoonId: props.navigation.getParam('WebtoonId'),
            epsId: props.navigation.getParam('EpsId')
        }
    }


    componentDidMount() {
        //console.log(this.props.navigation.state)
        axios.get(`http://192.168.1.30:5000/api/v1/webtoon/${this.state.webtoonId}/episode/${this.state.epsId}`)
            .then(res => {
                const data = res.data
                this.setState({ Episode: data })
            })
    }

    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Detail Chapter',
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
                        <FlatList
                            data={this.state.Episode}
                            keyExtractor={(item) => item.id}
                            renderItem={({ item }) =>
                                <View>
                                    <View key={item.image}>
                                        <Row>
                                            <Image style={style.image} source={{ uri: item.image }} />
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
    image: {
        height: 400,
        width: 400,
        marginLeft: 5,
        marginTop: 20,
        marginBottom: 50
    }
})