import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ManageRecipe from '../screens/home/managerecipe';
import {ROUTES} from '../constants/routes'
import { createStackNavigator } from '@react-navigation/stack';
import Editrecipe from '../screens/home/editrecipe';

const Stack = createStackNavigator();

const ManageRecipeNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{
        headerShown: false
      }}
    initialRouteName={ROUTES.MANAGE_RECIPE}  >
        <Stack.Screen name={ROUTES.MANAGE_RECIPE} component={ManageRecipe} />
        <Stack.Screen name={ROUTES.EDITOWNRECIPE} component={Editrecipe} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({

})

export default ManageRecipeNavigator;