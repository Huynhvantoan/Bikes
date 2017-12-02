import React, { Component } from "react";
import { AsyncStorage, Image, View, StatusBar, KeyboardAvoidingView } from "react-native";
import { Spinner, Container, Button, H3, Toast, Text, Item, Input } from "native-base";
import styles from "./styles";
import axios from "axios";
import api from "../../../utilities/Api";
import { connect } from 'react-redux';
import * as ducks from '../../../js/utils/ducks';
import { getNavigationOptions } from '../../../js/utils/navigation';
import * as Colors from '../../themes/colors';

const icon_bottom = require("../../../assets/images/bg_login.png");
const icon_top = require("../../../assets/images/icon_login.png");

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            username: "",
            password: "",
            error: false,
            errorInfo: null
        };
        this.onChange = this.onChange.bind(this);
    }

    onSubmit() {
        axios.defaults.baseURL = "http://demo.easymove.vn/api";
        axios.defaults.headers.common["Authorization"] = api.KEY;
        axios.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
        this.login();
    }

    login() {
        var parent = this;
        if (parent.state.isLoading && !parent.state.error) {
            <View style={styles.container}>
                <Spinner color="#EF6530" />
            </View>;
        } else if (parent.state.error) {
            Toast.show({ text: parent.state.errorInfo, position: 'top', duration: 2000 })
        }
        var qs = require("qs");
        axios.post("/member/login",
            qs.stringify({
                username: parent.state.username,
                password: parent.state.password
            })
        )
            .then(function (response) {
                console.log("response=", response.data);
                if (response.data.status == 200 && response.data.token != null) {
                    console.log("msg=", response.data.token);
                    parent.setState({
                        isLoading: false
                    });
                    AsyncStorage.setItem("Token", response.data.token);
                    parent._onPressHome();
                } else {
                    console.log("renderErrorView", response.data.msg);
                    Toast.show({ text: response.data.msg, position: 'top', duration: 2000 })
                }
            })
            .catch(function (error) {
                parent.setState({
                    error: true,
                    errorInfo: error
                });
                Toast.show({ text: error, position: 'top', duration: 2000 })
                console.log("Error fetching and parsing data", error);
            });
    }

    onChange = state => {
        this.setState(state);
    }

    _onPressSignUp() {
        this.props.navigation.navigate("Register");
    }

    _onPressForgetPass() {
        this.props.navigation.navigate("ForgetPass");
    }

    _onPressHome() {
        const { updateCurrentUser } = this.props;
        updateCurrentUser({ name: 'toan ' });
        this.props.navigation.navigate('Drawer');
    }

    render() {
        return (
            <KeyboardAvoidingView style={styles.root}>
                <Container>
                    <StatusBar barStyle="light-content" />
                    <View style={styles.root}>
                        <View style={styles.imageContainer}>
                            <Image source={icon_top} style={styles.logoTop} />
                        </View>

                        <View style={styles.content}>
                            <Button style={styles.buttonLogin} onPress={() => this.onSubmit()}>
                                <Text style={{ color: "#FFF" }}>Đăng nhập</Text>
                            </Button>
                            <Item>
                                <Input style={{ color: "#000" }} placeholder="User name/Phone number:"
                                    placeholderTextColor="#000"
                                    textColor="#000"
                                    value={this.state.username}
                                    onChangeText={text => this.setState({ username: text })} />
                            </Item>
                            <Item>
                                <Input secureTextEntry={true} style={{ color: "#000" }} placeholder="Password:"
                                    placeholderTextColor="#000"
                                    value={this.state.password}
                                    onChangeText={text => this.setState({ password: text })} />
                            </Item>

                            <Text style={styles.textForget}
                                onPress={() => this._onPressForgetPass()}>Quên password?</Text>
                            <Text style={styles.textRegister}>Bạn chưa có tài khoản?</Text>
                            <Button style={styles.buttonRegister} onPress={() => this._onPressSignUp()}>
                                <Text style={{ color: "#FFF" }}>Đăng ký </Text>
                            </Button>
                        </View>
                        <View style={styles.imageContainerBottom}>
                            <Image source={icon_bottom} style={styles.logoBottom} />
                        </View>
                    </View>
                </Container>
            </KeyboardAvoidingView>
        );
    }
}

Login.navigationOptions = ({ navigation }) => getNavigationOptions('Login', Colors.primary, 'white');

const mapStateToProps = store => ({
    currentUser: store.currentUser,
});

const mapDispatchToProps = {
    updateCurrentUser: ducks.updateCurrentUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
