import React, { Component } from "react";
import { FlatList, AsyncStorage, TouchableOpacity, Keyboard, Image, View, StatusBar } from "react-native";

import { Spinner, Container, Toast, Header, Title, Content, Text, H3, Button, Icon, Footer, FooterTab, Left, Right, Body } from "native-base";

import styles from "./styles";
import axios from "axios";
import PropTypes from "prop-types";
import api from "../../../utilities/Api";
import ImageLoad from 'react-native-image-placeholder';
import bikes from '../../../assets/images/bikes.png';
import location from '../../../assets/images/ic_location.png';
class Garage extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      tab1: false,
      tab2: true,
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
        //console.log('accessToken=',accessToken);
        axios
          .get('http://demo.easymove.vn/api/garas?page=1', {
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
              AsyncStorage.setItem("Token", "");
              this.props.navigation.navigate("Login");
            } else {
              console.log("Parse Error");
            }
          })
          .catch(function (error) {
            parent.setState({
              error: true,
              errorInfo: error
            });
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
    this.props.navigation.navigate("GarageDetails", {
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
        style={styles.cardContent}
        onPress={() => this._onPressButton(item.id, item.title)}>
        <Text
          numberOfLines={1}
          style={styles.title}
          allowFontScaling={false}>
          {item.name}
        </Text>
        <View style={styles.card}>
          <Left style={{ alignItems: 'center' }}>
            <Image
              style={{ width: 60, height: 40, margin: 10 }}
              source={bikes}
            />
          </Left>
          <Body style={{ alignItems: 'center', flexDirection: 'row' }}>
            <Text
              style={[styles.summary, { fontWeight: 'bold' }]}
              allowFontScaling={false}>
              {item.max_bike + " "}
            </Text>
            <Text style={styles.summary}
              allowFontScaling={false}>
              Available bikes
              </Text>
          </Body>
          <Right style={{ alignItems: 'center', marginLeft: 20 }}>
            <Image
              style={{ width: 60, height: 40 }}
              source={location}
            />
            <Text
              numberOfLines={1}
              style={styles.summary2}
              allowFontScaling={false}>
              2.1km
            </Text>
          </Right>
        </View>
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
          //Toast.show({text: "Hết dữ liệu!",position: 'top',duration: 2000})
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
            <Title style={{ color: "#FFFF" }}>Nhà xe</Title>
          </Body>
          <Right>
            <Button transparent onPress={() => this.tabCamera()}>
              <Icon style={{ color: "#FFFF" }} name="camera" />
            </Button>
          </Right>

        </Header>

        <Content padder style={{ backgroundColor: 'white' }}>
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

  tabCamera() {
    this.props.navigation.navigate("QRCode");
  }
}

export default Garage;
