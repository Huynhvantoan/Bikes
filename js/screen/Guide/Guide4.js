import React, { Component } from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  Dimensions,
  AsyncStorage,
} from 'react-native';
import { Container } from 'native-base';
const { width, height } = Dimensions.get('window');
import top from '../../../assets/images/guide4_top.png'
import bottom from '../../../assets/images/guide4_bottom.png';
import { primary } from '../../themes/colors';
export default class Guide1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: '',
    }
  }
  componentDidMount() {
    AsyncStorage.getItem('Token')
      .then((token) => {
        this.setState({ token })
      })
  }
  render() {
    return (
      <Container style={{ backgroundColor: 'white', alignItems: 'center' }}>
        <Image
          resizeMode='contain'
          style={{ marginTop: height / 7, width, height: height / 4 }}
          source={top} />
        <Text style={{ textAlign: 'center', marginRight: 30, marginLeft: 30, color: 'black', fontSize: 14 }}>
          Đưa xe vào trạm và khóa xe để kết thúc chuyến đi</Text>
        <Image
          resizeMode='stretch'
          style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: height / 2, width }}
          source={bottom} />
        <TouchableOpacity
          onPress={() => {
            if (this.state.token) {
              this.props.navigation.goBack();

            } else {
              this.props.navigation.navigate('Login');

            }
          }}
          style={{
            marginTop: 20,
            borderRadius: 10,
            backgroundColor: primary,
            padding: 5,
            paddingLeft: 20,
            paddingRight: 20,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={{ fontSize: 18, color: 'white', fontWeight: 'bold' }}>Bắt đầu</Text>
        </TouchableOpacity>
      </Container>
    );
  }
}