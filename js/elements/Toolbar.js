// event for button Left or event for button Right 
import React, { Component } from 'react';
import {
    View,
    Image,
    TouchableOpacity,
    Text,
    StyleSheet
} from 'react-native'
import { primary } from '../themes/colors';
export default class Toolbar extends Component {

    constructor(props) {
        super(props);
    }
    actionLeft = () => {
        if (this.props.iconLeft) {
            if (this.props.actionLeft) {
                this.props.actionLeft();
            } else {
                this.props.navigation.goBack();
            }
        }
    }
    actionRight = () => {
        if (this.props.iconRight) {
            this.props.actionRight();

        }
    }
    render() {
        return (
            <View style={styles.toolbar}>
                <TouchableOpacity
                    style={{ width: 50, height: 50, justifyContent: 'center', alignItems: 'center' }}
                    onPress={this.actionLeft}>
                    {this.props.iconLeft ?
                        <Image
                            tintColor='white'
                            style={styles.toolbarLeft}
                            source={this.props.iconLeft}
                            resizeMode='contain'
                        />
                        : <View style={styles.toolbarLeft} />
                    }
                </TouchableOpacity>
                {
                    this.props.title ?
                        <Text style={styles.toolbarTitle} >{this.props.title}</Text>
                        : <Image
                            tintColor='white'
                            style={styles.logo}
                            source={this.props.logo}
                            resizeMode='contain' />
                }
                <TouchableOpacity
                    style={{ width: 50, height: 50, justifyContent: 'center', alignItems: 'center' }}
                    onPress={this.actionRight}>
                    {this.props.iconRight ?
                        <Image
                            tintColor='white'
                            style={styles.toolbarRight}
                            source={this.props.iconRight}
                            resizeMode='contain'
                        />
                        : <View style={styles.toolbarRight} />
                    }
                </TouchableOpacity>
            </View>);
    }

}

const styles = StyleSheet.create({
    toolbar: {
        backgroundColor: primary,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        height: 56,
        borderBottomWidth: 0.25,
        borderBottomColor: 'gray',
    },
    toolbarLeft: {
        width: 50,
        height: 50,
    },
    toolbarTitle: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    toolbarRight: {
        width: 20,
        height: 20,
    },
    logo: {
        height: 56,
        width: 100,
    }
});
