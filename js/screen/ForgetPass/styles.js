const React = require("react-native");

const { StyleSheet, Dimensions, Platform } = React;

const deviceHeight = Dimensions.get("window").height;

export default {
  content: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: "#3c5b94"
  },
  messageBox: {

  },
  imageContainer: {
    backgroundColor: "#3c5b94",
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
    marginTop: Platform.OS === "android" ? 10 : 60,
    width: 153,
    height: 164
  },
  text: {
    color: "#D8D8D8",
    bottom: 6,
    marginTop: 5
  }
};
