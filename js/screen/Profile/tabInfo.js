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
    CheckBox,
    Footer,
    FooterTab,
    Left,
    Right,
    Body,
    Item,
    Input,
    Label,
    Form,
    Picker
} from "native-base";
import axios from "axios";
//import BackgroundTimer from 'react-native-background-timer';
import api from "../../../utilities/Api";
import styles from './styles';
import CounterEmitter from '../../../js/utils/CountEmitter';
const PickItem = Picker.Item;

export default class TabOne extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            error: false,
            errorInfo: "",
            client: '',
            clients: [],
            schoolName: 'Trường đại học khoa học tự nhiên',
            schoolID: 3,
            data: {}
        };
        this.onChange = this.onChange.bind(this);
    }

    _onPressNam() {
        const newData = Object.assign({}, this.state.data, {
            gender: 1
        });
        this.setState({
            data: newData
        });
    }

    _onPressNu() {
        const newData = Object.assign({}, this.state.data, {
            gender: 0
        });
        this.setState({
            data: newData
        });
    }

    componentWillMount() {
        var parent = this;
        parent._loadInitialState().done();
        setTimeout(function () {
            parent._loadDataShools().done();
        }, 2000);
        // Cancel the timeout if necessary
        //   BackgroundTimer.clearTimeout(timeoutId);
    }

    functionTwo() {
        (async () => {
            await this._loadDataShools().done();
        })();
    }

    async _loadInitialState() {
        try {
            var parent = this;
            var accessToken = await AsyncStorage.getItem("Token");
            if (accessToken !== null) {
                axios.defaults.baseURL = "http://demo.easymove.vn/api";
                axios.defaults.headers.common["Authorization"] =
                    api.KEY;
                axios.defaults.headers.common["Authorization2"] =
                    "XeDap " + accessToken;
                axios.defaults.headers.post["Accept"] = "application/json";
                axios.defaults.headers.post["Content-Type"] =
                    "application/x-www-form-urlencoded; charset=UTF-8";
                axios
                    .get("/member/info")
                    .then(function (response) {
                        console.log("response=", response);
                        if (response.status == 200) {
                            console.log("school_id=", response.data.school_id);
                            parent.setState({
                                data: response.data,
                                schoolID: response.data.school_id
                            });
                            if (response.data.school_id == null) {
                                parent.setState({
                                    schoolName: "null",
                                    isLoading: false
                                });
                            }
                        } else {
                            Toast.show({ text: "Lấy dữ liệu bị lỗi!", position: 'top', duration: 2000 });
                            console.log("Parse Error");
                        }
                    })
                    .catch(function (error) {
                        Toast.show({ text: error, position: 'top', duration: 2000 });
                        parent.setState({
                            error: true,
                            errorInfo: error
                        });
                        console.log("Error fetching and parsing data", error);
                    });
            }
        } catch (error) {
            console.log("AsyncStorage error: " + error);
        }
    }

    async _loadDataShools() {
        try {
            var parent = this;
            axios.get("/schools")
                .then(function (response) {
                    console.log("data=", response.data);
                    if (response.status == 200) {
                        parent.setState({
                            clients: response.data.msg,
                        });
                        response.data.msg.map((data, index) => {
                            console.log("id=", data.id);
                            console.log("schoolID=", parent.state.schoolID);
                            if (data.id == parent.state.schoolID) {
                                console.log("name=", data.name);
                                parent.setState({
                                    schoolName: data.name,
                                    isLoading: false
                                });
                            }
                        })
                    } else {
                        console.log("renderErrorView", response.data.msg);
                    }
                })
                .catch(function (error) {
                    parent.setState({
                        error: true,
                        errorInfo: error
                    });
                    console.log("Error fetching and parsing data", error);
                });
        } catch (error) {
            console.log("AsyncStorage error: " + error);
        }
    }

    onUpdateProfile() {
        var parent = this;
        var qs = require("qs");
        const data = parent.state.data;
        const param = {
            id: data.id,
            fullname: data.fullname,
            username: data.username,
            email: data.email,
            email2: data.email2,
            phone: data.phone,
            gender: data.gender,
            birthday: data.birthday,
            avatar: data.avatar,
            id_city: data.id_city,
            address: data.address,
            id_countries: data.id_countries,
            last_connection: data.last_connection,
            ip_connection: data.ip_connection,
            date_active: data.date_active,
            token: data.token,
            login_type: data.login_type,
            school_id: parent.state.schoolID,
            student_id: data.student_id,
            passport: data.passport,
            dormitory_id: data.dormitory_id,
            facebook: data.facebook
        };
        console.log("param=", parent.state.schoolID + "");
        axios
            .post("/member/update", qs.stringify(param))
            .then(function (response) {
                console.log("response=", response);
                if (response.status == 200) {
                    console.log("msg=", response.data.msg);
                    Toast.show({ text: response.data.msg, position: 'top', duration: 2000 });
                    parent.setState({
                        isLoading: false
                    });
                } else {
                    Toast.show({ text: response.data.msg, position: 'top', duration: 2000 });
                    parent.setState({
                        error: true,
                        errorInfo: response.data.msg
                    });
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

    renderProgress = () => {
        return (
            <View style={styles.progressBar}>
                <Spinner color="#EF6530" />
            </View>
        );
    };

    updateLists(item) {
        var list = this.state.clients;
        console.log("selected=", list[item].id);
        this.setState({ schoolID: list[item].id, client: item });
    }

    render() {
        console.log("name=", this.state.schoolName);
        if (this.state.isLoading) {
            return this.renderProgress();
        }
        if (!this.state.isLoading) {
            return (
                <Content padder>
                    <View>
                        <Item stackedLabel>
                            <Label>Họ và tên</Label>
                            <Input style={{ color: "#3c5b94" }} textColor="#3c5b94"
                                value={this.state.data.fullname}
                                onChangeText={text => {
                                    const newData = Object.assign({}, this.state.data, {
                                        fullname: text
                                    });
                                    this.setState({ data: newData });
                                    CounterEmitter.emit('EventBusName', this.state.data.fullname);
                                }} />
                        </Item>
                        <Item stackedLabel>
                            <Label>Tài khoản</Label>
                            <Input style={{ color: "#3c5b94" }} textColor="#3c5b94"
                                value={this.state.data.username}
                                onChangeText={text => {
                                    const newData = Object.assign({}, this.state.data, {
                                        username: text
                                    });
                                    this.setState({ data: newData });
                                }} />
                        </Item>
                        <Item stackedLabel>
                            <Label>Email</Label>
                            <Input style={{ color: "#3c5b94" }} textColor="#3c5b94"
                                value={this.state.data.email}
                                onChangeText={text => {
                                    const newData = Object.assign({}, this.state.data, {
                                        email: text
                                    });
                                    this.setState({ data: newData });
                                    CounterEmitter.emit('EventBusEmail', this.state.data.email);
                                }} />
                        </Item>
                        <Item stackedLabel>
                            <Label>Trường</Label>
                            <Picker
                                textStyle={{ color: '#3c5b94' }}
                                mode="dropdown"
                                placeholder={this.state.schoolName}
                                selectedValue={this.state.client}
                                onValueChange={(item) => {
                                    this.updateLists(item);
                                }}>
                                {this.state.clients.map((data, index) => {
                                    return <PickItem value={index} label={data.name} key={index} />
                                }
                                )}
                            </Picker>
                        </Item>
                        <Item stackedLabel>
                            <Label>Giới tính</Label>
                            <View style={styles.cardSex}>
                                <View style={styles.textSex}>
                                    <Body>
                                        <Text style={{ color: "#3c5b94" }}>Nam</Text>
                                    </Body>
                                    <CheckBox
                                        color='#EF6530'
                                        checked={this.state.data.gender == 1}
                                        onPress={() => this._onPressNam()} />
                                </View>
                                <View style={styles.textSex}>
                                    <Body>
                                        <Text style={{ color: "#3c5b94" }}>Nữ</Text>
                                    </Body>
                                    <CheckBox
                                        color='#EF6530'
                                        checked={this.state.data.gender == 0}
                                        onPress={() => this._onPressNu()} />
                                </View>
                            </View>
                        </Item>
                        <Item stackedLabel>
                            <Label>Mã sinh viên</Label>
                            <Input style={{ color: "#3c5b94" }} textColor="#3c5b94"
                                value={this.state.data.student_id}
                                onChangeText={text => {
                                    const newData = Object.assign({}, this.state.data, {
                                        student_id: text
                                    });
                                    this.setState({ data: newData });
                                }} />
                        </Item>
                        <Item stackedLabel>
                            <Label>Facebook</Label>
                            <Input style={{ color: "#3c5b94" }} textColor="#3c5b94"
                                value={this.state.data.facebook}
                                onChangeText={text => {
                                    const newData = Object.assign({}, this.state.data, {
                                        facebook: text
                                    });
                                    this.setState({ data: newData });
                                }} />
                        </Item>
                        <Item stackedLabel>
                            <Label>Địa chỉ</Label>
                            <Input style={{ color: "#3c5b94" }} textColor="#3c5b94"
                                value={this.state.data.address}
                                onChangeText={text => {
                                    const newData = Object.assign({}, this.state.data, {
                                        address: text
                                    });
                                    this.setState({ data: newData });
                                }} />
                        </Item>
                        <Item stackedLabel>
                            <Label>Số điện thoại</Label>
                            <Input style={{ color: "#3c5b94" }} textColor="#3c5b94"
                                value={this.state.data.phone}
                                onChangeText={text => {
                                    const newData = Object.assign({}, this.state.data, {
                                        phone: text
                                    });
                                    this.setState({ data: newData });
                                }} />
                        </Item>
                        <Item stackedLabel>
                            <Label>Ký túc xá</Label>
                            <Input style={{ color: "#3c5b94" }} textColor="#3c5b94"
                                value={this.state.data.dormitory_id + ""}
                                onChangeText={text => {
                                    const newData = Object.assign({}, this.state.data, {
                                        dormitory_id: text
                                    });
                                    this.setState({ data: newData });
                                }} />
                        </Item>
                        <Item stackedLabel>
                            <Label>Hộ chiếu</Label>
                            <Input style={{ color: "#3c5b94" }} textColor="#3c5b94"
                                value={this.state.data.passport}
                                onChangeText={text => {
                                    const newData = Object.assign({}, this.state.data, {
                                        passport: text
                                    });
                                    this.setState({ data: newData });
                                }} />
                        </Item>
                        <Button style={{
                            borderRadius: 10,
                            backgroundColor: "#EF6530",
                            width: '100%',
                            marginTop: 30,
                            marginBottom: 30,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                            onPress={() => this.onUpdateProfile()}>
                            <Text>Cập nhật</Text>
                        </Button>
                    </View>
                </Content>
            );
        }
    }
    // onValueChange={(cli, position) => this.setState({client: cli, schoolID: position})}>
}
