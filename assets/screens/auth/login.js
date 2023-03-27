import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, KeyboardAvoidingView } from 'react-native';
import {COLORS} from '../../constants/colors';
import { SvgXml } from 'react-native-svg';
import {useFonts} from 'expo-font';
import {ROUTES} from '../../constants/routes'
const xml =`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#ffffff" fill-opacity="1" d="M0,224L80,186.7C160,149,320,75,480,80C640,85,800,171,960,192C1120,213,1280,171,1360,149.3L1440,128L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path></svg>
`;

const Login = (props) => {
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

    return (
    <View style={styles.container}>
      
      <View style={styles.box}>
        <View style={styles.picContainer}>
        <Image style={styles.loginlogo} source={require('../../loginlogo.png')} />
        </View>
      </View>
      
        <SvgXml style={styles.wavepng} xml={xml} width="100%" height="100%"/>
      
      <View style={styles.inputWrapper}>
      <Text style={styles.text1}>WELCOME CHEF!</Text>
     
        <TextInput style={styles.input} placeholder='Username'/>
        <TextInput style={styles.input} placeholder='Password'/>
     

      </View>
      <TouchableOpacity style={styles.getStartedBtn} onPress={() => navigation.navigate(ROUTES.HOME)}>
        <Text style={styles.getStartedTxt}>LOGIN</Text>
      </TouchableOpacity>

      <View style={styles.bottomTextCont}>
        <Text style={styles.getStartedTxt}>Don't have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate(ROUTES.SIGNUP)}>
        <Text style={styles.registerTxt}>REGISTER</Text>
        </TouchableOpacity>
      </View>
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
  picContainer: {
    width: '90%',
    height: '60%',
    alignItems: 'center',
    paddingTop: 20
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
    fontSize: 20
  }

});

export default Login;