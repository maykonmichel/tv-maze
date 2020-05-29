import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Series from '../screens/Series';

import 'react-native-gesture-handler';

const {Navigator, Screen} = createStackNavigator();

export default () => (
  <NavigationContainer>
    <Navigator>
      <Screen name="series" component={Series} />
    </Navigator>
  </NavigationContainer>
);
