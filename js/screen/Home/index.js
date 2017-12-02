import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  Text
} from 'react-native';
import { Container, Header, Button, Icon, Fab } from 'native-base';

import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import styles from "./styles";
import Constants from '../../constants';
import Toolbar from '../../elements/Toolbar';
import ActionButton from 'react-native-action-button';
// import Icon from 'react-native-vector-icons/Ionicons';
import Permissions from 'react-native-permissions';
export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      longitude: 0.0,
      latitude: 0.0,
      active: 'true',
    }
  }

  componentDidMount() {
    this.getLocation();
    // this._alertForLocationPermission();
    Permissions.check('location')
      .then(response => {
        //response is one of: 'authorized', 'denied', 'restricted', or 'undetermined'
        this.setState({ locationPermission: response })

        if (response === 'authorized') this.getLocation();
        else this._alertForLocationPermission();

      });
  }
  //request permission to access photos
  _requestPermission = () => {
    Permissions.request('location')
      .then(response => {
        //returns once the user has chosen to 'allow' or to 'not allow' access
        //response is one of: 'authorized', 'denied', 'restricted', or 'undetermined'
        this.setState({ locationPermission: response })
      });
  }


  _alertForLocationPermission = () => {
    Alert.alert(
      'Yêu cầu quyền truy cập!',
      'Ứng dụng cần truy cập vị trí của bạn!',
      [
        { text: 'Không', onPress: () => console.log('permission denied') },
        this.state.locationPermission === 'undetermined' ?
          { text: 'Đồng ý', onPress: this._requestPermission() }
          : { text: 'Mở Settings', onPress: Permissions.canOpenSettings() ? Permissions.openSettings : null }
      ]
    )
  }
  getLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      this.setState({
        longitude: position.coords.longitude,
        latitude: position.coords.latitude
      });
    }, (error) => {
      console.log(error.message)
    }, {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 1000
      });
  }
  moveToLocation = () => {
    const region = {
      latitude: this.state.latitude,
      longitude: this.state.longitude,
      latitudeDelta: 0.015,
      longitudeDelta: 0.0121,
    }
    if (this.maps) this.maps.animateToRegion(region, 1000);
  }

  render() {
    return (
      <Container>
        <Toolbar
          navigation={this.props.navigation}
          iconLeft={Constants.iconProfile}
          actionLeft={() => this.props.navigation.navigate('DrawerOpen')}
          logo={Constants.navLogo}
        />
        <View style={{ flex: 1, }}>
          <MapView
            ref={maps => this.maps = maps}
            showsMyLocationButton={false}
            showsUserLocation={true}
            followsUserLocation={true}
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            region={{
              latitude: this.state.latitude,
              longitude: this.state.longitude,
              latitudeDelta: 0.015,
              longitudeDelta: 0.0121,
            }}
          />
          <ActionButton
            icon={<Image
              style={styles.help}
              source={Constants.iconHelp} />}
            hideShadow={true}
            buttonColor="white" style={{ zIndex: 5, marginBottom: 25, }}>
            <View>
              <Text>Test</Text>
            </View>
            <ActionButton.Item buttonColor='white' title="Báo xe hỏng" onPress={() => this.props.navigation.navigate('ReportFailure')}>
              <Icon name="bicycle" style={styles.icon} />
            </ActionButton.Item>
            <ActionButton.Item buttonColor='white' title="Xe đậu ngoài trạm" onPress={() => this.props.navigation.navigate('ReportOut')}>
              <Icon name="share" style={styles.icon} />
            </ActionButton.Item>

          </ActionButton>
        </View>

        <View style={styles.bottom}>
          <TouchableOpacity
            onPress={this.moveToLocation}
            style={styles.location}>
            <Image
              style={styles.location}
              source={Constants.iconLocation} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('QRCode')}
            style={styles.scan}>
            <Image
              style={styles.scan}
              source={Constants.iconScan} />
          </TouchableOpacity>
          <View style={styles.help} />
        </View>

      </Container>
    );
  }
}
