import React, {useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, KeyboardAvoidingView,} from 'react-native';
import {COLORS} from '../../constants/colors';
import { SvgXml } from 'react-native-svg';
import {useFonts} from 'expo-font';
import {ROUTES} from '../../constants/routes';
import Icon from 'react-native-vector-icons/FontAwesome';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import SelectDropdown from 'react-native-select-dropdown';
import { ScrollView } from 'react-native-gesture-handler';

import Recipe from '../../components/recipe';
import UploadImage from '../../components/uploadImage';

const xml =`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#ffffff" fill-opacity="1" d="M0,224L80,186.7C160,149,320,75,480,80C640,85,800,171,960,192C1120,213,1280,171,1360,149.3L1440,128L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path></svg>
`;

const difficulty = ["EASY", "MEDIUM", "HARD"];
const category = ["BREAKFAST", "LUNCH", "DINNER", "DESSERT"];
const Addrecipe = ({navigation}) => {
  
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
          <TouchableOpacity>
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
          <TextInput  style={styles.input} placeholder='Type here the name of the recipe...'/>
        </View>
        <View>
          <Text style={styles.textInput}>Video Link:</Text>
          <TextInput  style={styles.input} placeholder='Paste the recipe video here...'/>
        </View>
        <View>
          <Text style={styles.textInput}>Cooking Time:</Text>
          <TextInput  style={styles.input} placeholder='Type here the cooking time...'/>
        </View>
        <View>
          <Text style={styles.textInput}>Difficulty:</Text>
          <SelectDropdown
            
              data={difficulty}
              onSelect={(selectedItem, index) => {
                console.log(selectedItem, index)
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
            
              data={category}
              onSelect={(selectedItem, index) => {
                console.log(selectedItem, index)
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
          <Text style={styles.textInput}>Ingridients:</Text>
          <TextInput  style={styles.inputBig} multiline={true} numberOfLines={6}
 placeholder='Type here the ingridients...'/>
        </View>

        <View>
          <Text style={styles.textInput}>Directions:</Text>
          <TextInput  style={styles.inputBig} multiline={true} numberOfLines={6}
 placeholder='Type here the directions...'/>
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
