import React, { Component } from "react";
import { AsyncStorage, TouchableOpacity, Keyboard, Image, View, StatusBar } from "react-native";
import { Spinner, Container, Button, H3, Toast, Text, Item, Input } from "native-base";
import styles from "./styles";
import axios from "axios";
import PropTypes from "prop-types";
import api from "../../../utilities/Api";
import { connect } from 'react-redux';
import * as ducks from '../../../js/utils/ducks';
import { getNavigationOptions } from '../../../js/utils/navigation';
import * as Colors from '../../themes/colors';

const launchscreenLogo = require("../../../assets/images/logo2.png");

class ChangePass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      user_id: "",
      password: "",
      cpassword: "",
      error: false,
      errorInfo: null
    };
    this.onChange = this.onChange.bind(this);
  }

  onSubmit() {
    axios.defaults.baseURL = "http://demo.easymove.vn/api";
    axios.defaults.headers.common["Authorization"] = api.KEY;
    axios.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
    this.forgetPass();
  }

  forgetPass() {
    var parent = this;
    if (parent.state.isLoading && !parent.state.error) {
      <View style={styles.container}>
        <Spinner color="#EF6530" />
      </View>;
    } else if (parent.state.error) {
      Toast.show({ text: parent.state.errorInfo, position: 'top', duration: 2000 })
    }
    var qs = require("qs");
    axios.post(
      "/member/update_pass",
      qs.stringify({
        user_id: parent.props.navigation.state.params.userID,
        password: parent.state.password,
        cpassword: parent.state.cpassword,
      })
    )
      .then(function (response) {
        console.log("data=", response.data);
        if (response.data.status == 200) {
          parent.setState({
            isLoading: false
          });
          parent._onPressLogin();
          Toast.show({ text: response.data.msg, position: 'top', duration: 2000 })
        } else {
          console.log("renderErrorView", response.data.msg);
          Toast.show({ text: response.data.msg, position: 'top', duration: 2000 })
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

  onChange = state => {
    this.setState(state);
  }

  _onPressLogin() {
    this.props.navigation.goBack();
  }

  render() {
    return (
      <Container>
        <StatusBar barStyle="light-content" />
        <View style={styles.imageContainer}>
          <View style={styles.content} >
            <View style={styles.messageBox}>
              <Image source={launchscreenLogo} style={styles.logo} />
            </View>
          </View>

          <View style={{ flex: 1.8, flexDirection: 'column', alignItems: 'center', margin: 30 }}>
            <Item>
              <Input secureTextEntry={true} style={{ color: "#FFF" }} placeholder="Mật khẩu mới" placeholderTextColor="#FFFFFF" textColor="#FFFFFF"
                value={this.state.password}
                onChangeText={text => this.setState({ password: text })} />
            </Item>
            <Item>
              <Input secureTextEntry={true} style={{ color: "#FFF" }} placeholder="Nhập lại mật khẩu mới" placeholderTextColor="#FFFFFF" textColor="#FFFFFF"
                value={this.state.cpassword}
                onChangeText={text => this.setState({ cpassword: text })} />
            </Item>
            <Button style={{
              backgroundColor: "#4e699e", width: '100%', marginTop: 30, justifyContent: 'center',
              alignItems: 'center'
            }}
              onPress={() => this.onSubmit()}>
              <Text>Đồng ý</Text>
            </Button>

            <Button style={{
              backgroundColor: "#4e699e", width: '100%', marginTop: 30, justifyContent: 'center',
              alignItems: 'center'
            }}
              onPress={() => this._onPressLogin()}>
              <Text>Quay lại</Text>
            </Button>
          </View>
        </View>
      </Container>
    );
  }
}

export default ChangePass;
