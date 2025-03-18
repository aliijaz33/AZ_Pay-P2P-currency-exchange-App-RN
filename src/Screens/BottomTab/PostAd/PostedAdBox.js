import {
  StyleSheet,
  ImageBackground,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import React from 'react';

const PostedAdBox = ({
  index,
  currencySymbol,
  unitPrice,
  min,
  max,
  quantity,
  paymentMethod,
  activeButton,
  onDelete,
}) => {
  const handleDelete = () => {
    Alert.alert(
      'Delete Ad',
      'Are you sure you want to delete this ad?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => onDelete(),
        },
      ],
      {cancelable: false},
    );
  };

  return (
    <ImageBackground
      source={require('../../../Assets/Slicing/P2P/CurrencyBoxBG.png')}
      style={styles.container}>
      <View style={styles.nameContainer}>
        <Text style={styles.currencySymbolText}>{currencySymbol}</Text>
        <Text style={styles.unitPriceText}>
          Unit Price{' '}
          <Text style={{fontWeight: '400', fontSize: 18}}> Rs {unitPrice}</Text>
        </Text>
        <Text style={styles.amountLimitText}>
          Amount: {quantity} {currencySymbol}
        </Text>
        <Text style={styles.amountLimitText}>
          <Text style={{fontWeight: 'bold'}}>Limit:</Text> Rs {min} - Rs {max}
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleDelete}>
          <Image
            source={require('../../../Assets/Slicing/P2P/PostAds/CreateAd/DeleteIcon.png')}
            style={styles.deleteIcon}
          />
        </TouchableOpacity>
        <Text style={styles.buySellText}>
          {activeButton === 'buy' ? 'Buy' : 'Sell'}
        </Text>
        <Text style={styles.paymentMethodText}>{paymentMethod.bankName}</Text>
      </View>
    </ImageBackground>
  );
};

export default PostedAdBox;

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
  currencySymbolText: {
    fontSize: 21,
    color: 'black',
    fontWeight: 'bold',
    marginBottom: 5,
    fontFamily: 'Poppins Regular',
  },
  unitPriceText: {
    fontSize: 18,
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

  deleteIcon: {
    width: 18,
    height: 21,
    alignSelf: 'flex-end',
    marginRight: 10,
  },
  buySellText: {
    marginTop: 10,
    fontSize: 25,
    color: 'black',
    fontFamily: 'Poppins Regular',
    alignSelf: 'center',
    marginLeft: 10,
  },
  paymentMethodText: {
    marginTop: 6,
    fontSize: 13,
    color: 'black',
    fontFamily: 'Poppins Regular',
    alignSelf: 'center',
    marginLeft: 30,
  },
});
