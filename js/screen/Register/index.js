import React, { Component } from "react";
import { ScrollView, Image, View } from "react-native";
import {
    Spinner,
    Container,
    Toast,
    Header,
    Title,
    Content,
    Text,
    H3,
    Button,
    Icon,
    Left,
    CheckBox,
    ListItem,
    Right,
    Body,
    Item,
    Input
} from "native-base";
import styles from "./styles";
import axios from "axios";
import api from "../../../utilities/Api";
import { primary } from '../../themes/colors';
const icon_logo = require("../../../assets/images/icon_login.png");

class Register extends React.PureComponent {
    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);
        this.state = {
            tabNam: true,
            tabNu: false,
            isLoading: true,
            error: false,
            errorInfo: null,
            fullname: "",
            username: "",
            sdt: "",
            email: "",
            password: "",
            cpassword: "",
            gender: 1
        };
        this.onChange = this.onChange.bind(this);
    }

    onSubmit() {
        console.log("sex=", this.state.gender);
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
        axios.post("/member/register",
            qs.stringify({
                fullname: parent.state.fullname,
                username: parent.state.username,
                sdt: parent.state.sdt,
                email: parent.state.email,
                password: parent.state.password,
                cpassword: parent.state.cpassword,
                gender: parent.state.gender
            })
        )
            .then(function (response) {
                if (response.data.status == 200) {
                    Toast.show({ text: response.data.msg, position: 'top', duration: 2000 })
                    parent.setState({
                        isLoading: false
                    });
                    parent._onPressLogin();
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

    _onPressLogin() {
        this.props.navigation.navigate("Login");
    }

    _onPressNam() {
        this.setState({
            tabNam: true,
            tabNu: false,
            gender: 1
        });
    }

    _onPressNu() {
        this.setState({
            tabNam: false,
            tabNu: true,
            gender: 0
        });
    }

    render() {
        return (
            <Container>
                <Header style={{ backgroundColor: '#EF6530' }}>
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.goBack()}>
                            <Icon name="arrow-back" />
                        </Button>
                    </Left>
                    <Body>
                        <Title style={styles.titleToolbar}>Đăng ký</Title>
                    </Body>
                    <Right />
                </Header>
                <Content>
                    <ScrollView>
                        <View style={styles.root}>
                            <View style={styles.imageContainer}>
                                <Image source={icon_logo} style={styles.logoTop} />
                            </View>
                            <View style={styles.content}>
                                <Item>
                                    <Input style={{ color: "#000" }} placeholder="Họ và tên:"
                                        placeholderTextColor="#000"
                                        textColor="#000"
                                        value={this.state.fullname}
                                        onChangeText={text => this.setState({ fullname: text })} />
                                </Item>
                                <Item>
                                    <Input style={{ color: "#000" }} placeholder="MSVV/MSCB:"
                                        placeholderTextColor="#000"
                                        textColor="#000"
                                        value={this.state.username}
                                        onChangeText={text => this.setState({ username: text })} />
                                </Item>
                                <Item>
                                    <Input style={{ color: "#000" }} placeholder="Đơn vị:"
                                        placeholderTextColor="#000"
                                        textColor="#000"
                                        value={this.state.username}
                                        onChangeText={text => this.setState({ username: text })} />
                                </Item>
                                <Item>
                                    <Input style={{ color: "#000" }} placeholder="Email:"
                                        placeholderTextColor="#000"
                                        textColor="#000"
                                        value={this.state.email}
                                        onChangeText={text => this.setState({ email: text })} />
                                </Item>
                                <Item>
                                    <Input style={{ color: "#000" }} placeholder="Điện thoại:"
                                        placeholderTextColor="#000"
                                        textColor="#000"
                                        value={this.state.sdt}
                                        onChangeText={text => this.setState({ sdt: text })} />
                                </Item>
                                <Item>
                                    <Input secureTextEntry={true} style={{ color: "#000" }} placeholder="Mật khẩu:"
                                        placeholderTextColor="#000" textColor="#000"
                                        value={this.state.password}
                                        onChangeText={text => this.setState({ password: text })} />
                                </Item>
                                <Item>
                                    <Input secureTextEntry={true} style={{ color: "#000" }}
                                        placeholder="Xác nhận mật khẩu:"
                                        placeholderTextColor="#000" textColor="#000"
                                        value={this.state.cpassword}
                                        onChangeText={text => this.setState({ cpassword: text })} />
                                </Item>
                                <View style={styles.card}>
                                    <View style={styles.textSex}>
                                        <Text style={{ color: "#000" }}>Nam</Text>
                                        <CheckBox
                                            color={primary}
                                            checked={this.state.tabNam}
                                            onPress={() => this._onPressNam()} />
                                    </View>
                                    <View style={styles.textSex}>
                                        <Text style={{ color: "#000" }}>Nữ</Text>
                                        <CheckBox
                                            color={primary}
                                            checked={this.state.tabNu}
                                            onPress={() => this._onPressNu()} />
                                    </View>
                                </View>
                                <View style={styles.container}>
                                    <Button style={styles.buttonRegister}
                                        onPress={() => this.onSubmit()}>
                                        <Text>Hoàn tất </Text>
                                    </Button>
                                </View>

                                <Text style={styles.textLogin}
                                    onPress={() => this._onPressLogin()}>Đăng nhập</Text>
                            </View>
                        </View>
                    </ScrollView>
                </Content>
            </Container>
        );
    }
}

export default Register;
