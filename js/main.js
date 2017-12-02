import React from 'react';
import { StatusBar, View } from 'react-native';
import { Container } from 'native-base';
import { Provider } from 'react-redux';
import App from './app';
import createStore from './createStore';
import Stack from './router';
class Main extends React.Component {

  render() {
    const store = createStore();
    return (
      <Provider store={store}>
        <Container>
          <StatusBar
            hidden
          />
          <Stack />
        </Container>
      </Provider>
    );
  }
}

export default Main;