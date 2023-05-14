import * as React from "react";
import { Image, StyleSheet, View } from "react-native";
// import { Color } from "../GlobalStyles";

const LoadingScreen = () => {
  return (
    <View style={styles.loadingScreen}>
      <Image
        source={require("../splash.png")}
      />
    </View>
  );
};

export default LoadingScreen;
