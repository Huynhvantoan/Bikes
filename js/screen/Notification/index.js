import React, { Component } from "react";
import { FlatList, AsyncStorage, TouchableOpacity, Keyboard, Image, View, StatusBar } from "react-native";

import { Spinner, Container, Toast, Header, Title, Content, Text, H3, Button, Icon, Footer, FooterTab, Left, Right, Body } from "native-base";

import styles from "./styles";
import axios from "axios";
import PropTypes from "prop-types";
import api from "../../../utilities/Api";
import ImageLoad from 'react-native-image-placeholder';

class Notification extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      tab1: true,
      tab2: false,
      tab3: false,
      tab4: false,
      isLoading: true,
      showDefault: false,
      currentPage: 1,
      error: false,
      errorInfo: "",
      data: [],
      dataSource: ''
    };
    this.renderItem = this._renderItem.bind(this);
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
        axios
          .get('http://demo.easymove.vn/api/news?page=1', {
            headers: {
              Accept: "application/json",
              "Content-Type":
              "application/x-www-form-urlencoded; charset=UTF-8",
              Authorization: api.KEY,
              Authorization2: "XeDap " + accessToken
            }
          })
          .then(function (response) {
            if (response.status == 200) {
              parent.setState({
                data: response.data.msg,
                isLoading: false
              });
            } else if (response.status == 403) {
              AsyncStorage.setItem("Token", "null");
              this.props.navigation.navigate("Login");
              Toast.show({ text: "Mời đăng nhập lại!", position: 'top', duration: 2000 })
            } else {
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

  _renderSeparator() {
    return <View style={styles.separator} />;
  }

  _keyExtractor(item, index) {
    return item.id;
  }

  _onPressButton(id, title) {
    console.log("id", id);
    console.log("title", title);
    this.props.navigation.navigate("NewsDetails", {
      id: id,
      name: title
    });
  }

  handleImageLoaded() {
    this.setState({ showDefault: false });
  }

  handleImageErrored() {
    this.setState({ showDefault: true });
  }

  _renderItem(item) {
    return (
      <TouchableOpacity
        delayPressIn={70}
        activeOpacity={0.8}
        onPress={() => this._onPressButton(item.id, item.title)}>
        <Container style={styles.card}>
          <ImageLoad
            rkCardImg
            isShowActivity={false}
            style={{ width: 80, height: 80, margin: 10 }}
            source={{ uri: `http://demo.easymove.vn/images/${item.image}` }}
          />
          <Body>
            <Text
              numberOfLines={2}
              style={styles.title}
              allowFontScaling={false}>
              {item.title}
            </Text>
            <Text
              numberOfLines={3}
              style={styles.summary}
              allowFontScaling={false}>
              {item.summary}
            </Text>
          </Body>
        </Container>
      </TouchableOpacity>
    );
  }

  loadMore() {
    this.setState({
      currentPage: this.state.currentPage + 1
    });

    let page;
    if (this.state.currentPage === 1) {
      page = 2;
      this.setState({ currentPage: 2 });
    } else {
      page = this.state.currentPage + 1;
    }

    axios.get(`http://demo.easymove.vn/api/news?page=${page}`)
      .then(response => {
        console.log('response=', response.msg);
        if (response.msg != null) {
          this.setState({
            data: this.state.data.concat(response),
            isLoading: false
          });
        } else {
          Toast.show({ text: "Hết dữ liệu!", position: 'top', duration: 2000 })
          console.log('not page');
        }
      }).catch(err => {
        Toast.show({ text: err, position: 'top', duration: 2000 })
        console.log('next page', err); // eslint-disable-line
      });
  }
  renderProgress = () => {
    if (!this.state.isLoading) return null;
    return (
      <View style={styles.progressBar}>
        <Spinner color="#EF6530" />
      </View>
    );
  };
  render() {
    if (this.state.isLoading && !this.state.error) {
      return this.renderProgress();
    } else if (this.state.error) {
      return Toast.show({ text: this.state.errorInfo, position: 'top', duration: 2000 });
    }
    return (
      <Container style={styles.container}>
        <StatusBar barStyle="light-content" />
        <Header style={{ backgroundColor: '#EF6530' }}>
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.goBack()}>
              <Icon style={{ color: "#FFFF" }} name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title style={{ color: "#FFFF" }}>Thông báo</Title>
          </Body>
          <Right transparent>
            <Button onPress={() => this.tabQRCode()}>
              <Icon name="camera" />
            </Button>
          </Right>
        </Header>

        <Content padder>
          <FlatList
            style={styles.root}
            data={this.state.data}
            extraData={this.state}
            ItemSeparatorComponent={this._renderSeparator}
            keyExtractor={this._keyExtractor}
            renderItem={({ item }) => this.renderItem(item)}
            removeClippedSubviews={true}
            ListFooterComponent={this.renderProgress}
            onEndReachedThreshold={0.4}
            onEndReached={({ distanceFromEnd }) => {
              console.log("onEndReached");
              this.loadMore();
            }} />
        </Content>
      </Container>
    );
  }
}

export default Notification;
