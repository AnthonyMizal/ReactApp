import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Login from '../screens/auth/login'
import Getstarted from '../screens/auth/getstarted'
import Signup from '../screens/auth/signup'
import {ROUTES} from '../constants/routes'
import BottomTabNavigator from './BottomTabNavigator';
import { createStackNavigator } from '@react-navigation/stack';
import Profile from '../screens/home/profile';
import EditProfile from '../screens/home/editprofile';
import ManageRecipe from '../screens/home/managerecipe';
import Editrecipe from '../screens/home/editrecipe';

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
        <Stack.Screen name={ROUTES.PROFILE} component={Profile}/>
        <Stack.Screen name={ROUTES.EDIT_PROFILE} component={EditProfile}/>
        {/* <Stack.Screen name={ROUTES.LOGIN} component={Login}/> */}
        <Stack.Screen name={ROUTES.MANAGE_RECIPE} component={ManageRecipe}/>
        <Stack.Screen name={ROUTES.EDITOWNRECIPE} component={Editrecipe}/>
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({

})

export default AuthNavigator;