import React, { Component } from 'react';
import { 
  View,
  Image,
  Text,
  TouchableOpacity
 } from 'react-native';

 export default class MenuItem extends Component {
   render() {
     return (
       <TouchableOpacity 
          onPress ={this.props.onPress}>
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingLeft: 15,
            paddingRight: 5,
          }}>
              <Image 
              style={{
                width: 40, 
                height: 40,
              }}
              resizeMode='contain'
              source={this.props.source}/>
              <Text style={{
                  marginLeft: 15,
                  color: 'black',
                  fontSize: 14,
              }}>{this.props.text}</Text>
          </View>
       </TouchableOpacity>
       
     );
   }
 }