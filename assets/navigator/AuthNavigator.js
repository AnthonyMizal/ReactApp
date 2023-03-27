import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../screens/auth/login'
import Getstarted from '../screens/auth/getstarted'
import Signup from '../screens/auth/signup'
import {ROUTES} from '../constants/routes'
import BottomTabNavigator from './BottomTabNavigator';

const Stack = createStackNavigator();

const AuthNavigator = () => {
  return (
    <Stack.Navigator
    screenOptions={{
        headerShown: false
      }}
    initialRouteName={ROUTES.GETSTARTED}  
    >
        <Stack.Screen name={ROUTES.GETSTARTED} component={Getstarted}/>
        <Stack.Screen name={ROUTES.LOGIN} component={Login}/>
        <Stack.Screen name={ROUTES.SIGNUP} component={Signup}/>
        <Stack.Screen name={ROUTES.HOME_NAVIGATOR} component={BottomTabNavigator}/>
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({

})

export default AuthNavigator;