import {
  StyleSheet
} from 'react-native';
export default styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  map: {
    flex: 1,
  },
  bottom: {
    zIndex: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingLeft: 30,
    paddingRight: 30,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  location: {
    width: 60,
    height: 60,
  },
  scan: {
    width: 120,
    height: 120,
  },
  help: {
    width: 60,
    height: 60,
  },
  icon: {
    fontSize: 20,
    color: '#EF6530',
  }
});