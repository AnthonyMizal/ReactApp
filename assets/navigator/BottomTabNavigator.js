import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, KeyboardAvoidingView, StatusBar } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/home/home';
import Search from '../screens/home/search';
import Addrecipe from '../screens/home/addrecipe';
import Bookmark from '../screens/home/bookmark';
import Profile from '../screens/home/profile';
import {ROUTES} from '../constants/routes';
import Icon from 'react-native-vector-icons/FontAwesome';
import ProfileNavigator from './ProfileNavigator';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    
    <Tab.Navigator
    screenOptions={({route}) => ({
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          display: 'flex',
          backgroundColor: '#fff',
          height: 60,
          borderTopWidth: 0,
          elevation: 50
        },
        tabBarShowLabel: false,
        headerShown: false,
      })}>
      <Tab.Screen name={ROUTES.HOME} component={Home}
      options={{
        tabBarIcon: ({focused}) => (
          <View
            style={{
              top: Platform.OS === 'ios' ? 10 : 0,
            }}>
            <Icon
              name= 'home'
              size={28}
              color={focused ? '#31C84F' : '#DDDDDD'}
            />
          </View>
        ),
      }}/>
      <Tab.Screen name={ROUTES.SEARCH} component={Search} options={{
            tabBarIcon: ({focused}) => (
              <View
                style={{
                  top: Platform.OS === 'ios' ? 10 : 0,
                }}>
                <Icon
                  name="search"
                  size={28}
                  color={focused ? '#31C84F' : '#DDDDDD'}
                />
                
              </View>

            ),
          }}/>
      <Tab.Screen name={ROUTES.ADDRECIPE} component={Addrecipe} options={{
          tabBarShowLabel: true,

            tabBarStyle: {
              display: "none",
            },
            tabBarIcon: ({focused}) => (
              focused?
              <Image style={{width:70, height:70,top: Platform.OS === 'ios' ? -0 : -30}} source={require('../addrecipe.png')} /> : <Image style={{width:70, height:70,top: Platform.OS === 'ios' ? -0 : -30}} source={require('../addrecipe.png')} />
            
              // <TouchableOpacity>
              // <View
              //   style={{
              //     top: Platform.OS === 'ios' ? -0 : -30,
              //     width: Platform.OS === 'ios' ? 50 : 95,
              //     height: Platform.OS === 'ios' ? 50 : 95,
              //     borderRadius: Platform.OS === 'ios' ? 25 : 60,
              //     backgroundColor: 'white',
              //     display: 'flex',
              //     alignItems: 'center',
              //     justifyContent: 'center'
              //   }}>
              //   {/* <Icon
              //     name="plus-circle"
              //     size={Platform.OS === 'ios' ? 50 : 70}
              //     color={focused ? '#31C84F' : '#31C84F'}
              //   /> */}
              //   <Image style={{width:63, height:63}} source={require('../icons/addrecipe.png')} />
              // </View> 
              // </TouchableOpacity>
            ) 
          }}/>
      <Tab.Screen name={ROUTES.BOOKMARK} component={Bookmark} options={{
            tabBarIcon: ({focused}) => (
              <View
                style={{
                  top: Platform.OS === 'ios' ? 10 : 0,
                }}>
                <Icon
                  name="bookmark"
                  size={28}
                  color={focused ? '#31C84F' : '#DDDDDD'}
                />
              </View>
            ),
          }}/>
      <Tab.Screen name={ROUTES.PROFILENAVIGATOR} component={ProfileNavigator} options={{
            tabBarIcon: ({focused}) => (
              <View
                style={{
                  top: Platform.OS === 'ios' ? 10 : 0,
                }}>
                <Icon
                  name="user"
                  size={28}
                  color={focused ? '#31C84F' : '#DDDDDD'}
                />
              </View>
            ),
          }}/>
    </Tab.Navigator>
  );
}

export default BottomTabNavigator;