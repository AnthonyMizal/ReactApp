import React, {useState, useEffect} from 'react';
import {View, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
const baseUrl = 'http://192.168.18.43/PcookApp/restAPI/';
const BookmarkButton = (data) => {
  const [state, setState] = useState(false);
  // const [user_id, setUserID] = useState();
  AsyncStorage.getItem("user");
  user_id = "";
  const recipe_id = data.data;


  
  useEffect(() => {
    checkBookmark();
  }, []);

  const checkBookmark = async () => {
    user_id = await AsyncStorage.getItem("user");
    console.log(recipe_id);
    console.log(user_id);

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
      console.log(recipe_id);
      console.log(user_id);
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
        alert(` Succesfully saved!`);
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
        console.log(response.status)
        // alert(` Succesfully Removed!`);
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
              size={28}
              color={'#31C84F'}
            />
      </TouchableOpacity>
    </View>
  );
};

export default BookmarkButton;