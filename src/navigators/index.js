import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Episode from '../screens/Episode';
import Show from '../screens/Show';
import Shows from '../screens/Shows';

import 'react-native-gesture-handler';

const {Navigator, Screen} = createStackNavigator();

export default () => (
  <NavigationContainer>
    <Navigator>
      <Screen name="shows" component={Shows} />
      <Screen name="show" component={Show} />
      <Screen name="episode" component={Episode} />
    </Navigator>
  </NavigationContainer>
);
