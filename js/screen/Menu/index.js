import React, { Component } from 'react';
import {
  View,
  ScrollView,
  Image,
  Text,
  StyleSheet
} from 'react-native';
import {
  Container,
} from "native-base";
import Constants from '../../constants';
import MenuItem from '../../elements/MenuItem';
export default class Home extends Component {
  state = {}
  render() {
    return (
      <Container>
        <View style={styles.header}>
          <Text style={styles.text}>Hi,</Text>
          <Text style={[styles.text, { fontWeight: 'bold' }]}>Tien Dao Hoang</Text>
        </View>
        <ScrollView style={{ marginTop: 40, marginBottom: 20 }}>
          <MenuItem
            onPress={() => this.props.navigation.navigate('Profile')}
            text='Tài khoản'
            source={Constants.iconProfile} />
          <MenuItem
            onPress={() => this.props.navigation.navigate('Garage')}
            text='Trạm xe'
            source={Constants.iconGara} />
          <MenuItem
            onPress={() => this.props.navigation.navigate('Statistic')}
            text='Thống kê'
            source={Constants.iconStatistic} />
          <MenuItem
            onPress={() => this.props.navigation.navigate('News')}
            text='Tin tức'
            source={Constants.iconNews} />
          <MenuItem
            onPress={() => this.props.navigation.navigate('Guide')}
            text='Hướng dẫn'
            source={Constants.iconGuide} />
          <MenuItem
            onPress={() => this.props.navigation.navigate('Report')}
            text='Báo cáo'
            source={Constants.iconReport} />
          <MenuItem
            onPress={() => this.props.navigation.navigate('About')}
            text='Giới thiệu'
            source={Constants.iconAbout} />
        </ScrollView>
        <Text style={styles.version}>Easymove v1.0</Text>
      </Container>
    );
  }
}
const styles = StyleSheet.create({
  header: {
    height: 56,
    padding: 5,
    paddingLeft: 25,
    backgroundColor: '#E5E1E1',

  },
  text: {

    fontSize: 16,
    color: 'black',
  },
  version: {
    position: 'absolute',
    bottom: 5,
    left: 25,
  }
})