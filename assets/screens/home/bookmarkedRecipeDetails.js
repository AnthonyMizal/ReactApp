import React, {useState, useEffect, useCallback, useRef} from 'react';

import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, KeyboardAvoidingView, Button} from 'react-native';
import {COLORS} from '../../constants/colors';
import YoutubePlayer from "react-native-youtube-iframe";
import {useFonts} from 'expo-font';
import {ROUTES} from '../../constants/routes';
import Icon from 'react-native-vector-icons/FontAwesome';

import { ScrollView } from 'react-native-gesture-handler';

import { imgUrl } from '../../constants/url';



const BookMarkedRecipeDetails = ({navigation, route}) => {
  const recipeDetail = route.params;
  function YouTubeGetID(url){
    url = url.split(/(vi\/|v%3D|v=|\/v\/|youtu\.be\/|\/embed\/)/);
    return undefined !== url[2]?url[2].split(/[^0-9a-z_\-]/i)[0]:url[0];
}

 const ytUrl = YouTubeGetID(recipeDetail.video_link);

  const [playing, setPlaying] = useState(false);

  const onStateChange = useCallback((state) => {
    if (state === "ended") {
      setPlaying(false);
      alert("video has finished playing!");
    }
  }, []);

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
      <Image style={styles.recipeImg} source={{uri: imgUrl + recipeDetail.img_location}}/>
          <TouchableOpacity onPress={() => navigation.navigate(ROUTES.BOOKMARK)}>
            <Icon
                name= 'arrow-left'
                size={28}
                color={'#31C84F'}
              />
          </TouchableOpacity>
          
          <View style={styles.iconCont}>
            <Image style={styles.icon} source={require('../../addrecipe.png')} />
          </View>

      </View>
      <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.body}>
        <Text style={styles.text2}>{recipeDetail.name}</Text>
        
        <View style={styles.line}></View>
        <Text style={styles.text1}>By: {recipeDetail.fullname}</Text>
        <View style={styles.ytPlayer}>
                <YoutubePlayer
                height={184}
                play={playing}
                videoId={ytUrl}
                onChangeState={onStateChange}
              />
        </View>
        <View style={styles.inputWholeCont}>
          <View style={styles.textContWhole}>
              <Text style={styles.textLabel}>Cooking Time: </Text>
              <Text style={styles.textLabelDetail}>{recipeDetail.cooking_time} min</Text>
          </View>
          <View style={styles.textContWhole}>
              <Text style={styles.textLabel}>Difficulty: </Text>
              <Text style={styles.textLabelDetail}>{recipeDetail.difficulty}</Text>
          </View>
          <View style={styles.textContWhole2}>
              <Text style={styles.textLabel2}>Ingredients: </Text>
              <Text style={styles.textLabelDetail2}>{recipeDetail.ingredients}</Text>
          </View>
          <View style={styles.textContWhole2}>
              <Text style={styles.textLabel2}>Directions: </Text>
              <View style={styles.textLabelDetailCont}>
                <Text style={styles.textLabelDetail2}>{recipeDetail.directions}</Text>
              </View>
              
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
  ytPlayer:{
    borderWidth: 7,
    borderColor: COLORS.green,
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 10
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
  recipeImg: {
    width: 410,
    height: 110,
    margin: 0,
    position: 'absolute'
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
    fontFamily: 'Momcake-Bold',
    fontSize: 30,
    alignSelf: 'center',
    color: COLORS.green
  },
  textLabel:{
    fontFamily: 'Momcake-Bold',
    color: COLORS.green,
    fontSize: 20,
  },
  textLabel2:{
    fontFamily: 'Momcake-Bold',
    color: COLORS.green,
    fontSize: 20,
    marginBottom: 10
  },
  textContWhole:{
    display: 'flex',
    flexDirection: 'row',
  },
  textContWhole2:{

  },
  text1: {
    fontFamily: 'CL-Reg',
    fontSize: 20,
    alignSelf: 'center',
    color: COLORS.black
  },
  textLabelDetail:{
    fontFamily: 'CL-Reg',
    fontSize: 17,
    color: COLORS.black
  },
  textLabelDetail2:{
    fontFamily: 'CL-Reg',
    fontSize: 17,
    color: COLORS.black,
  },
  // textLabelDetailCont:{
  //   display: 'flex',
  //   justifyContent: 'center',
  //   alignItems:'center',
  // },
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
    flex: 1,
    padding: 20,
    paddingBottom: 100
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

export default BookMarkedRecipeDetails;
