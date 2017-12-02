const React = require("react-native");

const {StyleSheet, Dimensions, Platform} = React;

const deviceWidth = Dimensions.get("window").width;

export default {
    container: {
        backgroundColor: "#3c5b94"
    },
    qrcode: {
        marginBottom: 0
    },
    content: {
        width: deviceWidth,
        height: 300,
        justifyContent: 'center',
        alignItems: 'center'
    },
};
