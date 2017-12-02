import React, { Component } from 'react';
import { AsyncStorage, TouchableOpacity, Keyboard, Image, View, StatusBar } from "react-native";
import {
    Spinner,
    Container,
    Toast,
    Thumbnail,
    Header,
    Title,
    Content,
    Text,
    H3,
    Button,
    Icon,
    Footer,
    FooterTab,
    Left,
    Right,
    Body,
    Item,
    Input,
    Label,
    Form
} from "native-base";
import axios from "axios";
import PropTypes from "prop-types";
import api from "../../../utilities/Api";
import styles from './styles';

export default class TabTwo extends Component {
    // eslint-disable-line
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            error: false,
            errorInfo: "",
            password: "",
            cpassword: "",
            oldpassword: ""
        };
        this.onChange = this.onChange.bind(this);
    }

    onSubmit() {
        axios.defaults.baseURL = "http://demo.easymove.vn/api";
        axios.defaults.headers.common["Authorization"] = api.KEY;
        axios.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
        this.callApi();
    }

    callApi() {
        var parent = this;
        if (parent.state.isLoading && !parent.state.error) {
            <View style={styles.container}>
                <Spinner color="#EF6530" />
            </View>;
        }
        var qs = require("qs");
        axios.post(
            "/member/changepass",
            qs.stringify({
                password: parent.state.password,
                cpassword: parent.state.cpassword,
                oldpassword: parent.state.oldpassword,
            })
        )
            .then(function (response) {
                if (response.status == 200) {
                    console.log("msg=", response.data.token);
                    parent.setState({
                        isLoading: false,
                        password: parent.state.password,
                        cpassword: parent.state.cpassword,
                        oldpassword: parent.state.oldpassword,
                    });
                    Toast.show({ text: response.data.msg, position: 'top', duration: 2000 });
                } else {
                    console.log("renderErrorView", response.data.msg);
                    Toast.show({ text: response.data.msg, position: 'top', duration: 2000 });
                }
            })
            .catch(function (error) {
                parent.setState({
                    error: true,
                    errorInfo: error
                });
                Toast.show({ text: error, position: 'top', duration: 2000 });
                console.log("Error fetching and parsing data", error);
            });
    }

    onChange = state => {
        this.setState(state);
    };

    render() {
        // eslint-disable-line
        return (
            <Content padder>
                <View>
                    <Form>
                        <Item stackedLabel>
                            <Label textColor="#3c5b94">Mật khẩu cũ</Label>
                            <Input secureTextEntry={true} style={{ color: "#3c5b94" }} textColor="#3c5b94"
                                value={this.state.oldpassword}
                                onChangeText={text => this.setState({ oldpassword: text })} />
                        </Item>
                        <Item stackedLabel>
                            <Label textColor="#3c5b94">Mật khẩu mới</Label>
                            <Input secureTextEntry={true} style={{ color: "#3c5b94" }} textColor="#3c5b94"
                                value={this.state.password}
                                onChangeText={text => this.setState({ password: text })} />
                        </Item>
                        <Item stackedLabel>
                            <Label textColor="#3c5b94">Xác nhận mật khẩu mới</Label>
                            <Input secureTextEntry={true} style={{ color: "#3c5b94" }} textColor="#3c5b94"
                                value={this.state.cpassword}
                                onChangeText={text => this.setState({ cpassword: text })} />
                        </Item>
                    </Form>
                    <Button style={{
                        backgroundColor: "#EF6530", width: '100%', marginTop: 30, justifyContent: 'center',
                        alignItems: 'center', borderRadius: 10,
                    }}
                        onPress={() => this.onSubmit()}>
                        <Text>Đổi mật khẩu</Text>
                    </Button>
                </View>
            </Content>
        );
    }
}
