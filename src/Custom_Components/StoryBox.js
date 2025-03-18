import {StyleSheet, TouchableOpacity, Image, Text, View} from 'react-native';
import React from 'react';

const StoryBox = ({
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

export default StoryBox;

const styles = StyleSheet.create({
  storyContainer: {
    width: 122,
    height: 110,
    backgroundColor: 'rgba(0,0,0,0.01) ',
    marginRight: 8,
    paddingLeft: 10,
    borderRadius: 30,
    borderColor: 'black',
    borderWidth: 1.3,
    justifyContent: 'space-between',
  },
  currencyLogoView: {
    flexDirection: 'row',
  },
  currencyLogo: {
    width: 30,
    height: 30,
    marginTop: '10%',
    borderRadius: 20,
  },
  currencyName: {
    marginTop: 17,
    marginLeft: 10,
    fontSize: 15,
    fontWeight: '600',
    color: 'black',
  },
  currencyPriceView: {
    marginRight: '6%',
    alignSelf: 'center',
    marginBottom: '5%',
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
