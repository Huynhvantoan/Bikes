import React, { Component } from "react";
import { Container,Text} from "native-base";
import {NativeModules} from 'react-native';
import { BackHandler } from "react-native";
class Exit extends React.PureComponent {
   
    componentWillUnmount() {
        NativeModules.Exit.exitApp();
    }
    render() {
        return (
            <Container>
                <Text style={{backgroundColor: "transparent", color: "#000"}}>Nhấn Back lần nữa để xác nhận thoát!</Text>
            </Container>
        );
    }
}

// var Exit = {
//     exitApp: function() {
//         NativeModules.Exit.exitApp();
//     }
// };
//
// var RNExitApp = {
//     exitApp: function() {
//         BackHandler.addEventListener('hardwareBackPress', function() {
//             // this.onMainScreen and this.goBack are just examples, you need to use your own implementation here
//             // Typically you would use the navigator here to go to the last state.
//
//             if (!this.onMainScreen()) {
//                 this.goBack();
//                 return true;
//             }
//             return false;
//         });
//     }
// };


export default Exit;
