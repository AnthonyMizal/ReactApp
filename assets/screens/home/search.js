import React, {useState, useEffect,} from 'react';
import { ScrollView, StyleSheet, Text, View, Image, TouchableOpacity, TextInput, KeyboardAvoidingView } from 'react-native';
import {COLORS} from '../../constants/colors';
import {useFonts} from 'expo-font';
import Icon from 'react-native-vector-icons/FontAwesome';
import Searchfilter from '../../components/searchfilter';
import axios from 'axios';
import { baseUrl } from '../../constants/url';
import { useFocusEffect } from "@react-navigation/native";


const Search = ({navigation}) => {


  const [recipelist, setRecipelist] = useState([]);
  const [item, setRecipe] = useState('');

  useFocusEffect(
    React.useCallback(() => {
      fetchUserData();
      return () => {
        fetchUserData();
      };
    }, [])
  );

  let [fontsLoaded] = useFonts({
    'Momcake-Bold': require('../../fonts/Momcake-Bold.otf'),
    'Momcake-Thin': require('../../fonts/Momcake-Thin.otf'),
    'CL-Reg': require('../../fonts/CL-Reg.ttf'),
    'CL-Bold': require('../../fonts/CL-Bold.ttf'),
    'Antically': require('../../fonts/Antically.ttf'),
  });
  if (!fontsLoaded) {
    return null;
  }

    async function fetchUserData() {

    axios.get(`${baseUrl}getRecipeDetails`, {
    }).then((response) =>
    {
      setRecipelist(response.data.payload);
    }).catch(error => {
      console.error(error);
    });
}


    return (
      
    <View style={styles.container}>
      <View style={styles.header}>
      <Image style={styles.headinglogo} source={require('../../icons/heading.png')} />
      </View>
      <ScrollView>
        <View style={styles.body1}>
        <Text style={styles.text1}>WELCOME CHEF!</Text>
        <Text style={styles.text2}>What would you like to cook?</Text>
        <View style={styles.searchBar}>
        <Icon style={styles.searchIcon}
              name="search"
              size={20}
              color={COLORS.gray}/>
          <TextInput style={styles.input} placeholder='Find Recipe' autoFocus={true} value={item} onChangeText={text => setRecipe(text) }/>
        </View>
        <View style={styles.recipeWrapper}>
          <Searchfilter data={recipelist} input={item} setInput={setRecipe} navigation={navigation} key={recipelist.id}/>
        </View>
        </View>
      
      </ScrollView>
    </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    backgroundColor: COLORS.white,
    padding: 14,
    paddingHorizontal: 130
  },
  headinglogo: {
    width: 144,
    height: 32
  },
  text1: {
    fontFamily: 'Momcake-Bold',
    fontSize: 21,
    color: COLORS.green
  },
  text2: {
    fontFamily: 'CL-Bold',
    fontSize: 35,
    color: COLORS.black
  },
  body1: {
    padding: 30
  },
  input: {
    flex: 1,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 0,
    color: '#424242',
  },
  categoryWrapper: {
    flexDirection: 'row',
    paddingStart: 30
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.placeholderBG,
    borderRadius: 30,
    marginTop: 20,
    marginBottom: 30
  },
  searchIcon: {
    padding: 10
  }
  ,
  recipeWrapper: {
    marginBottom: 80
  },
  recipeTxtCont: {
    borderBottomWidth: 2,
    borderColor: COLORS.green,
    paddingBottom: 10,
    width: 80,
    marginVertical: 20,
    marginStart: 10
  },
  recipeTxt: {
    fontSize: 22,
    fontFamily: 'CL-Bold'
  }

});

export default Search;
