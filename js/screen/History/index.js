import React, { Component } from "react";
import { FlatList, AsyncStorage, TouchableOpacity, Keyboard, Image, View, StatusBar } from "react-native";
import { Spinner, Container, Toast, Header, Title, Content, Text, H3, Button, Icon, Footer, FooterTab, Left, Right, Body } from "native-base";

import styles from "./styles";
import axios from "axios";
import PropTypes from "prop-types";
import api from "../../../utilities/Api";

class History extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      showDefault: false,
      currentPage: 1,
      error: false,
      errorInfo: "",
      data: [],
      dataSource: ''
    };
    this.onChange = this.onChange.bind(this);
  }

  onChange = state => {
    this.setState(state);
  }

  render() {
    if (this.state.error) {
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
              <Icon style={{ color: "#FFFF" }} name="iarrow-back" />
            </Button>
          </Left>
          <Body>
            <Title style={{ color: "#FFFF" }}>Thống kê</Title>
          </Body>
          <Right />
        </Header>
        <Content padder style={styles.imageContainer}>
          <H3 style={{ color: "#3c5b94" }}>
            Tính năng đang cập nhật
            </H3>
        </Content>
      </Container>
    );
  }
}

export default History;
