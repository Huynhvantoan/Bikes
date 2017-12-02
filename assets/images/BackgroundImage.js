import React, {Component} from 'react';
import { Image } from 'react-native';


class BackgroundImage extends Component {
    render() {
        return(
            <Image
                source={require('/Volumes/Data/FreeLancer/ReactNative/bikes_app/bikes/app/assets/images/bg_login.jpg')}
                style={this.props.style}>
                {this.props.children}
            </Image>
        );
    }
}


module.exports = BackgroundImage;
