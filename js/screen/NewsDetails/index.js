import React, { Component } from "react";
import { AsyncStorage, ScrollView, Dimensions, Keyboard, Image, View, StatusBar } from "react-native";
import {
    Spinner,
    Container,
    Toast,
    Header,
    Title,
    Content,
    Text,
    H3,
    Button,
    Icon,
    Footer,
    FooterTab,
    Left,
    Right,
    Body
} from "native-base";
import styles from "./styles";
import axios from "axios";
import api from "../../../utilities/Api";
import HTML from 'react-native-render-html';

class NewsDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            currentPage: 1,
            error: false,
            errorInfo: "",
            data: {}
        };
        this.onChange = this.onChange.bind(this);
    }

    componentWillMount() {
        this._loadInitialState().done();
    }

    async _loadInitialState() {
        try {
            var parent = this;
            var accessToken = await AsyncStorage.getItem("Token");
            if (accessToken != null) {
                console.log('id=', parent.props.navigation.state.params.id);
                axios
                    .get(`http://demo.easymove.vn/api/news/${parent.props.navigation.state.params.id}?page=1`, {
                        headers: {
                            Accept: "application/json",
                            "Content-Type":
                            "application/x-www-form-urlencoded; charset=UTF-8",
                            Authorization: api.KEY,
                            Authorization2: "XeDap " + accessToken
                        }
                    })
                    .then(function (response) {
                        console.log("response", response.data.msg);
                        if (response.status == 200) {
                            parent.setState({
                                data: response.data.msg,
                                isLoading: false
                            });
                        } else {
                            Toast.show({ text: "Lấy dữ liệu bị lỗi!", position: 'top', duration: 2000 })
                            console.log("Parse Error");
                        }
                    })
                    .catch(function (error) {
                        parent.setState({
                            error: true,
                            errorInfo: error
                        });
                        Toast.show({ text: error, position: 'top', duration: 2000 })
                        console.log("Error fetching and parsing data", error);
                    });
            }
        } catch (error) {
            console.log("AsyncStorage error: " + error);
        }
    }

    onChange = state => {
        this.setState(state);
    };

    render() {
        if (this.state.isLoading && !this.state.error) {
            return (
                <View style={styles.progressBar}>
                    <Spinner color="#EF6530" />
                </View>
            );
        } else if (this.state.error) {
            return Toast.show({ text: "Lấy dữ liệu bị lỗi!", position: 'top', duration: 2000 });
        }
        return (
            <Container style={styles.container}>
                <Header style={{ backgroundColor: '#EF6530' }}>
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.goBack()}>
                            <Icon name="arrow-back" />
                        </Button>
                    </Left>
                    <Body>
                        <Title style={styles.titleToolbar}>{this.state.data.title}</Title>
                    </Body>
                    <Right />
                </Header>
                <Content padder>
                    <H3 style={styles.title}>
                        {this.state.data.title}
                    </H3>
                    <ScrollView style={{ flex: 1 }}>
                        <HTML html={this.state.data.content} stylesheet={styles.content} imagesMaxWidth={Dimensions.get('window').width} />
                    </ScrollView>
                </Content>
            </Container>
        );
    }
}

export default NewsDetails;
