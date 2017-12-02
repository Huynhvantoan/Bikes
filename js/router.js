import React from 'react';
import {
  View,
  Text,
  Image,
  Platform,
  Dimensions,
  StyleSheet,
  BackHandler,
} from 'react-native';
import {
  TabBarBottom,
  TabNavigator,
  StackNavigator,
  DrawerNavigator,
  NavigationActions
} from 'react-navigation';
import Login from './screen/Login';
import Register from './screen/Register';
import ForgetPass from './screen/ForgetPass';
import ForgetPass1 from './screen/ForgetPass1';
import ChangePass from './screen/ChangePass';
import Menu from './screen/Menu';

import History from "./screen/History";
import Help from "./screen/Help";
import News from "./screen/News";
import Exit from "./screen/Exit";
import Garage from "./screen/Garage";
import GarageDetails from "./screen/GarageDetails";
import Notification from "./screen/Notification";
import Profile from "./screen/Profile";
import QRCode from "./screen/QRCode";
import Report from "./screen/Report";
import About from "./screen/About";
import Statistic from "./screen/Statistic";
import Splash from './screen/Splash';
import Home from './screen/Home';
import Guide from './screen/Guide';
import ReportFailure from './screen/ReportFailure';
import ReportOut from './screen/ReportOut';


const { width, height } = Dimensions.get('window');

const Drawer = DrawerNavigator(
  {
    Home: {
      screen: Home,
    }
  },
  {

    drawerWidth: 5 * width / 8,
    contentComponent: props => <Menu {...props} />
  }
);
const Stack = StackNavigator({
  Splash: {
    screen: Splash
  },
  Login: {
    screen: Login,
  },
  Drawer: {
    screen: Drawer, //Home screen
  },
  Register: {
    screen: Register,
  },
  ForgetPass: {
    screen: ForgetPass,
  },
  ForgetPass1: {
    screen: ForgetPass1,
  },
  ChangePass: {
    screen: ChangePass,
  },
  Guide: {
    screen: Guide,
  },

  Profile: {
    screen: Profile
  },
  Garage: {
    screen: Garage,
  },
  Statistic: {
    screen: Statistic
  },
  News: {
    screen: News
  },
  Help: {
    screen: Help
  },
  Report: {
    screen: Report
  },
  About: {
    screen: About
  },
  ReportFailure: {
    screen: ReportFailure
  },
  ReportOut: {
    screen: ReportOut
  },
  QRCode: {
    screen: QRCode
  },

}, {
    initialRouteName: 'Splash',
    navigationOptions: {
      header: null,
    },
  }
);

export default Stack;