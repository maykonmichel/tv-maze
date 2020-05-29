import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Shows from '../screens/Shows';

import 'react-native-gesture-handler';

const {Navigator, Screen} = createStackNavigator();

export default () => (
  <NavigationContainer>
    <Navigator>
      <Screen name="shows" component={Shows} />
    </Navigator>
  </NavigationContainer>
);
