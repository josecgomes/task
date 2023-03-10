import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import Profile from '../screens/Profile';
import Details from '../screens/Details';

const AuthNavigation = props => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator initialRouteName="Home">
      <Tab.Screen name="Home" component={Home} />
    </Tab.Navigator>
  );
};

export default AuthNavigation;
