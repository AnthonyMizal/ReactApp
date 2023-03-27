import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, KeyboardAvoidingView } from 'react-native';
import {COLORS} from '../constants/colors';
import {useFonts} from 'expo-font';
import {ROUTES} from '../constants/routes'

const Category = (props) => {
    let [fontsLoaded] = useFonts({
        'Momcake-Bold': require('../fonts/Momcake-Bold.otf'),
        'Momcake-Thin': require('../fonts/Momcake-Thin.otf'),
        'CL-Reg': require('../fonts/CL-Reg.ttf'),
        'CL-Bold': require('../fonts/CL-Bold.ttf'),
        'Antically': require('../fonts/Antically.ttf'),
      });
      if (!fontsLoaded) {
        return null;
      }
    return (
        <TouchableOpacity style={styles.categoryCont}>
            <Text style={styles.categoryText}>{props.category}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    categoryCont: {
        borderWidth: 3,
        borderColor: COLORS.green,
        padding: 12,
        width: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 30,
        margin: 5
    },
    categoryText: {
        color: COLORS.green,
        fontFamily: 'Momcake-Bold',
    },
});

export default Category;