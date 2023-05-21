import { ScrollView, StyleSheet, Text, View, Image, TouchableOpacity, TextInput, KeyboardAvoidingView } from 'react-native';
import {COLORS} from '../../constants/colors';
import {useFonts} from 'expo-font';
import {ROUTES} from '../../constants/routes';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
const xml =`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#ffffff" fill-opacity="1" d="M0,224L80,186.7C160,149,320,75,480,80C640,85,800,171,960,192C1120,213,1280,171,1360,149.3L1440,128L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path></svg>
`;




const Profile = ({navigation}) => {
  
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
      <Image style={styles.headinglogo} source={require('../../icons/heading.png')} />
      </View>
      <ScrollView style={styles.scrollview}>

        <View style={styles.recipeWrapper}>
          <View style={styles.recipeTxtCont}>
            <Text style={styles.recipeTxt}>Your Profile</Text>
          </View>
          
          <TouchableOpacity style={styles.wholeCont} onPress={() => navigation.navigate(ROUTES.EDIT_PROFILE)}>
            <View style={styles.rightCont}>
            <Icon
              name= {'person-circle-sharp'}
              size={28}
              color={'#31C84F'}
            />
            </View>
            <View style={styles.leftCont}>
              <Text style={styles.text1}>Edit Your Profile</Text>
            </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.wholeCont} onPress={() => navigation.navigate(ROUTES.MANAGE_RECIPE)}>
            <View style={styles.rightCont}>
            <Icon
              name= {'fast-food'}
              size={28}
              color={'#31C84F'}
            />
            </View>
            <View style={styles.leftCont}>
              <Text style={styles.text1}>Manage Recipe</Text>
            </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.wholeCont} onPress={() => navigation.navigate(ROUTES.LOGIN)}>
            <View style={styles.rightCont}>
            <Icon
              name= {'ios-log-out'}
              size={28}
              color={'#ff4a59'}
            />
            </View>
            <View style={styles.leftCont}>
              <Text style={styles.text3}>Logout</Text>
            </View>
        </TouchableOpacity>

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
  scrollview: {
    paddingHorizontal: 15
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
    fontFamily: 'CL-Bold',
    fontSize: 17,
    color: COLORS.green
  },
  text3: {
    fontFamily: 'CL-Bold',
    fontSize: 17,
    color: '#ff4a59'
  },
  text2: {
    fontFamily: 'CL-Bold',
    fontSize: 35,
    color: COLORS.black
  },
  body1: {
    padding: 30
  },
  wholeCont: {
    backgroundColor: COLORS.white,
    elevation: 2,
    padding: 20,
    display: 'flex',
    borderRadius: 10,
    margin: 5,
    marginBottom: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20
},
recipeTxtCont: {
  borderBottomWidth: 2,
  borderColor: COLORS.green,
  paddingBottom: 10,
  width: 107,
  marginVertical: 20,
  marginStart: 10
},
recipeTxt: {
  fontSize: 22,
  fontFamily: 'CL-Bold'
}

});

export default Profile;
