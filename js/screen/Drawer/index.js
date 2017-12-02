import React from 'react';
import {Icon} from "native-base";
import { StackNavigator,DrawerNavigator,TabNavigator,TabBarBottom } from 'react-navigation';
import { getNavigationOptionsWithAction,getNavigationOptions, getDrawerNavigationOptions, getDrawerConfig } from '../../../js/utils/navigation';
import NavBarItem from '../../../js/utils/navBarItem';
import { BackHandler } from 'react-native';
import History from "../History";
import Help from "../Help";
import News from "../News";
import Exit from "../Exit";
import Garage from "../Garage";
import About from "../About";
import Profile from "../Profile";
import QRCode from "../QRCode";
import Tab from "../Tab";
import * as Colors from '../../themes/colors';

const getDrawerItem = navigation => (
  <NavBarItem
    iconName="ios-menu"
    onPress={() => {
      if (navigation.state.index === 0) {
        // check if drawer is not open, then only open it
        navigation.navigate('DrawerOpen');
      } else {
        // else close the drawer
        navigation.navigate('DrawerClose');
      }
    }}/>
);

const getDrawerIcon = (iconName, tintColor) => <Icon name={iconName} size={30} color={tintColor} />;

const homeDrawerIcon = ({ tintColor }) => getDrawerIcon('home', tintColor);
const chartDrawerIcon = ({ tintColor }) => getDrawerIcon('md-pie', tintColor);
const userDrawerIcon = ({ tintColor }) => getDrawerIcon('ios-information-circle-outline', tintColor);
const newsDrawerIcon = ({ tintColor }) => getDrawerIcon('paper', tintColor);
const garageDrawerIcon = ({ tintColor }) => getDrawerIcon('md-car', tintColor);
const registerDrawerIcon = ({ tintColor }) => getDrawerIcon('camera', tintColor);
const profileDrawerIcon = ({ tintColor }) => getDrawerIcon('contact', tintColor);
const exitDrawerIcon = ({ tintColor }) => getDrawerIcon('exit', tintColor);

const homeNavOptions = getDrawerNavigationOptions('Trang chủ', Colors.primary, 'white', homeDrawerIcon);
const chartNavOptions = getDrawerNavigationOptions('Thống kê', Colors.primary, 'white',chartDrawerIcon);
const userNavOptions = getDrawerNavigationOptions('Giúp đỡ', Colors.primary, 'white', userDrawerIcon);
const newsNavOptions = getDrawerNavigationOptions('Tin tức', Colors.primary, 'white', newsDrawerIcon);
const garageNavOptions = getDrawerNavigationOptions('Nhà xe', Colors.primary, 'white',garageDrawerIcon);
const registerNavOptions = getDrawerNavigationOptions('Đăng ký', Colors.primary, 'white', registerDrawerIcon);
const profileNavOptions = getDrawerNavigationOptions('Profile', Colors.primary, 'white', profileDrawerIcon);
const aboutNavOptions = getDrawerNavigationOptions('Giới thiệu', Colors.primary, 'white', userDrawerIcon);
const exitNavOptions = getDrawerNavigationOptions('Thoát', Colors.primary, 'white', exitDrawerIcon);

export const Drawer = DrawerNavigator({
   Tab: { screen: Tab,navigationOptions: homeNavOptions },
   History: { screen: History, navigationOptions: chartNavOptions },
   News: { screen: News, navigationOptions: newsNavOptions },
   Garage: { screen: Garage,navigationOptions: garageNavOptions },
   QRCode: { screen: QRCode, navigationOptions: registerNavOptions },
   Profile: { screen: Profile, navigationOptions: profileNavOptions },
   Help: { screen: Help, navigationOptions: userNavOptions },
   About: { screen: About, navigationOptions: aboutNavOptions },

  //Exit: { screen: Exit, navigationOptions: exitNavOptions },
}, getDrawerConfig(300, 'left', 'Tab'));

Drawer.navigationOptions = ({ navigation }) => getNavigationOptionsWithAction('Menu Navigation', Colors.primary, 'white', getDrawerItem(navigation));

export default Drawer;
