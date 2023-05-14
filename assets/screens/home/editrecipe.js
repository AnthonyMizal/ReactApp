import React, {useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image,ToastAndroid, TouchableOpacity, TextInput, KeyboardAvoidingView,Platform, Button} from 'react-native';
import {COLORS} from '../../constants/colors';
import {useFonts} from 'expo-font';
import {ROUTES} from '../../constants/routes';
import Icon from 'react-native-vector-icons/FontAwesome';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import SelectDropdown from 'react-native-select-dropdown';
import { ScrollView } from 'react-native-gesture-handler';
import { AntDesign } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import * as DocumentPicker from 'expo-document-picker';
// import Recipe from '../../components/recipe';
import UploadImage from '../../components/uploadImage';
// import ImagePicker from 'react-native-image-crop-picker';
import { baseUrl } from '../../constants/url';



const difficulty_picker = ["EASY", "MEDIUM", "HARD"];
const category_picker = ["BREAKFAST", "LUNCH", "DINNER", "DESSERT"];

// const createFormData = (photo, body = {}) => {
//   const data = new FormData();

//   data.append('photo', {
//     name: photo.fileName,
//     type: photo.type,
//     uri: Platform.OS === 'ios' ? photo.uri.replace('file://', '') : photo.uri,
//   });

//   Object.keys(body).forEach((key) => {
//     data.append(key, body[key]);
//   });

//   return data;
// };



const Editrecipe = ({navigation, route}) => {
  recipeDetails = route.params;

  const [user_id, setUser_Id] = useState();
  const [image, setImagePath] = useState(null);
  const [name, setName] = useState();
  const [video_link, setVidLink] = useState();
  const [cooking_time, setTime] = useState();
  const [difficulty, setDifficulty] = useState();
  const [category, setCategory] = useState();
  const [ingredients, setIngredients] = useState();
  const [directions, setDirections] = useState();
  const data = new FormData();
  AsyncStorage.getItem("user").then((value) => setUser_Id(value));
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
  
  _pickDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({});

    setImagePath(result.uri);
    // console.log(result);

    data.append("file", {
      name: result.name,
      type: result.mimeType,
      uri: result.uri,
    });

    axios.post(`${baseUrl}addImagefile`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  };


  const onChangeNameHandler = (name) => {
    setName(name);
  };

  const onChangeLinklHandler = (video_link) => {
    setVidLink(video_link);
  };

  const onChangeCookingtimeHandler = (cooking_time) => {
    setTime(cooking_time);
  };

  const onChangeIngredientsHandler = (ingredients) => {
    setIngredients(ingredients);
  };

  const onChangeDirectionssHandler = (directions) => {
    setDirections(directions);
  };

  const addRecipe = async () => {

    if (image) {
      try {
        console.log(name, user_id, video_link, cooking_time, difficulty, category, ingredients, directions)
        const response = await axios.post(`${baseUrl}addRecipeWithPic`, {
        user_id:user_id,
        name:name,
        video_link:video_link,
        cooking_time:cooking_time,
        difficulty:difficulty, 
        category:category,
        ingredients:ingredients,
        directions:directions,
        });
        if (response.status === 200) {
          if (image) {
            ToastAndroid.show('Succesfully added a recipe!', ToastAndroid.SHORT);
          } else {
            ToastAndroid.show('Succesfully added a recipe!', ToastAndroid.SHORT);
          }
          return navigation.navigate(ROUTES.RECIPE_HOME);
        } else {

          throw new Error("An error has occurred");
        }
      } catch (error) {
        alert("Invalid");
      }
    } else {
      try {
        const response = await axios.post(`${baseUrl}createrecipe`, {
          // img_location,
          user_id,
          name,
          video_link,
          cooking_time,
          difficulty, 
          category,
          ingredients,
          directions
        }
        
        );
        if (response.status === 200) {
          if (image) {
            ToastAndroid.show('Succesfully added a recipe!', ToastAndroid.SHORT);
          } else {
            ToastAndroid.show('Succesfully added a recipe!', ToastAndroid.SHORT);
          }
          return navigation.navigate(ROUTES.RECIPE_HOME);
        } else {
          throw new Error("An error has occurred");
        }
      } catch (error) {
        alert("Invalid!");
      }
    }
  };


    return (
    <View style={styles.container}>
     
      <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.navigate(ROUTES.MANAGE_RECIPE)}>
            <Icon
                name= 'arrow-left'
                size={28}
                color={'#31C84F'}
              />
            
          </TouchableOpacity>
   
          <View style={styles.iconCont}>
            <Image style={styles.icon} source={require('../../addrecipe.png')} />
          </View>
          <TouchableOpacity onPress={() => addRecipe()}>
            <Text style={styles.doneText}>SAVE</Text>
          </TouchableOpacity>
      </View>

      <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.body}>
        <Text style={styles.text2}>Create your own recipe!</Text>
        <View style={styles.line}></View>
        
        <View style={styles.inputWholeCont}>
        <View style={imageUploaderStyles.container}>
                {
                    image  && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
                }
                    <View style={imageUploaderStyles.uploadBtnContainer}>
                        <TouchableOpacity onPress={_pickDocument} style={imageUploaderStyles.uploadBtn} >
                            <Text>{image? 'Edit' : 'Upload'} Image</Text>
                            <AntDesign name="camera" size={20} color="black" />
                        </TouchableOpacity>
                        
                    </View>
            </View>
        <View>
          <Text style={styles.textInput}>Name of recipe:</Text>
          <TextInput  style={styles.input} placeholder='Type here the name of the recipe...' value={name} onChangeText={onChangeNameHandler}/>
        </View>
        <View>
          <Text style={styles.textInput}>Video Link:</Text>
          <TextInput  style={styles.input} placeholder='Paste the recipe video here...' value={video_link} onChangeText={onChangeLinklHandler}/>
        </View>
        <View>
          <Text style={styles.textInput}>Cooking Time:</Text>
          <TextInput  style={styles.input} placeholder='Type here the cooking time...' value={cooking_time} onChangeText={onChangeCookingtimeHandler}/>
        </View>
        <View>
          <Text style={styles.textInput}>Difficulty:</Text>
          <SelectDropdown
            
              data={difficulty_picker}
              onSelect={(selectedItem, index) => {
                console.log(selectedItem, index)
                setDifficulty(selectedItem);
              }}
              buttonTextAfterSelection={(selectedItem, index) => {
                // text represented after item is selected
                // if data array is an array of objects then return selectedItem.property to render after item is selected
                return selectedItem
              }}
              rowTextForSelection={(item, index) => {
                // text represented for each item in dropdown
                // if data array is an array of objects then return item.property to represent item in dropdown
                return item
              }}
              renderDropdownIcon={isOpened => {
                return <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={COLORS.green} size={18} />;
              }}
              buttonStyle={styles.dropdownBtn}
              buttonTextStyle={styles.dropdowntxt}
            />
        </View>
        <View>
          <Text style={styles.textInput}>Category:</Text>
          <SelectDropdown
            
              data={category_picker}
              onSelect={(selectedItem, index) => {
                console.log(selectedItem, index)
                setCategory(selectedItem);
              }}
              buttonTextAfterSelection={(selectedItem, index) => {
                // text represented after item is selected
                // if data array is an array of objects then return selectedItem.property to render after item is selected
                return selectedItem
              }}
              rowTextForSelection={(item, index) => {
                // text represented for each item in dropdown
                // if data array is an array of objects then return item.property to represent item in dropdown
                return item
              }}
              renderDropdownIcon={isOpened => {
                return <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={COLORS.green} size={18} />;
              }}
              buttonStyle={styles.dropdownBtn}
              buttonTextStyle={styles.dropdowntxt}
            />
        </View>


        <View>
          <Text style={styles.textInput}>Ingredients:</Text>
          <TextInput  style={styles.inputBig} multiline={true} numberOfLines={6}
 placeholder='Type here the ingridients...' value={ingredients} onChangeText={onChangeIngredientsHandler}/>
        </View>

        <View>
          <Text style={styles.textInput}>Directions:</Text>
          <TextInput  style={styles.inputBig} multiline={true} numberOfLines={6}
 placeholder='Type here the directions...' value={directions} onChangeText={onChangeDirectionssHandler}/>
        </View>
        

        </View>
       
      </View>
      </ScrollView>
        </KeyboardAvoidingView>
    </View>
    )
}

const imageUploaderStyles=StyleSheet.create({
  container:{
      elevation:2,
      height:200,
      width:200,
      backgroundColor:'#efefef',
      position:'relative',
      overflow:'hidden',
      alignSelf: 'center'
  },
  uploadBtnContainer:{
      opacity:0.7,
      position:'absolute',
      right:0,
      bottom:0,
      backgroundColor:'lightgrey',
      width:'100%',
      height:'25%',
  },
  uploadBtn:{
      display:'flex',
      alignItems:"center",
      justifyContent:'center'
  }
})

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
    borderRadius: 5
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

export default Editrecipe;
