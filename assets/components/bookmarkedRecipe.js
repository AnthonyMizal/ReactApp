import React, {useState} from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList, TextInput, KeyboardAvoidingView } from 'react-native';
import {COLORS} from '../constants/colors';
import {useFonts} from 'expo-font';
import {ROUTES} from '../constants/routes';
import Icon from 'react-native-vector-icons/FontAwesome';
import BookmarkButton from './bookmarkBtn';
import axios from 'axios';
import { imgUrl } from '../constants/url';

const BookmarkFilter = ({data, navigation}) => {


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
        <FlatList scrollEnabled={false} data={data} keyExtractor={item => item.id.toString()} renderItem={({item}) => {
                return ( 
                 <TouchableOpacity style={styles.recipeCont} key={item.id} onPress={() => {navigation.navigate(ROUTES.BOOKMARKED_RECIPE_DETAILS, item)}}>
                     <View style={styles.rightCont}>
                         <Image style={styles.recipeImg} source={{uri: imgUrl + item.img_location}} />
                     </View>
           
                     <View style={styles.middleCont}>
                         <Text style={styles.recipeTitle}>{item.name}</Text>
                         <Text style={styles.recipeCreator}>by {item.fullname}</Text>
                         <Text style={styles.recipeTD}>{item.cooking_time} MIN | {item.difficulty}</Text>
                     </View>
                     <View style={styles.leftCont}>
                         <BookmarkButton data={item.id}/>
                     </View>
                 </TouchableOpacity> 
                 )
        }}/>
        
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

export default BookmarkFilter;