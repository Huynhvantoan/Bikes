import React, { Component } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Image, Text,
  StyleSheet
} from 'react-native';
import {
  Spinner,
  Container,
  Toast,
  Header,
  Title,
  Button,
  Icon,
  Footer,
  FooterTab,
  Content,
  Left,
  Right,
  Body,
  H3
} from "native-base";
import Constants from '../../constants';
import { primary } from '../../themes/colors';
import Toolbar from '../../elements/Toolbar';
export default class ReportOut extends Component {
  constructor(props) {
    super(props);
    this.state = {
      position: '',
    }
    this.text = {
      position: TextInput,
    }
  }
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
            <Title style={styles.titleToolbar}>Xe đậu ngoài trạm</Title>
          </Body>
          <Right />
        </Header>
        <Content>

          <View style={styles.inputLayout}>
            <TextInput
              ref={position => this.text.position = position}
              underlineColorAndroid='transparent'
              onSubmitEditing={() => {
                this.text.address.focus();
              }}
              placeholderTextColor={'black'}
              placeholder="Mã số xe"
              onChangeText={position => {
                this.setState({ position });
              }}
              style={styles.textInput} />
            <Image
              tintColor='black'
              style={{ width: 30, height: 30 }}
              source={Constants.iconCode} />
          </View>

          <TouchableOpacity
            style={{
              borderRadius: 5,
              marginTop: 20,
              marginLeft: 40,
              backgroundColor: '#d3d3d3',
              justifyContent: 'center',
              alignItems: 'center',
              width: 50, height: 50
            }}
          >
            <Image
              style={{ width: 25, height: 25 }}
              source={Constants.iconCamera} />
          </TouchableOpacity>

        </Content>
        <TouchableOpacity
          style={{
            position: 'absolute',
            left: 30,
            right: 30,
            bottom: 30,
            borderRadius: 20,
            backgroundColor: primary,
            padding: 15,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={{ fontSize: 18, color: 'white' }}>Submit</Text>
        </TouchableOpacity>
      </Container>
    );
  }
}
const styles = StyleSheet.create({
  inputLayout: {
    padding: 10,
    marginLeft: 30,
    marginRight: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: 'gray',
  },
  textInput: {
    flex: 1,
    height: 40,
    padding: 5,
    backgroundColor: 'transparent',
    color: 'white',
    fontSize: 14,
  },
})