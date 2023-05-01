import React, {useState} from 'react';
import {View, TouchableOpacity, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
const baseUrl = 'http://192.168.18.43/PcookApp/restAPI/';
const DeleteButton = (data) => {
  const [state, setState] = useState(false);
  AsyncStorage.getItem("user");
  const id = data.data;


  const click = () => {
    if (confirm("Press a button!") == true) {
      deleteRecipe();
    } else {
      alert("Cancelled");
    }
  };

  const showConfirmDialog = () => {
    return Alert.alert(
      "Are your sure?",
      "Are you sure you want to remove this beautiful box?",
      [
        // The "Yes" button
        {
          text: "Yes",
          onPress: () => {
            deleteRecipe();
          },
        },
        // The "No" button
        // Does nothing but dismiss the dialog when tapped
        {
          text: "No",
        },
      ]
    );
  };

  const deleteRecipe = async (event) => {
    user_id = await AsyncStorage.getItem("user");
    try {
      const response = await axios.post(`${baseUrl}deleterecipe/${id}/${user_id}`, {
      }
      
      );
      if (response.status === 200) {
        console.log(response.status)
        alert(` Succesfully Removed!`);
      } else {
        throw new Error("An error has occurred");
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <View>
      <TouchableOpacity onPress={() => showConfirmDialog()}>
      <Icon
              name= {state ? 'trash' : 'trash'}
              size={28}
              color={'red'}
            />
      </TouchableOpacity>
    </View>
  );
};

export default DeleteButton;