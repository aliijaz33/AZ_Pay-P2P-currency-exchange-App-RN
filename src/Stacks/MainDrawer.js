import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import DrawerNavigator from '../Screens/Drawer/DrawerNavigator';
const MainDrawer = () => {
  return (
    <View style={{ flex: 1 }}>
      <DrawerNavigator />
    </View>
  );
};

export default MainDrawer;

const styles = StyleSheet.create({});