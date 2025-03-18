import {StyleSheet, TouchableOpacity, Image, Text, View} from 'react-native';
import React from 'react';

const PortfolioBox = ({
  currencyName,
  currencyImage,
  currentBalance,
  currencySymbol,
  navigation,
}) => {
  return (
    <View style={styles.storyContainer}>
      <View style={styles.currencyLogoView}>
        <Image style={styles.currencyLogo} source={{uri: currencyImage}} />
        <Text style={styles.currencyName}>{currencyName}</Text>
      </View>
      <View style={styles.currencyPriceView}>
        <Text style={styles.availableText}>Available</Text>
        <Text style={styles.balanceText}>
          {currentBalance} {currencySymbol}
        </Text>
      </View>
    </View>
  );
};

export default PortfolioBox;

const styles = StyleSheet.create({
  storyContainer: {
    width: '90%',
    height: 100,
    backgroundColor: 'rgba(0,0,0,0.01) ',
    marginRight: 8,
    paddingLeft: 10,
    borderRadius: 30,
    borderColor: 'black',
    borderWidth: 1.3,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: '3%',
  },
  currencyLogoView: {
    flexDirection: 'row',
    // borderColor: 'red',
    // borderWidth: 1,
    alignItems: 'center',
  },
  currencyLogo: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  currencyName: {
    marginLeft: 10,
    fontSize: 20,
    fontWeight: '600',
    color: 'black',
  },
  currencyPriceView: {
    marginRight: '6%',
    alignSelf: 'center',
    // borderColor: 'blue',
    // borderWidth: 1,
  },
  availableText: {
    fontSize: 15,
    fontWeight: '400',
    color: 'black',
    fontFamily: 'Poppins Regular',
  },
  balanceText: {
    color: 'black',
    fontFamily: 'Poppins Regular',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
