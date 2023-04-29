import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {ROUTES} from '../constants/routes'
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/home/home';
import RecipeDetails from '../screens/home/recipeDetails';

const Stack = createStackNavigator();

const RecipeNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{
        headerShown: false
      }} >
        <Stack.Screen name={ROUTES.RECIPE_HOME} component={Home}/>
        <Stack.Screen name={ROUTES.RECIPE_DETAILS} component={RecipeDetails}/>
        {/* <Stack.Screen name={ROUTES.LOGIN} component={Login}/> */}
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({

})

export default RecipeNavigator;