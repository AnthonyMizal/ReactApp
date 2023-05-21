import React, {useState, useEffect} from 'react';
import {View, TouchableOpacity, ToastAndroid} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { baseUrl } from '../constants/url';
import { useFocusEffect } from "@react-navigation/native";
const BookmarkButton = (data) => {
  const [state, setState] = useState(false);
  AsyncStorage.getItem("user");
  const recipe_id = data.data;


  
  useFocusEffect(
    React.useCallback(() => {
      checkBookmark();
      setState(false);
      return () => {
        checkBookmark();
        setState(false);
      };
    }, [])
  );

  const checkBookmark = async () => {
    user_id = await AsyncStorage.getItem("user");

    try {
      const response = await axios.post(
        `${baseUrl}checkBookmark/${recipe_id}/${user_id}`,
        {}
      );
      if (response.status === 200) {
        setState(true);
      } else {
        setState(false);
        throw new Error("An error has occurred");
      }
    } catch (error) {
      // alert("Invalid Username or Email!");
    }
  };


  
  const click = () => {
    setState(!state);
    
  
    if (!state) {
      onSubmitFormHandler();
    } else {
      unSave();
    }
  };

  const onSubmitFormHandler = async (event) => {
   user_id = await AsyncStorage.getItem("user");
    try {
      const response = await axios.post(`${baseUrl}addtobookmark`, {
        user_id,
        recipe_id,
      }
      
      );
      if (response.status === 200) {
        ToastAndroid.show('Succesfully Saved!', ToastAndroid.SHORT);
      } else {
        throw new Error("An error has occurred");
      }
    } catch (error) {
      alert(error);
    }
  };

  const unSave = async (event) => {

    try {
      const response = await axios.post(`${baseUrl}deletebookmark/${recipe_id}/${user_id}`, {
      }
      
      );
      if (response.status === 200) {
        ToastAndroid.show('Succesfully Removed!', ToastAndroid.SHORT);
      } else {
        throw new Error("An error has occurred");
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <View>
      <TouchableOpacity onPress={() => click()}>
      <Icon
              name= {state ? 'bookmark' : 'bookmark-o'}
              size={30}
              color={'#31C84F'}
            />
      </TouchableOpacity>
    </View>
  );
};

export default BookmarkButton;