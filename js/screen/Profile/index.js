import React, { Component } from "react";
import { AsyncStorage, TouchableOpacity, Keyboard, Image, View, StatusBar } from "react-native";
import { Spinner, Container, Toast, Thumbnail, Header, Title, Content, Text, H3, Button, Icon, Footer, FooterTab, Left, Right, Body, Item, Input, Tab, Tabs, TabHeading } from "native-base";
import TabInfo from './tabInfo';
import TabChangePass from './tabChangePass';
import styles from "./styles";
import axios from "axios";
import PropTypes from "prop-types";
import api from "../../../utilities/Api";
import CounterEmitter from '../../../js/utils/CountEmitter';
const BgProfile = require("../../../assets/images/bg_profile.png");
import { NavigationActions } from 'react-navigation'
class Profile extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      tab1: false,
      tab2: false,
      tab3: false,
      tab4: true,
      isLoading: true,
      error: false,
      errorInfo: "",
      name: "",
      email: ""
    };
    this.onChange = this.onChange.bind(this);
  }

  componentWillMount() {
    this._loadInitialState().done();
    CounterEmitter.addListener('EventBusName', (data) => {
      this.setState({
        name: data
      });
    });
    CounterEmitter.addListener('EventBusEmail', (data) => {
      this.setState({
        email: data
      });
    });
  }

  _onPressLogin() {
    AsyncStorage.clear();
    this.props.navigation.dispatch(NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({
          routeName: 'Login',
        })
      ]
    }))

  }

  async _loadInitialState() {
    try {
      var parent = this;
      var accessToken = await AsyncStorage.getItem("Token");
      if (accessToken !== null) {
        axios.defaults.baseURL = "http://demo.easymove.vn/api";
        axios.defaults.headers.common["Authorization"] =
          api.KEY;
        axios.defaults.headers.common["Authorization2"] =
          "XeDap " + accessToken;
        axios.defaults.headers.post["Accept"] = "application/json";
        axios.defaults.headers.post["Content-Type"] =
          "application/x-www-form-urlencoded; charset=UTF-8";
        axios
          .get("/member/info")
          .then(function (response) {
            if (response.status == 200) {
              parent.setState({
                name: response.data.fullname,
                email: response.data.email,
                isLoading: false
              });
              // CounterEmitter.emit('EventBusSchool',response.data.school_id);
            } else {
              Toast.show({ text: "Lấy dữ liệu bị lỗi!", position: 'top', duration: 2000 });
              console.log("Parse Error");
            }
          })
          .catch(function (error) {
            Toast.show({ text: error, position: 'top', duration: 2000 });
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

  renderProgress = () => {
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
        <Header hasTabs style={{ backgroundColor: '#EF6530' }}>
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.goBack()}>
              <Icon style={{ color: "#FFFF" }} name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title style={{ color: "#FFFF" }}>Tài khoản</Title>
          </Body>
          <Right>
            <Button transparent onPress={() => this.tabCamera()}>
              <Icon style={{ color: "#FFFF" }} name="camera" />
            </Button>
          </Right>
        </Header>

        <Image
          resizeMode='stretch'
          source={BgProfile}
          style={styles.imageContainer}>
          <View style={styles.content} >
            <Thumbnail large source={{ uri: 'http://tapchilamtoc.com/wp-content/uploads/2015/11/cac-kieu-toc-dep-cua-song-hye-kyo-khien-hang-trieu-trai-tim-ham-mo7.jpg' }} />
            <Body>
              <Text style={{ color: "#EF6530", fontWeight: 'bold' }}>{this.state.name}</Text>
              <Text style={{ color: "#EF6530", fontWeight: 'bold' }}>{this.state.email}</Text>
              <Text style={{
                backgroundColor: "transparent", color: "#EF6530",
                marginLeft: 180, fontSize: 14, marginTop: 10, fontWeight: 'bold'
              }}
                onPress={() => this._onPressLogin()}>Đăng xuất</Text>
            </Body>
          </View>
        </Image>
        <View style={{ flex: 2.5, backgroundColor: "#FFFFFF" }}>
          <Tabs
            tabStyle={{ backgroundColor: '#EF6530' }}
            style={{ elevation: 2 }}>
            <Tab
              heading={<TabHeading><Text>Thông tin</Text></TabHeading>}>
              <TabInfo />
            </Tab>
            <Tab
              heading={<TabHeading><Text>Đổi mật khẩu</Text></TabHeading>}>
              <TabChangePass />
            </Tab>
          </Tabs>
        </View>
      </Container>
    );
  }

  tabCamera() {
    this.props.navigation.navigate("QRCode");
  }
}

export default Profile;
