import React, {useState, useEffect, useCallback} from 'react';
import { ScrollView, StyleSheet, Text, View, Image, TouchableOpacity, ToastAndroid, TextInput, RefreshControl } from 'react-native';
import {COLORS} from '../../constants/colors';
import {useFonts} from 'expo-font';
import Icon from 'react-native-vector-icons/FontAwesome';
import YourRecipefilter from '../../components/yourrecipe';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { baseUrl } from '../../constants/url';
import { useFocusEffect } from "@react-navigation/native";


const ManageRecipe = ({navigation}) => {
  const [recipelist, setRecipelist] = useState([]);
  AsyncStorage.getItem("user");
  const [refreshing, setRefreshing] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      fetchRecipe();
      return () => {
        fetchRecipe();
      };
    }, [])
  );

  const fetchRecipe = async () => {
    user_id = await AsyncStorage.getItem("user");
    try {
      const response = await axios.get(`${baseUrl}getRecipeDetails/${user_id}`, {
      });
      if (response.status === 200) {
        setRecipelist(response.data.payload);

      } else {
        throw new Error("An error has occurred");
      }
    } catch (error) {
      ToastAndroid.show('No recipes created!', ToastAndroid.SHORT);
    }
  };

  const onRefresh = useCallback(() => {
    fetchRecipe();
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const [item, setRecipe] = useState('');
  const [itemCategory, setCategory] = useState('');
  const setCategoryFilter = itemCategory => {
    setCategory(itemCategory)
  }

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



    return (
      <ScrollView refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      } style={styles.container}>
    <View >
      <View style={styles.header}>
      <Image style={styles.headinglogo} source={require('../../icons/heading.png')} />
      </View>
      
        <View style={styles.body1}>
        <View style={styles.searchBar}>
        <Icon style={styles.searchIcon}
              name="search"
              size={20}
              color={COLORS.gray}/>
          <TextInput style={styles.input} placeholder='Find Recipe' value={item} onChangeText={text => setRecipe(text) }/>
        </View>
        
        </View>
      
        <View style={styles.recipeWrapper}>
          <View style={styles.recipeTxtCont}>
            <Text style={styles.recipeTxt}>Manage Your Recipe</Text>
          </View>
          
          <YourRecipefilter data={recipelist} input={item} navigation={navigation} setInput={setRecipe}/>
        </View>
        
   
        
    </View>
    </ScrollView>
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
    marginTop: 20
  },
  searchIcon: {
    padding: 10
  }
  ,
  recipeWrapper: {
    paddingHorizontal: 25
  },
  recipeTxtCont: {
    borderBottomWidth: 2,
    borderColor: COLORS.green,
    paddingBottom: 10,
    width: 195,
    marginVertical: 20,
    marginStart: 10
  },
  recipeTxt: {
    fontSize: 22,
    fontFamily: 'CL-Bold'
  }

});

export default ManageRecipe;
