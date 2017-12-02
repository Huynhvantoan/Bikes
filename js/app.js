import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StackNavigator } from 'react-navigation';
import { Root } from "native-base";
import Drawer from "./screen/Drawer";
import Login from "./screen/Login";
import Register from "./screen/Register";
import ForgetPass from "./screen/ForgetPass";
import ForgetPass1 from "./screen/ForgetPass1";
import ChangePass from "./screen/ChangePass";
import Tab from "./screen/Tab";
const Permissions = require('react-native-permissions');

const createStackNavigator = currentUser => StackNavigator({
    Login: {
        screen: Login,
        navigationOptions: {
            header: null
        },
    },
    Drawer: {
        screen: Drawer
    },
    Tab: {
        screen: Tab
    },
    Register: {
        screen: Register,
        navigationOptions: {
            header: null
        },
    },
    ForgetPass: {
        screen: ForgetPass,
        navigationOptions: {
            header: null
        },
    },
    ForgetPass1: {
        screen: ForgetPass1,
        navigationOptions: {
            header: null
        },
    },
    ChangePass: {
        screen: ChangePass,
        navigationOptions: {
            header: null
        },
    },
}, {
        initialRouteName: isEmpty(currentUser) ? 'Login' : 'Drawer',
        headerMode: 'none'
    });

class App extends Component {

    componentDidMount() {
        Permissions.checkMultiple(['camera', 'location'])
            .then(response => {
                this.setState({
                    cameraPermission: response.camera,
                    locationPermission: response.location,
                })
            });
    }

    render() {
        const { currentUser } = this.props;
        const Navigator = createStackNavigator(currentUser);
        return (
            <Root>
                <Navigator />
            </Root>
        );
    }
}

App.propTypes = {
    currentUser: PropTypes.object.isRequired,
};

const mapStateToProps = store => ({
    currentUser: store.currentUser,
});

export default connect(mapStateToProps)(App);