/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Image,
} from 'react-native';
import React from 'react';
import useRefreshUser from '../useRefreshUser';

const CurrencyBox = ({navigation, name, price, source}) => {
  const refreshUser = useRefreshUser();

  const buy = 'buy';
  const sell = 'sell';

  const handleBuyPress = () => {
    refreshUser();
    navigation.navigate('BottomNavigator', {
      screen: 'P2P',
      params: {buy, name},
    });
  };

  const handleSellPress = () => {
    refreshUser();
    navigation.navigate('BottomNavigator', {
      screen: 'P2P',
      params: {sell, name},
    });
  };

  return (
    <ImageBackground
      source={require('../Assets/Slicing/P2P/CurrencyBoxBG.png')}
      style={styles.container}>
      <View style={styles.upperView}>
        <Image style={styles.currencyLogo} source={{uri: source}} />
        <Text style={styles.currencyName}>{name}</Text>
      </View>

      <View
        style={{
          width: '88%',
          justifyContent: 'center',
          borderBottomWidth: 1.1,
          borderColor: 'rgba(0,0,0,0.2)',
        }}
      />

      <View style={styles.bottomView}>
        <Text style={styles.currencyPrice}>{price} Rs</Text>
        <View style={styles.buttonView}>
          <TouchableOpacity onPress={handleBuyPress}>
            <Image
              source={require('../Assets/Slicing/P2P/BuyBtn.png')}
              style={styles.button}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleSellPress}>
            <Image
              source={require('../Assets/Slicing/P2P/SellButton.png')}
              style={styles.button}
            />
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 111.1,
    marginTop: '3%',
    alignItems: 'center',
  },
  upperView: {
    height: '50%',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: '7%',
    alignItems: 'center',
  },
  currencyLogo: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  currencyPrice: {
    fontSize: 21,
    color: 'black',
    paddingLeft: '8%',
    fontFamily: 'Poppins Regular',
  },
  currencyName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    fontFamily: 'Poppins Regular',
  },
  bottomView: {
    height: '50%',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  buttonView: {
    width: '50%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  button: {
    width: 60,
    height: 25,
  },
});

export default CurrencyBox;
