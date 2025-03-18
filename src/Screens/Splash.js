/* eslint-disable prettier/prettier */
import {Image, ImageBackground, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useRefreshUser from '../useRefreshUser';

const Splash = ({navigation}) => {
  const [loginToken, setLoginToken] = useState(null);
  const refreshUser = useRefreshUser();

  useEffect(() => {
    const getToken = async () => {
      const token = await AsyncStorage.getItem('loginToken');
      const user = await AsyncStorage.getItem('user');
      setLoginToken(token);
      refreshUser();
      console.log('From splash Screen token---->', token);
      console.log('From splash Screen Logged user token---->', user);
    };
    getToken();
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (loginToken === 'loggedIn') {
        refreshUser();
        navigation.replace('MainDrawer');
      } else {
        navigation.replace('Login');
      }
    }, 2000);

    return () => clearTimeout(timeout);
  }, [loginToken, navigation]);

  return (
    <Image
      source={require('../Assets/Slicing/SplashScreen/SplashScreen.png')}
      style={styles.splashScreen}
    />
  );
};

export default Splash;

const styles = StyleSheet.create({
  splashScreen: {
    width: '100%',
    height: '100%',
  },
});
