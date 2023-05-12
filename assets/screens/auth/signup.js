import React, {useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, Text, View, Image,ToastAndroid, TouchableOpacity, TextInput, KeyboardAvoidingView, Button } from 'react-native';
import {COLORS} from '../../constants/colors';
import { SvgXml } from 'react-native-svg';
import {useFonts} from 'expo-font';
import {ROUTES} from '../../constants/routes'
import axios from 'axios';

const baseUrl = 'http://192.168.18.43/PcookApp/restAPI/';
const xml =`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#ffffff" fill-opacity="1" d="M0,224L80,186.7C160,149,320,75,480,80C640,85,800,171,960,192C1120,213,1280,171,1360,149.3L1440,128L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path></svg>
`;



const Signup = (props) =>  {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
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


  const onChangeNameHandler = (fullname) => {
    setFullname(fullname);
  };

  const onChangeEmailHandler = (email) => {
    setEmail(email);
  };

  const onChangeUsernameHandler = (username) => {
    setUsername(username);
  };

  const onChangePasswordHandler = (password) => {
    setPassword(password);
  };

  const onSubmitFormHandler = async (event) => {
    if (!fullname.trim() || !email.trim() || !username.trim() || !password.trim()) {
      alert("Name or Email is invalid");
      return;
    }
    try {
      const response = await axios.post(`${baseUrl}register`, {
        fullname,
        email,
        username,
        password
      });
      if (response.status === 200) {
        ToastAndroid.show('Succesfully created an account!', ToastAndroid.SHORT);
        setFullname('');
        setEmail('');
        setUsername('');
        setPassword('');
        return navigation.navigate(ROUTES.LOGIN);
      } else {
        throw new Error("An error has occurred");
      }
    } catch (error) {
      alert(error);
    }
  };

    return (
      
    <View style={styles.container} >
      <ScrollView vertical={true} showsVerticalScrollIndicator={false} style={styles.scrollview}>
      <View style={styles.box}>
        <View style={styles.picContainer}>
          
        <Image style={styles.loginlogo} source={require('../../loginlogo.png')} />
        
        </View>
        
      </View>


        
      
      <View style={styles.inputWrapper}>
      <Text style={styles.text1}>SIGN UP HERE CHEF!</Text>
        <TextInput style={styles.input} placeholder='Fullname' value={fullname} onChangeText={onChangeNameHandler}/>
        <TextInput style={styles.input} placeholder='Email' value={email} onChangeText={onChangeEmailHandler}/>
        <TextInput style={styles.input} placeholder='Username' value={username} onChangeText={onChangeUsernameHandler}/>
        <TextInput style={styles.input} placeholder='Password' value={password} onChangeText={onChangePasswordHandler} secureTextEntry/>
     

      </View>
      <TouchableOpacity style={styles.getStartedBtn} onPress={onSubmitFormHandler}>
        <Text style={styles.getStartedTxt}>SIGNUP</Text>
      </TouchableOpacity>

      <View style={styles.bottomTextCont}>
        <Text style={styles.getStartedTxt}>Already have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate(ROUTES.LOGIN)}>
        <Text style={styles.registerTxt}>LOGIN</Text>
        </TouchableOpacity>
      </View>
      </ScrollView>
     </View>
    
    )
}

const styles = StyleSheet.create({
  // scrollview: {
  //   flex: 1,
  // },
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center'
  },
  box: {
    backgroundColor: '#A1FFB1',
    width: 330,
    height: 140,
    borderRadius: 20,
    marginTop: 50,
    display: 'flex',
    alignItems: 'center'
  },
  picContainer: {
    width: '90%',
    height: '60%',
    alignItems: 'center',
    paddingTop: 20
  },
  loginlogo: {
    width: 90,
    height: 100,
  },
  wavepng: {
    position: 'absolute',
    bottom: 260
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
    marginTop: 40,
    backgroundColor: COLORS.primary,
    padding: 18,
    paddingHorizontal: 100,
    borderRadius: 30,
    width: '100%',
    alignItems: 'center'
  },
  getStartedTxt: {
    color: COLORS.gray,
    fontFamily: 'CL-Bold',
    fontSize: 16
  },
  input: {
    backgroundColor: COLORS.placeholderBG,
    borderRadius: 50,
    padding: 18,
  },
  inputWrapper: {
    width: '100%',
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
    fontSize: 20
  }

});

export default Signup;