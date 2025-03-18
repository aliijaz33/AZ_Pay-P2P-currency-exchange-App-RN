import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState, useContext} from 'react';
import Custom_BG from '../../../Custom_Components/Custom_BG';
import useRefreshUser from '../../../useRefreshUser';
import UserContext from '../../../UserContext';
import axios from 'axios';

const BuyAmount = ({navigation, route}) => {
  const {item, currencyName} = route.params;
  const refreshUser = useRefreshUser();
  const {user} = useContext(UserContext);
  const [buyAmount, setBuyAmount] = useState(0);
  const [convertedAmount, setConvertedAmount] = useState(0.0);

  useEffect(() => {
    const OrderAmount = parseFloat(buyAmount);
    if (!isNaN(OrderAmount) && OrderAmount > 0) {
      const conversion = (OrderAmount / item.unitPrice).toFixed(2);
      setConvertedAmount(conversion);
    } else {
      setConvertedAmount(0.0);
    }
  }, [buyAmount]);

  const generateRandomId = length => {
    const characters = '0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(randomIndex);
    }
    return result;
  };
  const handleButtonPress = async () => {
    const OrderAmount = parseFloat(buyAmount);
    if (isNaN(OrderAmount) || OrderAmount <= 0) {
      Alert.alert('Invalid Amount!', 'Please enter a valid amount');
    } else if (OrderAmount < item.min) {
      Alert.alert(
        'Invalid Amount!',
        'Your entered amount is below the minimum limit',
      );
    } else if (OrderAmount > item.max) {
      Alert.alert(
        'Invalid Amount!',
        'Your entered amount exceeds the maximum limit',
      );
    } else {
      try {
        const id = generateRandomId(20);

        await axios.post('http://10.0.2.2:4200/notifySeller', {
          sellerInfo: item.owner,
          buyer: {
            name: user.name,
            email: user.email,
            _id: user._id,
          },
          type: 'buy',
          OrderAmount,
          currencyName,
          convertedAmount,
          id,
        });

        setBuyAmount(0);
        refreshUser();
        navigation.navigate('Pay the seller', {
          OrderAmount,
          currencyName,
          item,
          id,
          convertedAmount,
        });
      } catch (error) {
        console.error('Error notifying seller:', error);
        Alert.alert('Error', 'Failed to notify the seller');
      }
    }
  };
  return (
    <Custom_BG>
      <View style={styles.container}>
        <Text style={styles.priceText}>Price: {item.unitPrice}</Text>
        <View style={styles.amountBox}>
          <Text style={styles.amountText}>Amount</Text>
          <View style={{flexDirection: 'row'}}>
            <TextInput
              value={buyAmount}
              style={styles.input}
              placeholder="0.00"
              keyboardType="numeric"
              onChangeText={txt => setBuyAmount(txt)}
            />
            <Text style={styles.pkrText}>PKR</Text>
          </View>
          <Text>
            Order Limit: Rs {item.min} - Rs {item.max}
          </Text>
          <Text style={styles.youReceiveText}>
            You Receive {'  '} {convertedAmount} {currencyName}
          </Text>
        </View>
        <Image
          source={require('../../../Assets/Slicing/P2P/PostAds/BreakLine.png')}
          style={styles.lineImage}
        />
        <Text style={styles.makerText}>Maker info</Text>
        <View style={styles.infoContainer}>
          <Text style={styles.leftText}>Maker</Text>
          <Text style={styles.leftText}>{item.owner.traderProfile.name}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.leftText}>Payment Method</Text>
          <Text style={styles.leftText}>{item.paymentMethod.bankName}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.leftText}>Payment window</Text>
          <Text style={styles.leftText}>20 mins</Text>
        </View>
        <TouchableOpacity>
          <Text style={styles.termsText}>
            By Proceeding, you are agree to the{' '}
            <Text style={styles.termsUnderlineText}>
              AZ-PAY P2P trading legal disclaimer
            </Text>
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleButtonPress}>
          <Text style={styles.buttonText}>Buy {currencyName} with 0 fee</Text>
        </TouchableOpacity>
      </View>
    </Custom_BG>
  );
};

export default BuyAmount;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingHorizontal: 20,
    flex: 1,
  },
  priceText: {
    fontSize: 22,
    color: 'black',
    marginTop: 8,
    fontWeight: '600',
    fontFamily: 'Poppins Regular',
  },
  amountBox: {
    width: '100%',
    height: 165,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 11,
    marginTop: '7%',
    backgroundColor: 'white',
    paddingLeft: 15,
  },
  amountText: {
    fontSize: 22,
    color: 'black',
    marginTop: 8,
    fontWeight: '600',
    fontFamily: 'Poppins Regular',
  },
  input: {
    width: '80%',
    borderBottomColor: 'rgba(0,0,0,0.25)',
    borderBottomWidth: 1,
    fontSize: 18,
  },
  pkrText: {
    fontSize: 20,
    color: 'black',
    marginTop: 8,
    fontFamily: 'Poppins Regular',
    marginLeft: 5,
    paddingTop: 5,
  },
  youReceiveText: {
    fontSize: 17,
    color: 'black',
    marginTop: 8,
    fontFamily: 'Poppins Regular',
    marginTop: 20,
  },
  lineImage: {
    marginVertical: '10%',
    width: '98%',
    alignSelf: 'center',
    tintColor: 'rgba(125, 125, 125, 1)',
  },
  makerText: {
    fontSize: 17,
    color: 'black',
    fontFamily: 'Poppins Regular',
    fontWeight: 'bold',
    alignSelf: 'flex-start',
  },
  infoContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  leftText: {
    fontSize: 14,
    color: 'black',
    fontFamily: 'Poppins Regular',
    marginTop: '4%',
  },
  termsText: {
    fontSize: 10.7,
    marginTop: '15%',
    marginBottom: '1.5%',
    color: 'black',
  },
  termsUnderlineText: {
    textDecorationLine: 'underline',
  },
  button: {
    width: '100%',
    height: 55,
    backgroundColor: 'black',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'Poppins Regular',
  },
});
