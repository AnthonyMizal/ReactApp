import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import EditProfile from '../screens/home/editprofile';
import Profile from '../screens/home/profile';
import {ROUTES} from '../constants/routes'
import { createStackNavigator } from '@react-navigation/stack';
import ManageRecipeNavigator from './ManageRecipeNavigator';

const Stack = createStackNavigator();

const ProfileNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{
        headerShown: false
      }}
    initialRouteName={ROUTES.PROFILE}  >
        <Stack.Screen name={ROUTES.PROFILE} component={Profile}/>
        <Stack.Screen name={ROUTES.EDIT_PROFILE} component={EditProfile}/>
        <Stack.Screen name={ROUTES.MANAGE_RECIPE_NAVIGATOR} component={ManageRecipeNavigator}/>
        {/* <Stack.Screen name={ROUTES.LOGIN} component={Login}/> */}
        
        {/* <Stack.Screen name={ROUTES.AUTH_NAVIGATOR} component={AuthNavigator}/> */}
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({

})

export default ProfileNavigator;