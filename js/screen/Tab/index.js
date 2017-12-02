import React from 'react';
import {Icon} from "native-base";
import { StackNavigator,DrawerNavigator,TabNavigator,TabBarBottom } from 'react-navigation';
import News from "../News";
import History from "../History";
import Help from "../Help";
import NewsDetails from "../NewsDetails";
import Garage from "../Garage";
import GarageDetails from "../GarageDetails";
import Notification from "../Notification";
import Profile from "../Profile";
import QRCode from "../QRCode";


const NewsStack = StackNavigator({
    News: {
      screen: News,
      navigationOptions: {
        header: null
      },
    },
    NewsDetails: {
      screen: NewsDetails,
      navigationOptions: ({ navigation }) => ({
        header: null
      }),
    },
  });
  
  const GarageStack = StackNavigator({
    Garage: {
      screen: Garage,
      navigationOptions: {
        header: null
      },
    },
    GarageDetails: {
      screen: GarageDetails,
      navigationOptions: ({ navigation }) => ({
        header: null
      }),
    },
  });
  const ProfileStack = StackNavigator({
    Profile: {
      screen: Profile,
      navigationOptions: {
        header: null
      },
    },
  });
  
  const HistoryStack = StackNavigator({
    History: {
      screen: History,
      navigationOptions: {
        header: null
      },
    },
  });

  const HelpStack = StackNavigator({
    Help: {
      screen: Help,
      navigationOptions: {
        header: null
      },
    },
  });
  export const Tab = TabNavigator({
      News: {
        screen: NewsStack,
        navigationOptions: {
          tabBarLabel: 'Tin tức',
          tabBarIcon: ({ tintColor }) => <Icon name="paper" size={30} color={tintColor} />,
        },
      },
      Garage: {
        screen: GarageStack,
        navigationOptions: {
          tabBarLabel: 'Nhà xe',
          tabBarIcon: ({ tintColor }) => <Icon name="car" size={30} color={tintColor} />,
        },
      },
      QRCode: {
        screen: QRCode,
        navigationOptions: {
          tabBarLabel: 'Đăng ký',
          tabBarIcon: ({ tintColor }) => <Icon name="camera" size={30} color={tintColor} />,
        },
      },
      Profile: {
        screen: ProfileStack,
        navigationOptions: {
          tabBarLabel: 'Profile',
          tabBarIcon: ({ tintColor }) => <Icon name="contact" size={30} color={tintColor} />,
        },
      },
      History: {
        screen: HistoryStack,
        navigationOptions: {
          tabBarLabel: 'Thống kê',
          tabBarIcon: ({ tintColor }) => <Icon name="md-pie" size={30} color={tintColor} />,
        },
      },
      Help: {
        screen: HelpStack,
        navigationOptions: {
          tabBarLabel: 'Giúp đỡ',
          tabBarIcon: ({ tintColor }) => <Icon name="ios-information-circle-outline" size={30} color={tintColor} />,
        },
      }
    },
    {
      lazy: true,
      tabBarComponent: TabBarBottom,
      tabBarPosition: "bottom",
      animationEnabled: false,
      swipeEnabled: true
    }
  );
  
export default Tab;