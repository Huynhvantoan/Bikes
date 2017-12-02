const React = require("react-native");

const { StyleSheet, Dimensions, Platform } = React;
import { primary } from '../../themes/colors';
const deviceHeight = Dimensions.get("window").height;

export default {
  container: {
    backgroundColor: primary,
  },
  body: {
    marginTop: 5,
    marginLeft: 5,
    backgroundColor: "transparent",
    justifyContent: "center"
  },
  content: {
    backgroundColor: "#FFFF",
    padding: 30
  },
  html: {
    fontWeight: '300' // make links coloured pink
  }
};
