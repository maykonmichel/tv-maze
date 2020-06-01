import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import 'react-native-gesture-handler';

import Episode from '../screens/Episode';
import Show from '../screens/Show';
import Shows from '../screens/Shows';

import colors from '../theme/colors';

const {Navigator, Screen} = createStackNavigator();

export default () => (
  <NavigationContainer>
    <Navigator screenOptions={{headerTintColor: colors.primary.dark}}>
      <Screen name="shows" component={Shows} />
      <Screen name="show" component={Show} />
      <Screen
        name="episode"
        component={Episode}
        options={{headerTitle: null, headerTransparent: true}}
      />
    </Navigator>
  </NavigationContainer>
);
