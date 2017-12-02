import React, { Component } from 'react';
import {
  View,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import { primary } from '../../themes/colors';
const { width, height } = Dimensions.get('window');

import {
  Container,
  Header,
  Icon,
  Text,
  Left,
  Body,
  Button,
  Title,
  Right
} from "native-base";
export default class Home extends Component {
  state = {}
  render() {
    return (
      <Container>
        <Header style={{ backgroundColor: '#EF6530' }}>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title style={styles.titleToolbar}>Báo cáo</Title>
          </Body>
          <Right />
        </Header>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            padding: 10
          }}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('ReportFailure')}
            style={{
              width: width - 40,
              borderRadius: 20,
              backgroundColor: primary,
              paddingTop: 15,
              paddingBottom: 15,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={{ fontSize: 18, color: 'white' }}>Báo xe hỏng</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('ReportOut')}
            style={{
              width: width - 40,
              borderRadius: 20,
              backgroundColor: primary,
              paddingTop: 15,
              paddingBottom: 15,

              marginTop: 10,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={{ fontSize: 18, color: 'white' }}>Báo xe đậu ngoài trạm</Text>
          </TouchableOpacity>
        </View>
      </Container>
    );
  }
}