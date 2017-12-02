import React, { Component } from 'react';
import {
  View,
  Dimensions,
  AsyncStorage
} from 'react-native';
import Swiper from 'react-native-swiper';
import Guide1 from './Guide1';
import Guide2 from './Guide2';
import Guide3 from './Guide3';
import Guide4 from './Guide4';
const { width, height } = Dimensions.get('window');

export default class extends Component {

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Swiper
          showsButtons={false}
          removeClippedSubviews={false}
          loop={false}
          horizontal={true}
          ref={(swiper) => { this.swiper = swiper }}
          index={0}
          height={height}
          animated={false}
          paginationStyle={{ top: -height / 1.25 }}
          activeDotColor={'#EF6530'}
        >
          <Guide1 />
          <Guide2 />
          <Guide3 />
          <Guide4 navigation={this.props.navigation} />
        </Swiper>
      </View>
    );
  }
}