import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import BottomNavigator from '../Screens/BottomTab/BottomNavigator';

const BottomTabMain = () => {
  return (
    <View style={{flex: 1}}>
      <BottomNavigator />
    </View>
  );
};

export default BottomTabMain;

const styles = StyleSheet.create({});
