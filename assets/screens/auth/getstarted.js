import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import {COLORS} from './assets/constants/colors';
import { SvgXml } from 'react-native-svg';
import {useFonts} from 'expo-font';
const xml =`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#ffffff" fill-opacity="1" d="M0,224L80,186.7C160,149,320,75,480,80C640,85,800,171,960,192C1120,213,1280,171,1360,149.3L1440,128L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path></svg>
`;



const Getstarted = () => {
  
  let [fontsLoaded] = useFonts({
    'Momcake-Bold': require('./assets/fonts/Momcake-Bold.otf'),
    'Momcake-Thin': require('./assets/fonts/Momcake-Thin.otf'),
    'CL-Reg': require('./assets/fonts/CL-Reg.ttf'),
    'CL-Bold': require('./assets/fonts/CL-Bold.ttf'),
    'Antically': require('./assets/fonts/Antically.ttf'),
  });
  if (!fontsLoaded) {
    return null;
  }

    return (
    <View style={styles.container}>
      
      <View style={styles.box}>
        <Image style={styles.personpng} source={require('./assets/foods.png')} />
      </View>
      
      <Image style={styles.foodpng} source={require('./assets/person.png')} />
      
      <SvgXml style={styles.wavepng} xml={xml} width="100%" height="100%"/>
      <View style={styles.textWrapper}>
        <Text style={styles.text1}>CONTAINS MANY PREMIUIM RECIPES</Text>
      </View>
      <View style={styles.textWrapper2}>
        <Text style={styles.text2}>Be a professional</Text>
        <Text style={styles.text3}>Cook</Text>
      </View>
      <TouchableOpacity style={styles.getStartedBtn}>
        <Text style={styles.getStartedTxt}>Get Started</Text>
      </TouchableOpacity>
    </View>
    )
}

export default Getstarted;

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
    marginTop: 100,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  foodpng: {
    position: 'absolute',
    width: 500,
    height: 260,
    top: 60
  },
  personpng: {
    width: 290,
    height: 230,
    marginTop: 86
  },
  wavepng: {
    position: 'absolute',
  },
  text1: {
    fontFamily: 'Momcake-Bold',
    fontSize: 14,
    color: '#737373'
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
    borderRadius: 30
  },
  getStartedTxt: {
    color: COLORS.gray,
    fontFamily: 'CL-Bold'
  }

});
