import React, {useState, useEffect, useCallback} from 'react';
import { ScrollView, StyleSheet, Text, View, Image, TouchableOpacity, TextInput, RefreshControl } from 'react-native';
import {COLORS} from '../../constants/colors';
import {useFonts} from 'expo-font';
import Icon from 'react-native-vector-icons/FontAwesome';
import Searchfilter from '../../components/searchfilter';
import Categoryfilter from '../../components/categoryFilter';
import Category from '../../components/category';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
const baseUrl = 'http://192.168.18.43/PcookApp/restAPI/';




const Home = ({navigation}) => {
  const [recipelist, setRecipelist] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState();
  

useEffect(() => {
    fetchRecipe();
  }, []);

//   async function fetchUserData() {

//     axios.get(`${baseUrl}fetchuser/${name}`, {
//     }).then((response) =>
//     {
//       console.log(response.data);
//     }).catch(error => {
//       console.error(error);
//     });
// }



  const fetchRecipe = async () => {
    try {
      const response = await axios.get(`${baseUrl}getRecipeDetails`, {
        
      });
      if (response.status === 200 || refreshing === true) {
        setRecipelist(response.data.payload);
        console.log(response.data.payload)

      } else {
        throw new Error("An error has occurred");
      }
    } catch (error) {

    }
  };

  // const fetchLunch = async () => {
    
  //   try {
  //     setSelectedCategory("Lunch")
  //     const response = await axios.get(`${baseUrl}getFilteredRecipeDetails/${selectedCategory}`, {
        
  //     });
  //     if (response.status === 200 || refreshing === true) {
  //       setRecipelist(response.data.payload);
  //       console.log(response.data.payload)

  //     } else {
  //       throw new Error("An error has occurred");
  //     }
  //   } catch (error) {

  //   }
  // };

  function fetchLunch() {
    setSelectedCategory("Lunch")
    console.log(selectedCategory)
    axios.get(`${baseUrl}getFilteredRecipeDetails/${selectedCategory}`, {
    }).then((response) =>
    {
      setRecipelist(response.data.payload);
      console.log(response.data.payload)
    }).catch(error => {
      console.error(error);
    });
}

function fetchDessert() {
  setSelectedCategory("Dessert")
  console.log(selectedCategory)
  axios.get(`${baseUrl}getFilteredRecipeDetails/${selectedCategory}`, {
  }).then((response) =>
  {
    setRecipelist(response.data.payload);
    console.log(response.data.payload)
  }).catch(error => {
    console.error(error);
  });
}
  // const fetchDessert = async () => {
    
  //   try {
  //     setSelectedCategory("Dessert")
  //     const response = await axios.get(`${baseUrl}getFilteredRecipeDetails/${selectedCategory}`, {
        
  //     });
  //     if (response.status === 200 || refreshing === true) {
  //       setRecipelist(response.data.payload);
  //       console.log(response.data.payload)

  //     } else {
  //       throw new Error("An error has occurred");
  //     }
  //   } catch (error) {

  //   }
  // };

  const onRefresh = useCallback(() => {
    fetchRecipe();
    setRefreshing(true);
    console.log(selectedCategory)
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);


  const [item, setRecipe] = useState('');
  const [itemCategory, setCategory] = useState('');



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
      <ScrollView refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      } style={styles.container}>
    <View>
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

          <TouchableOpacity style={styles.categoryCont} onPress={fetchRecipe}>
            <Text style={styles.categoryText}>All</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.categoryCont} onPress={() => setSelectedCategory("Breakfast")}>
            <Text style={styles.categoryText}>Breakfast</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.categoryCont} onPress={fetchLunch}>
            <Text style={styles.categoryText}>Lunch</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.categoryCont} onPress={() => setSelectedCategory("Dinner")}>
            <Text style={styles.categoryText}>Dinner</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.categoryCont} onPress={fetchDessert}>
            <Text style={styles.categoryText}>Dessert</Text>
          </TouchableOpacity>
          
          </ScrollView>
          
        </View>
      
        <View style={styles.recipeWrapper}>
          <View style={styles.recipeTxtCont}>
            <Text style={styles.recipeTxt}>RECIPES</Text>
          </View>
          <Searchfilter data={recipelist} input={item} setInput={setRecipe} navigation={navigation} key={recipelist.id}/>
        </View>
        
      </ScrollView>
        
    </View>
    </ScrollView>
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
  },
  categoryCont: {
    borderWidth: 3,
    borderColor: COLORS.green,
    padding: 12,
    width: 100,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    margin: 5
},
categoryText: {
    color: COLORS.green,
    fontFamily: 'Momcake-Bold',
},

});

export default Home;
