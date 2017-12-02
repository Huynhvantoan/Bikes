const React = require("react-native");

const { Dimensions, Platform } = React;

const deviceWidth = Dimensions.get("window").width;

export default {
    root: {
        backgroundColor: "#FFF",
        flex: 1,
        width: null,
        height: null
    },
    imageContainer: {
        flex: 0.4,
        alignItems: 'center',
        justifyContent: 'center'
    },
    imageContainerBottom: {
        flex: 0.7,
        alignItems: 'center',
        justifyContent: 'center'
    },
    content: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        marginLeft: 30,
        marginRight: 30
    },
    buttonLogin: {
        backgroundColor: "#f26422",
        width: '100%',
        height: 40,
        marginTop: 30,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonRegister: {
        backgroundColor: "#f26422",
        width: '100%',
        height: 40,
        marginTop: 5,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textForget: {
        color: "#f26422",
        marginTop: 10
    },
    textRegister: {
        color: "#000",
        marginTop: 20
    },
    logoTop: {
        marginTop: Platform.OS === "android" ? 10 : 60,
        width: 260,
        resizeMode: 'center'
    },
    logoBottom: {
        width: deviceWidth,
        height: deviceWidth / 1.5,
        resizeMode: 'stretch'
    }
};
