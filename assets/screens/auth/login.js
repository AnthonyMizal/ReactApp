import React, {useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TouchableOpacity, ToastAndroid, TextInput, KeyboardAvoidingView, ScrollView } from 'react-native';
import {COLORS} from '../../constants/colors';
import { SvgXml } from 'react-native-svg';
import {useFonts} from 'expo-font';
import {ROUTES} from '../../constants/routes';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
const baseUrl = 'http://192.168.18.43/PcookApp/restAPI/';
const xml =`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#ffffff" fill-opacity="1" d="M0,224L80,186.7C160,149,320,75,480,80C640,85,800,171,960,192C1120,213,1280,171,1360,149.3L1440,128L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path></svg>
`;

const Login = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const {navigation} = props;
  
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

  const onChangeUsernameHandler = (username) => {
    setUsername(username);
  };

  const onChangePasswordHandler = (password) => {
    setPassword(password);
  };

  const onSubmitFormHandler = async (event) => {
    if (!username.trim() || !password.trim()) {
      alert("Name or Email is invalid");
      return;
    }
    try {
      const response = await axios.post(`${baseUrl}login`, {
        username,
        password
      });
      if (response.status === 200) {
        ToastAndroid.show('Succesfully Logged In!', ToastAndroid.SHORT);
        // console.log(response.data.payload.id);
        setUsername('');
        setPassword('');
        // return navigation.navigate(ROUTES.LOGIN);
        storeUserID(response.data.payload.id);

        // alert(storeUser);
        return navigation.navigate(ROUTES.HOME_NAVIGATOR)

      } else {
        throw new Error("An error has occurred");
      }
    } catch (error) {
      alert(error);
    }
  };

  const storeUserID = async (value) => {
    try {
      
      await AsyncStorage.setItem("user", JSON.stringify(value));
      // console.log(JSON.stringify(value));
    } catch (error) {
      console.log(error);
    }
  };

  AsyncStorage.getItem("user").then((value) => console.log(value))
    return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <KeyboardAvoidingView 
                    style={styles.keyboardView}>
      <View style={styles.box}>
        <View style={styles.picContainer}>
        <Image style={styles.loginlogo} source={require('../../loginlogo.png')} />
        </View>
      </View>
      
        <SvgXml style={styles.wavepng} xml={xml} width="100%" height="100%"/>
        

      <View style={styles.inputWrapper}>
      <Text style={styles.text1}>WELCOME CHEF!</Text>
     
        <TextInput style={styles.input} placeholder='Username'
        value={username}
        onChangeText={onChangeUsernameHandler}
        />
        <TextInput style={styles.input} placeholder='Password'
        secureTextEntry
        value={password}
        onChangeText={onChangePasswordHandler}
        />
     

      </View>
      <TouchableOpacity style={styles.getStartedBtn} onPress={onSubmitFormHandler}>
        <Text style={styles.getStartedTxt}>LOGIN</Text>
      </TouchableOpacity>

      <View style={styles.bottomTextCont}>
        <Text style={styles.getStartedTxt}>Don't have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate(ROUTES.SIGNUP)}>
        <Text style={styles.registerTxt}>REGISTER</Text>
        </TouchableOpacity>
      </View>

      </KeyboardAvoidingView>
      </ScrollView>
    </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    alignItems: 'center',
  },
  box: {
    backgroundColor: '#A1FFB1',
    width: 330,
    height: 317,
    borderRadius: 20,
    marginTop: 50,
    display: 'flex',
    alignItems: 'center'
  },
  scrollView: {
    width: '100%',
    height: 0
  },
  picContainer: {
    width: '90%',
    height: '60%',
    alignItems: 'center',
    paddingTop: 20
  },
  keyboardView: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginlogo: {
    width: 220,
    height: 250,
  },
  wavepng: {
    position: 'absolute',
    bottom: 40
  },
  text1: {
    fontFamily: 'Momcake-Bold',
    fontSize: 14,
    color: COLORS.green
  },
  textWrapper: {
    paddingTop: 25,
    paddingLeft: 30,
    alignSelf: 'flex-start'
  },
  text2: {
    fontFamily: 'Antically',
    color: COLORS.green,
    fontSize: 34
  },
  text3: {
    fontFamily: 'Antically',
    color: COLORS.green,
    fontSize: 47
  },
  textWrapper2: {
    display: 'flex',
    alignItems: 'center',
    marginTop: 40
  },
  getStartedBtn: {
    marginTop: 20,
    backgroundColor: COLORS.primary,
    padding: 18,
    paddingHorizontal: 100,
    borderRadius: 30,
    width: '80%',
    alignItems: 'center',
    elevation: 2
  },
  getStartedTxt: {
    color: '#737373',
    fontFamily: 'CL-Bold',
    fontSize: 16
  },
  input: {
    backgroundColor: COLORS.placeholderBG,
    borderRadius: 50,
    padding: 18,
  },
  inputWrapper: {
    width: '80%',
    gap: 20,
    marginTop: 40
  },
  bottomTextCont: {
    alignItems: 'center',
    gap: 18,
    marginTop: 25
  },
  registerTxt: {
    color: COLORS.green,
    fontFamily: 'Momcake-Bold',
    fontSize: 20,
    paddingBottom: 15
  }

});

export default Login;