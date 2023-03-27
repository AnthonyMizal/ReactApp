import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, Text, View, Image, TouchableOpacity, TextInput, KeyboardAvoidingView } from 'react-native';
import {COLORS} from '../../constants/colors';
import { SvgXml } from 'react-native-svg';
import {useFonts} from 'expo-font';
import {ROUTES} from '../../constants/routes';
import Category from '../../components/category';
import Recipe from '../../components/recipe';
import Icon from 'react-native-vector-icons/FontAwesome';
const xml =`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#ffffff" fill-opacity="1" d="M0,224L80,186.7C160,149,320,75,480,80C640,85,800,171,960,192C1120,213,1280,171,1360,149.3L1440,128L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path></svg>
`;



const Bookmark = () => {
  
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
      <ScrollView>

        <View style={styles.recipeWrapper}>
          <View style={styles.recipeTxtCont}>
            <Text style={styles.recipeTxt}>Your Bookmarks</Text>
          </View>
          
          <Recipe 
          recipeImg={require('../../sisig.jpg')} 
          recipeTitle={'pork sisig'}
          recipeCreator={'Jazmine Althe Isip'}
          recipeTD={'30 min | medium'}
          />
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
    width: 143,
    marginVertical: 20,
    marginStart: 10
  },
  recipeTxt: {
    fontSize: 22,
    fontFamily: 'CL-Bold'
  }

});

export default Bookmark;
