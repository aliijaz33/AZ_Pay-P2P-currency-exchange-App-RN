import {StyleSheet, Text, View, ImageBackground} from 'react-native';
import React from 'react';
import CustomHeader from './CustomHeader';

const Custom_BG = ({children}) => {
  return (
    <View>
      <ImageBackground
        source={require('../Assets/Slicing/MainBackground.png')}
        style={styles.backgroundImage}
        resizeMode="cover">
        <CustomHeader showMenuIcon={false} color="black" />
        {children}
      </ImageBackground>
    </View>
  );
};

export default Custom_BG;

const styles = StyleSheet.create({
  backgroundImage: {
    width: '100%',
    height: '100%',
  },
});
