const React = require("react-native");

const { StyleSheet, Dimensions, Platform } = React;

const deviceHeight = Dimensions.get("window").height;

export default {
  container:{
    backgroundColor: "#3c5b94"
  },
  imageContainer: {
    backgroundColor: "#FFFFFF",
    flex: 1,
    width: null,
    height: null
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
