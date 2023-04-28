import React, {useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, KeyboardAvoidingView,} from 'react-native';
import {COLORS} from '../../constants/colors';
import {useFonts} from 'expo-font';
import {ROUTES} from '../../constants/routes';
import Icon from 'react-native-vector-icons/FontAwesome';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import SelectDropdown from 'react-native-select-dropdown';
import { ScrollView } from 'react-native-gesture-handler';
import axios from 'axios';
import Recipe from '../../components/recipe';
import UploadImage from '../../components/uploadImage';
const baseUrl = 'http://192.168.18.43/PcookApp/restAPI/';


const difficulty_picker = ["EASY", "MEDIUM", "HARD"];
const category_picker = ["BREAKFAST", "LUNCH", "DINNER", "DESSERT"];
const Addrecipe = ({navigation}) => {
  const [img_location, setLocation] = useState("");
  const [name, setName] = useState("");
  const [video_link, setVidLink] = useState("");
  const [cooking_time, setTime] = useState();
  const [difficulty, setDifficulty] = useState();
  const [category, setCategory] = useState();
  const [ingredients, setIngredients] = useState();
  const [directions, setDirections] = useState();
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
  
  const onChangeimgHandler = (img_location) => {
    setLocation(img_location);
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

  // const onChangeDifficultyHandler = (difficulty) => {
  //   setDifficulty(difficulty);
  // };

  // const onChangeCategoryHandler = (category) => {
  //   setCategory(category);
  // };

  const onChangeIngredientsHandler = (ingredients) => {
    setIngredients(ingredients);
  };

  const onChangeDirectionssHandler = (directions) => {
    setDirections(directions);
  };

  const onSubmitFormHandler = async (event) => {
    // if (!fullname.trim() || !email.trim() || !username.trim() || !password.trim()) {
    //   alert("Name or Email is invalid");
    //   return;
    // }
    try {
      const response = await axios.post(`${baseUrl}createrecipe`, {
        img_location,
        name,
        video_link,
        cooking_time,
        difficulty,
        category,
        ingredients,
        directions
      });
      if (response.status === 200) {
        alert(` You have succesfully created an account!`);

        return navigation.navigate(ROUTES.HOME_NAVIGATOR);
      } else {
        throw new Error("An error has occurred");
      }
    } catch (error) {
      alert(error);
    }
  };

    return (
    <View style={styles.container}>
      <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.navigate(ROUTES.HOME)}>
            <Icon
                name= 'arrow-left'
                size={28}
                color={'#31C84F'}
              />
          </TouchableOpacity>
          <View style={styles.iconCont}>
            <Image style={styles.icon} source={require('../../addrecipe.png')} />
          </View>
          <TouchableOpacity onPress={onSubmitFormHandler}>
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
        {/* <View style={styles.uploadCont}>
          <Text style={styles.textUpload}>Upload Image:</Text>
          <TouchableOpacity style={styles.bodyBtn} onPress={addImage}>
            <Text style={styles.textUploadBtn}>Choose Image</Text>
          </TouchableOpacity>
        </View> */}
        <UploadImage/>
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

export default Addrecipe;
