const React = require("react-native");

const { StyleSheet, Dimensions, Platform } = React;

const deviceHeight = Dimensions.get("window").height;

export default {
  container: {
    backgroundColor: "#FFFFFF"
  },
  titleToolbar: {
    fontFamily:'Roboto',
    fontSize: 12
  },
  title: {
    marginTop:10,
    marginBottom:10
  },
  content: {
    margin:15,
    fontWeight: '300',
    color: '#FF3366'
  }
};
