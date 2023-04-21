import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../screens/auth/login';
import EditProfile from '../screens/home/editprofile';
import ManageRecipe from '../screens/home/managerecipe';
import Profile from '../screens/home/profile';
import {ROUTES} from '../constants/routes'
import BottomTabNavigator from './BottomTabNavigator';


const Stack = createStackNavigator();

const ProfileNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{
        headerShown: false
      }}
    initialRouteName={ROUTES.PROFILE}  >
        <Stack.Screen name={ROUTES.PROFILE} component={Profile}/>
        <Stack.Screen name={ROUTES.EDIT_PROFILE} component={EditProfile}/>
        <Stack.Screen name={ROUTES.LOGIN} component={Login}/>
        <Stack.Screen name={ROUTES.MANAGE_RECIPE} component={ManageRecipe}/>
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({

})

export default ProfileNavigator;