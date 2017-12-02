const React = require("react-native");

const { StyleSheet, Dimensions, Platform } = React;

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;
export default {
    container: {
        backgroundColor: "white"
    },
    imageContainer: {
        flex: 1,
        width: deviceWidth,
        height: 918 * deviceWidth / 2751,

    },
    content: {
        flex: 1,
        flexDirection: "row",
        marginLeft: 16,
        justifyContent: 'center',
        alignItems: 'center'
    },
    card: {
        backgroundColor: "#FFFF",
        flexDirection: "row",
        marginTop: 10,
        marginLeft: 5,
        marginRight: 5,
        borderRadius: 10,
        height: 110
    },
    title: {
        fontSize: 16,
        fontFamily: "FontAwesome",
        color: "#000000"
    },
    summary: {
        fontSize: 14,
        fontFamily: "Roboto",
        color: "#000000"
    },
    logoContainer: {
        marginTop: deviceHeight / 8,
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    logo: {
        marginTop: Platform.OS === "android" ? 35 : 60,
        width: 200,
        height: 214
    },
    text: {
        color: "#D8D8D8",
        bottom: 6,
        marginTop: 5
    },
    cardSex: {
        width: 300,
        marginBottom: 10,
        backgroundColor: "transparent",
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: 'center'
    },
    textSex: {
        marginTop: 10,
        width: 100,
        flexDirection: "row",
    }
};
