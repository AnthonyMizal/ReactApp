import React, {useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList, TextInput, KeyboardAvoidingView } from 'react-native';
import {COLORS} from '../constants/colors';
import {useFonts} from 'expo-font';
import {ROUTES} from '../constants/routes';
import Icon from 'react-native-vector-icons/FontAwesome';
import BookmarkButton from './bookmarkBtn';


const Categoryfilter = ({data, input, setInput}) => {
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
        
        <FlatList numColumns={5} scrollEnabled={false} data={data} renderItem={({item}) => {
            if(input === "") {
               return ( 
                    <TouchableOpacity style={styles.categoryCont} key={item.id}>
                        <Text style={styles.categoryText}>{item.category}</Text>
                    </TouchableOpacity>
                )
            }
        }}/>
        
        
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
    categoryList: {
        display: 'flex',
        flexDirection: 'row'
    }
});

export default Categoryfilter;