import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';
import {Icon} from "native-base";

class NavBarItem extends Component {
  render() {
    const { iconName, onPress } = this.props;
    return (
      <TouchableOpacity
        style={{ paddingHorizontal: 0 }}
        onPress={() => onPress()}
      >
        <Icon name={iconName} size={30} color="#fff" />
      </TouchableOpacity>

    );
  }
}

NavBarItem.propTypes = {
  iconName: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
};

export default NavBarItem;