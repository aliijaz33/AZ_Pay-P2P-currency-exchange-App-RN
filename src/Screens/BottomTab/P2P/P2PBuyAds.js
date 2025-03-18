import {
  StyleSheet,
  ImageBackground,
  Text,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import React from 'react';
import useRefreshUser from '../../../useRefreshUser';

const P2PBuyAds = ({navigation, item, currencyName}) => {
  const refreshUser = useRefreshUser();

  //console.log('item from ad--->>', item);
  const handleButtonPress = () => {
    refreshUser();
    navigation.navigate('Buy', {item: item, currencyName: currencyName});
  };
  return (
    <ImageBackground
      source={require('../../../Assets/Slicing/P2P/CurrencyBoxBG.png')}
      style={styles.container}>
      <View style={styles.nameContainer}>
        <Text style={styles.nameText}>{item.owner.traderProfile.name}</Text>
        <Text style={styles.priceText}>Rs {item.unitPrice}</Text>
        <Text style={styles.amountLimitText}>
          Amount: {item.quantity} {currencyName}
        </Text>
        <Text style={styles.amountLimitText}>
          <Text style={{fontWeight: 'bold'}}>Limit:</Text> Rs {item.min} - Rs{' '}
          {item.max}
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <Text style={styles.totalTradesText}>
          Total trades: {item.owner.completedOrders.length}
        </Text>
        <Text style={styles.completionRateText}>Completion Rate: 99.8 %</Text>
        <TouchableOpacity
          style={styles.buttonTouch}
          onPress={handleButtonPress}>
          <Image
            source={require('../../../Assets/Slicing/P2P/BuyBtn.png')}
            style={styles.button}
          />
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default P2PBuyAds;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 111.1,
    marginTop: '3%',
    marginBottom: 5,
    alignItems: 'center',
    flexDirection: 'row',
  },
  nameContainer: {
    height: '100%',
    width: '65%',
    paddingTop: 8,
    paddingLeft: 12,
  },
  nameText: {
    fontSize: 17,
    color: 'black',
    fontFamily: 'Poppins Regular',
  },
  priceText: {
    fontSize: 21,
    color: 'black',
    fontWeight: 'bold',
    marginBottom: 5,
    fontFamily: 'Poppins Regular',
  },
  amountLimitText: {
    fontSize: 12,
    color: 'black',
    fontFamily: 'Poppins Regular',
  },
  buttonContainer: {
    paddingTop: 10,
    height: '100%',
    width: '35%',
  },
  totalTradesText: {
    fontSize: 13,
    color: 'black',
    fontFamily: 'Poppins Regular',
  },
  completionRateText: {
    marginTop: 4,
    fontSize: 11,
    color: 'black',
    fontFamily: 'Poppins Regular',
  },
  buttonTouch: {
    width: 60,
    height: 25,
    alignSelf: 'center',
    marginTop: '13%',
  },
  button: {
    width: 60,
    height: 25,
  },
});
