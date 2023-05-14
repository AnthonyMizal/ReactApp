import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ToastAndroid, TextInput, KeyboardAvoidingView,} from 'react-native';
import {COLORS} from '../../constants/colors';
import {useFonts} from 'expo-font';
import {ROUTES} from '../../constants/routes';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ScrollView } from 'react-native-gesture-handler';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from "@react-navigation/native";
import { baseUrl } from '../../constants/url';


const EditProfile = ({navigation}) => {
  const [accountInfo, setAccountInfo] = useState([]);
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [username, setUsername] = useState();

  const onChangeName = (name) => {
    setName(name);
  };
  
  const onChangeEmail = (email) => {
    setEmail(email);
  };

  const onChangeUsername = (username) => {
    setUsername(username);
  };
  // const [user_id, setUser_Id] = useState();
  AsyncStorage.getItem("user");
  // useEffect(() => {
  //   fetchOwnAccount();
  // }, []);
  useFocusEffect(
    React.useCallback(() => {
      fetchOwnAccount();
      // console.log("naload");
      return () => {
        fetchOwnAccount();
        // console.log("umalis");
      };
    }, [])
  );
  const fetchOwnAccount = async () => {
    user_id = await AsyncStorage.getItem("user");
    try {
      const response = await axios.get(`${baseUrl}getOwnAccount/${user_id}`, {
        
      });
      if (response.status === 200) {
        setAccountInfo(response.data.payload[0]);
        console.log(accountInfo.fullname)

      } else {
        throw new Error("An error has occurred");
      }
    } catch (error) {

    }
  };
  
  const editProfile = async () => {
    user_id = await AsyncStorage.getItem("user");
    try {
      const response = await axios.post(`${baseUrl}updateProfile`, {
        id: user_id,
        fullname: name,
        email: email,
        username: username
      });
      if (response.status === 200) {
        ToastAndroid.show('Succesfully Saved!', ToastAndroid.SHORT);
        console.log(response.data)
        return navigation.navigate(ROUTES.PROFILE);
      } else {
        // setState(false);
        throw new Error("An error has occurred");
      }
    } catch (error) {
      ToastAndroid.show('Invalid Details!', ToastAndroid.SHORT);
    }
  };



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
    <View style={styles.container}>
      <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.navigate(ROUTES.PROFILE)}>
            <Icon
                name= 'arrow-left'
                size={28}
                color={'#31C84F'}
              />
          </TouchableOpacity>
          <View style={styles.iconCont}>
            <Image style={styles.icon} source={require('../../addrecipe.png')} />
          </View>
          <TouchableOpacity onPress={editProfile}>
            <Text style={styles.doneText}>SAVE</Text>
          </TouchableOpacity>
      </View>
      <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.body}>
        <Text style={styles.text2}>Edit Your Profile</Text>
        <View style={styles.line}></View>
        
        <View style={styles.inputWholeCont}>

        <View>
          <Text style={styles.textInput}>Fullname:</Text>
          <TextInput  style={styles.input} placeholder={accountInfo.fullname} placeholderTextColor="#000" value={name} onChangeText={onChangeName}/>

        </View>
        <View>
          <Text style={styles.textInput}>Email:</Text>
          <TextInput  style={styles.input} placeholder={accountInfo.email} placeholderTextColor="#000" value={email} onChangeText={onChangeEmail}/>
        </View>
        <View>
          <Text style={styles.textInput}>Username:</Text>
          <TextInput  style={styles.input} placeholder={accountInfo.username} placeholderTextColor="#000" value={username} onChangeText={onChangeUsername}/>
        </View>
        <View>
          <Text style={styles.textInput}>Password:</Text>
          <TextInput  style={styles.input} placeholder={"Type your new password"} placeholderTextColor="#000"/>
        </View>
        

        </View>
       
      </View>
      </ScrollView>
        </KeyboardAvoidingView>
    </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent:'space-between',
    alignItems: 'center',
    padding: 40,
    paddingHorizontal: 40,
    backgroundColor: COLORS.background,
  },
  doneText: {
    color: COLORS.green,
    fontFamily: 'Momcake-Bold',
    fontSize: 25,
  },
  iconCont: {
    position:'absolute', 
    bottom: Platform.OS === 'ios' ? -0 : -35,
    justifyContent: 'center', 
    alignItems: 'center',
    width: 390,
  },
  icon: {
    width:70, 
    height:70,
    alignSelf: 'center',
  },
  body: {
    paddingHorizontal: 20,
    paddingVertical: 60
  },
  text2: {
    fontFamily: 'CL-Bold',
    fontSize: 20,
    alignSelf: 'center'
  },
  input: {
    backgroundColor: COLORS.placeholderBG,
    padding: 10,
    borderBottomWidth: 2,
    borderColor: COLORS.green,
    fontFamily: 'CL-Bold',
    borderRadius: 5,
    
  },
  inputBig:{
    backgroundColor: COLORS.placeholderBG,
    padding: 10,
    borderBottomWidth: 2,
    borderColor: COLORS.green,
    fontFamily: 'CL-Bold',
    borderRadius: 5,
    textAlignVertical: "top",
    height: 150
  },
  dropdownBtn: {
    borderRadius: 5,
    backgroundColor: COLORS.placeholderBG,
    borderBottomWidth: 2,
    borderColor: COLORS.green,
    width: '100%',
    display: 'flex',
    height: 45
  },
  line:{
    borderBottomWidth: 3,
    borderColor: COLORS.green,
    width: '20%',
    margin: 20,
    alignSelf: 'center',
    justifyContent: 'center'
  },
  inputWholeCont: {
    gap: 15,
    flex: 1
  },
  uploadCont: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
textUpload: {
  fontFamily: 'Momcake-Bold',
  color: COLORS.green,
  fontSize: 17
},
bodyBtn: {
  padding: 10,
  borderWidth: 2,
  borderColor: COLORS.green,
  borderRadius: 20,
  paddingHorizontal: 15
},
textUploadBtn: {
  fontFamily: 'Momcake-Bold',
  color: COLORS.green,
  fontSize: 13
},
textInput: {
  fontFamily: 'Momcake-Bold',
  color: COLORS.green,
  fontSize: 17
},
dropdowntxt: {
  fontFamily: 'Momcake-Bold',
  color: COLORS.black,
  fontSize: 15
}


});

export default EditProfile;
