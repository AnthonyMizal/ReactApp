import React, {useState} from 'react';
import {View, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const BookmarkButton = () => {
  const [state, setState] = useState(false);

  const click = () => {
    setState(!state);
  };


  return (
    <View>
      <TouchableOpacity onPress={() => click()}>
      <Icon
              name= {state ? 'bookmark' : 'bookmark-o'}
              size={28}
              color={'#31C84F'}
            />
      </TouchableOpacity>
    </View>
  );
};

export default BookmarkButton;