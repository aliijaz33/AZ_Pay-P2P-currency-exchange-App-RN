import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import useRefreshUser from '../useRefreshUser';

const CustomHeader = ({showMenuIcon, color}) => {
  const refreshUser = useRefreshUser();
  const navigation = useNavigation();
  const route = useRoute();

  const openDrawer = () => {
    refreshUser();
    navigation.openDrawer();
  };

  const navigateBack = () => {
    refreshUser();
    navigation.goBack();
  };

  const title =
    (route.name === 'Buy' || route.name === 'Sell') &&
    route.params &&
    route.params.currencyName
      ? `${route.name} ${route.params.currencyName}`
      : route.name;

  return (
    <>
      <View style={styles.header}>
        {showMenuIcon ? (
          <TouchableOpacity onPress={openDrawer}>
            <Image
              source={require('../Assets/Slicing/Dashboard/MenuLogo.png')}
              style={styles.logo}
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={navigateBack}>
            <Image
              source={require('../Assets/Slicing/BackArrow.png')}
              style={[styles.backIcon, {tintColor: color}]}
            />
          </TouchableOpacity>
        )}
        <View style={{width: '90%'}}>
          <Text style={[styles.headerTitle, {color: color}]}>{title}</Text>
        </View>
      </View>
      <Image
        source={require('../Assets/Slicing/BlackLine.png')}
        style={[styles.headerLine, {tintColor: color}]}
      />
    </>
  );
};

export default CustomHeader;

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: 55,
    backgroundColor: 'Transparent',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: '3%',
  },
  logo: {
    width: 25,
    height: 25,
    tintColor: 'black',
  },
  backIcon: {
    width: 17,
    height: 27,
  },
  headerTitle: {
    color: 'black',
    fontSize: 25,
    alignSelf: 'center',
    fontFamily: 'Poppins Regular',
  },
  headerLine: {
    width: '96%',
    height: 1,
    alignSelf: 'center',
  },
});
