import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, SafeAreaView, TouchableOpacity, TextInput, KeyboardAvoidingView } from 'react-native';
import {COLORS} from './assets/constants/colors';
import { SvgXml } from 'react-native-svg';
import {useFonts} from 'expo-font';
import { NavigationContainer } from "@react-navigation/native";

import AuthNavigator from './assets/navigator/AuthNavigator';

export default function App() {
  
  let [fontsLoaded] = useFonts({
    'Momcake-Bold': require('./assets/fonts/Momcake-Bold.otf'),
    'Momcake-Thin': require('./assets/fonts/Momcake-Thin.otf'),
    'CL-Reg': require('./assets/fonts/CL-Reg.ttf'),
    'CL-Bold': require('./assets/fonts/CL-Bold.ttf'),
    'Antically': require('./assets/fonts/Antically.ttf'),
  });
  if (!fontsLoaded) {
    return null;
  }

    return (
    <NavigationContainer>
      <AuthNavigator/>
    </NavigationContainer>
    )
}

