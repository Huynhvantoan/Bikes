import React, { Component } from "react";
import { AsyncStorage, ScrollView, Dimensions, Keyboard, Image, Platform, View, StatusBar } from "react-native";
import { Spinner, Container, Toast, Header, Title, Content, Text, H3, Button, Icon, Footer, FooterTab, Left, Right, Body, Segment } from "native-base";

import styles from "./styles";
import axios from "axios";
import PropTypes from "prop-types";
import api from "../../../utilities/Api";
import HTML from 'react-native-render-html';

class Help extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      tab1: true,
      tab2: false,
      isLoading: true,
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
          .get("/bike_guide")
          .then(function (response) {
            if (response.status == 200) {
              console.log("data=", response.data.msg);
              parent.setState({
                data: response.data.msg,
                isLoading: false
              });
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

  async load_help_app() {
    try {
      this.setState({
        tab1: true,
        tab2: false
      });
      var parent = this;
      axios
        .get("/bike_guide")
        .then(function (response) {
          if (response.status == 200) {
            console.log("data=", response.data.msg);
            parent.setState({
              data: response.data.msg,
              isLoading: false
            });
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
    } catch (error) {
      console.log("AsyncStorage error: " + error);
    }
  }

  async load_guide_app() {
    try {
      this.setState({
        tab1: false,
        tab2: true
      });
      var parent = this;
      axios
        .get("/app_guide")
        .then(function (response) {
          if (response.status == 200) {
            console.log("data=", response.data.msg);
            parent.setState({
              data: response.data.msg,
              isLoading: false
            });
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
    } catch (error) {
      console.log("AsyncStorage error: " + error);
    }
  }

  onChange = state => {
    this.setState(state);
  };

  _onPressHelpApp() {
    this.load_help_app().done();
  }

  _onPressHelpGuide() {
    this.load_guide_app().done();
  }

  renderProgress = () => {
    return (
      <View style={styles.progressBar}>
        <Spinner color="#EF6530" />
      </View>
    );
  }

  render() {
    if (this.state.isLoading || this.state.error) {
      return this.renderProgress();
    }
    return (
      <Container >
        <StatusBar barStyle="light-content" />
        <Header style={{ backgroundColor: '#EF6530' }}>
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.goBack()}>
              <Icon style={{ color: "#FFFF" }} name="arrow-back" />
            </Button>
          </Left>

          <Segment style={styles.body}>
            <Button first active={this.state.tab1} onPress={() => this._onPressHelpApp()}><Text>    App   </Text></Button>
            <Button last active active={this.state.tab2} onPress={() => this._onPressHelpGuide()}><Text>  Guide    </Text></Button>
          </Segment>
        </Header>

        <Content style={styles.content}>
          <ScrollView >
            <View>
              <H3>
                {this.state.data.title}
              </H3>
              <ScrollView style={{ flex: 1 }}>
                <HTML html={this.state.data.content} stylesheet={styles.html} imagesMaxWidth={Dimensions.get('window').width} />
              </ScrollView>
            </View>
          </ScrollView>
        </Content>
      </Container>
    );
  }
}

export default Help;
