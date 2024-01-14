// index.tsx
import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import TabRoutes from './tab.routes';

export default class Routes extends Component {
  render() {
    return (
      <NavigationContainer>
        <TabRoutes />
      </NavigationContainer>
    );
  }
}
