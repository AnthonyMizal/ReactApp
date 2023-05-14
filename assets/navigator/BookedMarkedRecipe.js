import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {ROUTES} from '../constants/routes'
import { createStackNavigator } from '@react-navigation/stack';
import Editrecipe from '../screens/home/editrecipe';

import BookMarkedRecipeDetails from '../screens/home/bookmarkedRecipeDetails';
import BookmarkFilter from '../components/bookmarkedRecipe';
import Bookmark from '../screens/home/bookmark';

const Stack = createStackNavigator();

const BookmarkedRecipeNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{
        headerShown: false
      }}
    initialRouteName={ROUTES.BOOKMARK}  >
        <Stack.Screen name={ROUTES.BOOKMARK} component={Bookmark}/>
        {/* <Stack.Screen name={ROUTES.LOGIN} component={Login}/> */}
        <Stack.Screen name={ROUTES.BOOKMARKED_RECIPE_DETAILS} component={BookMarkedRecipeDetails}/>
        {/* <Stack.Screen name={ROUTES.AUTH_NAVIGATOR} component={AuthNavigator}/> */}
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({

})

export default BookmarkedRecipeNavigator;