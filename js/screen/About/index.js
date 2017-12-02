import React, { Component } from "react";
import { ScrollView, Image, View } from "react-native";
import {
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
    Right,
    Body,
    Item
} from "native-base";
import styles from "./styles";

const icon_bottom = require("../../../assets/images/bg_about.png");
const icon_top = require("../../../assets/images/icon_login.png");

class About extends Component {
    static navigationOptions = {
        header: null
    };

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
                        <Title style={styles.titleToolbar}>Giới thiệu</Title>
                    </Body>
                    <Right />
                </Header>
                    <View style={styles.root}>
                        <View style={styles.imageContainerBottom}>
                            <Image 
                            resizeMode='stretch'
                             source={icon_bottom}
                             style={styles.logoBottom} />
                        </View>
                        <View style={styles.imageContainer}>
                            <Image source={icon_top} style={styles.logoTop} />
                        </View>
                        <View style={styles.content1}>
                            <Text style={styles.textAbout}>
                                <Text>
                                    Hệ thống
                                </Text>
                                <Text style={styles.textBold}>
                                    {` E-Bikes `}
                                </Text>
                                <Text>
                                    do
                                </Text>
                                <Text style={styles.textBold}>
                                    {` Công tyTNHH TM & KT Tân kỷ Nguyên `}
                                </Text>
                                <Text>
                                    nghiên cứu và triển khai. Hãy cùng sử dụng xe đạp để góp phần nâng cao sức khỏe, bảo
                                    vệ môi trường và hạn chế tai nạn giao thông.
                                </Text>
                            </Text>
                        </View>
                        <View style={styles.content2}>
                            <Text style={styles.textContact1}>
                                Contact us
                            </Text>
                            <Text style={styles.textContact2}>
                                service@easymove.vn
                            </Text>
                        </View>
                        <View style={styles.content3}>
                            <Text style={styles.textBase}>
                                &copy;Copyright 2017 Easymove. All right reverse.
                            </Text>
                            <Text style={styles.textBase}>
                                Công tyTNHH TM & KT Tân kỷ Nguyên
                            </Text>
                            <Text style={styles.textBase}>
                                Add:43 Tản Đà, Phường 10 , Quận 5, TP.HCM
                            </Text>
                        </View>
                       
                    </View>
            </Container>
        );
    }
}

export default About;
