const React = require("react-native");

const { StyleSheet, Dimensions, Platform } = React;

const deviceHeight = Dimensions.get("window").height;

export default {
  container: {
    backgroundColor: "#3c5b94"
  },
  imageContainer: {
    backgroundColor: "#3c5b94",
    flex: 1,
    width: null,
    height: null
  },
  content: {
    marginLeft: 16
  },
  card: {
    backgroundColor: "#FFFF",
    flexDirection: "row",
    marginTop: 10,
    marginLeft:5,
    marginRight:5,
    borderRadius:10,
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
  }
};
