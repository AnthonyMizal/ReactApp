import React, {useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, KeyboardAvoidingView } from 'react-native';
import {COLORS} from '../constants/colors';
import {useFonts} from 'expo-font';
import {ROUTES} from '../constants/routes';
import Icon from 'react-native-vector-icons/FontAwesome';
import BookmarkButton from './bookmarkBtn';

const Recipe = (props) => {
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
        <TouchableOpacity style={styles.recipeCont}>
            <View style={styles.rightCont}>
                <Image style={styles.recipeImg} source={props.recipeImg} />
            </View>
            <View style={styles.middleCont}>
                <Text style={styles.recipeTitle}>{props.recipeTitle}</Text>
                <Text style={styles.recipeCreator}>by {props.recipeCreator}</Text>
                <Text style={styles.recipeTD}>{props.recipeTD}</Text>
            </View>
            <View style={styles.leftCont}>
                <BookmarkButton/>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    recipeCont: {
        backgroundColor: COLORS.white,
        elevation: 2,
        padding: 20,
        display: 'flex',
        justifyContent: 'center',
        borderRadius: 10,
        margin: 5,
        marginBottom: 10,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    categoryText: {
        color: COLORS.green,
        fontFamily: 'Momcake-Bold',
    },
    recipeImg: {
        width: 110,
        height: 110,
        borderRadius: 10
    },
    middleCont:{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: 10,
        gap: 20
    },
    recipeTitle: {
        fontFamily: 'Momcake-Bold',
        color: COLORS.green,
        fontSize: 26
    },
    recipeCreator: {
        fontFamily: 'CL-Bold',
        fontSize: 13
    },
    recipeTD: {
        fontFamily: 'Momcake-Thin',
        fontSize: 20
    }
});

export default Recipe;