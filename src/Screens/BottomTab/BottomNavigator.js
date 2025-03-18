/* eslint-disable prettier/prettier */
import {StyleSheet, Image, Text, View} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import P2P from './P2P/P2P';
import Orders from './Orders/Orders';
import PostAd from './PostAd/PostAd';
import Profile from './Profile/Profile';

const Tab = createBottomTabNavigator();

const BottomNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarLabelStyle: {fontSize: 12},
        tabBarStyle: {backgroundColor: 'black', paddingTop: 6},
        tabBarInactiveTintColor: 'rgba(255, 255, 255, 0.7)',
        tabBarActiveTintColor: 'rgba(255, 255, 255, 1)',
      }}>
      <Tab.Screen
        name="P2P"
        component={P2P}
        options={{
          tabBarIcon: ({color}) => (
            <Image
              source={require('../../Assets/Slicing/P2P/Home.png')}
              style={{width: 25, height: 25, tintColor: color}}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Orders"
        component={Orders}
        options={{
          tabBarIcon: ({color}) => (
            <Image
              source={require('../../Assets/Slicing/P2P/Orders.png')}
              style={{width: 25, height: 25, tintColor: color}}
            />
          ),
          headerTitle: 'My Orders',
        }}
      />
      <Tab.Screen
        name="PostAd"
        component={PostAd}
        options={{
          tabBarIcon: ({color}) => (
            <Image
              source={require('../../Assets/Slicing/P2P/Ads.png')}
              style={{width: 25, height: 25, tintColor: color}}
            />
          ),
          headerTitle: 'My Ads',
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({color}) => (
            <Image
              source={require('../../Assets/Slicing/P2P/Profile.png')}
              style={{width: 27, height: 27, tintColor: color}}
            />
          ),
          headerTitle: 'My Profile',
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomNavigator;

const styles = StyleSheet.create({});
