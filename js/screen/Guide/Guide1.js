import React, { Component } from 'react';
import {
  View,
  Image,
  Text,
  Dimensions
} from 'react-native';
import { Container } from 'native-base';
const { width, height } = Dimensions.get('window');
import top from '../../../assets/images/guide1_top.png'
import bottom from '../../../assets/images/guide1_bottom.png'
export default class Guide1 extends Component {
  render() {
    return (
      <Container style={{ backgroundColor: 'white', alignItems:'center' }}>
        <Image
          resizeMode='contain'
          style={{ marginTop : height/7,  width, height: height/4 }}
          source={top} />
        <Text style={{ textAlign: 'center', marginRight: 30, marginLeft: 30,color: 'black', fontSize: 14}}>
        Chào mừng bạn đến với E-bike sản phẩm do Công ty TNHH TM & KT Tân Kỳ Nguyên nghiên cứu và phát triển</Text>
        <Image 
        resizeMode='cover'
        style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: height/2 + 60 , width}}
          source={bottom} />
      </Container>
    );
  }
}