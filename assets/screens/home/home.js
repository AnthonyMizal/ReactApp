import React, {useState} from 'react';
import { ScrollView, StyleSheet, Text, View, Image, TouchableOpacity, TextInput, KeyboardAvoidingView } from 'react-native';
import {COLORS} from '../../constants/colors';
import {useFonts} from 'expo-font';
import {ROUTES} from '../../constants/routes';
import Icon from 'react-native-vector-icons/FontAwesome';
import Searchfilter from '../../components/searchfilter';
import Categoryfilter from '../../components/categoryFilter';
const xml =`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#ffffff" fill-opacity="1" d="M0,224L80,186.7C160,149,320,75,480,80C640,85,800,171,960,192C1120,213,1280,171,1360,149.3L1440,128L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path></svg>
`;



const Home = ({navigation}) => {
  
  const categories = [
    {
      id: '1',
      category: 'All',
    },
    {
      id: '2',
      category: 'Breakfast',
    },
    {
      id: '3',
      category: 'Lunch',
    },
    {
      id: '4',
      category: 'Dinner',
    },
    {
      id: '5',
      category: 'Dessert',
    },
  ]


  const recipelist = [
    {
      id: '1',
      recipeImg: require('../../sisig.jpg'),
      recipeTitle: 'pork sisig',
      recipeCreator: 'Jazmine Althea Isip',
      recipeTD: '30 min | medium',
      category: 'LUNCH'
    },
    {
      id: '2',
      recipeImg: require('../../crispypata.jpg'),
      recipeTitle: 'Crispy Pata',
      recipeCreator: 'Kim Padua',
      recipeTD: '30 min | easy',
      category: 'DINNER'
    },
    {
      id: '3',
      recipeImg: require('../../kaldereta.jpg'),
      recipeTitle: 'kaldereta',
      recipeCreator: 'Jasper Mamaril',
      recipeTD: '30 min | hard',
      category: 'DINNER'
    },
    {
      id: '4',
      recipeImg: require('../../adobo.jpg'),
      recipeTitle: 'Adobo',
      recipeCreator: 'Nathaniel Ribada',
      recipeTD: '30 min | medium',
      category: 'BREAKFAST'
    }
  ];

  const [item, setRecipe] = useState('');
  const [itemCategory, setCategory] = useState('');
  const setCategoryFilter = itemCategory => {
    setCategory(itemCategory)
  }

  const handlePress = () => {
    return console.log("Testing")
  }
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
  console.log(itemCategory)
    return (
    <View style={styles.container}>
      <View style={styles.header}>
      <Image style={styles.headinglogo} source={require('../../icons/heading.png')} />
      </View>
      <ScrollView>
        <View style={styles.body1}>
        <Text style={styles.text1}>WELCOME CHEF!</Text>
        <Text style={styles.text2}>What would you like to cook?</Text>
        <View style={styles.searchBar}>
        <Icon style={styles.searchIcon}
              name="search"
              size={20}
              color={COLORS.gray}/>
          <TextInput style={styles.input} placeholder='Find Recipe' value={item} onChangeText={text => setRecipe(text) }/>
        </View>
        
        </View>
        <View style={styles.categoryWrapper}>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {/* <Category category="Breakfast"/>
          <Category category="Lunch"/>
          <Category category="Dinner"/>
          <Category category="Dessert"/>
          <Category category="Dessert"/> */}
          {categories.map(e => (
            <Categoryfilter data={categories} input={itemCategory} />
          ))
          
          }
          
          </ScrollView>
          
        </View>
      
        <View style={styles.recipeWrapper}>
          <View style={styles.recipeTxtCont}>
            <Text style={styles.recipeTxt}>RECIPES</Text>
          </View>
          <Searchfilter data={recipelist} input={item} setInput={setRecipe} />
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
    width: 80,
    marginVertical: 20,
    marginStart: 10
  },
  recipeTxt: {
    fontSize: 22,
    fontFamily: 'CL-Bold'
  }

});

export default Home;
