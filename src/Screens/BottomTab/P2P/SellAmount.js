import {
  Alert,
  Image,
  ScrollView,
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

const SellAmount = ({navigation, route}) => {
  const {item, currencyName} = route.params;
  const refreshUser = useRefreshUser();
  const {user} = useContext(UserContext);
  const [sellAmount, setSellAmount] = useState(0);
  const [convertedAmount, setConvertedAmount] = useState(0.0);
  const [bankName, setBankName] = useState('');
  const [accountTitle, setAccountTitle] = useState('');
  const [accountNumber, setAccountNumber] = useState('');

  const filterredCurrency = user.currencies.find(
    currency => currency.currency === currencyName,
  );
  if (filterredCurrency) {
    var avaiableBalance = filterredCurrency.balance.toFixed(2);
  }
  useEffect(() => {
    const OrderAmount = parseFloat(sellAmount);
    if (!isNaN(OrderAmount) && OrderAmount > 0) {
      const conversion = (OrderAmount * item.unitPrice).toFixed(2);
      setConvertedAmount(conversion);
    } else {
      setConvertedAmount(0.0);
    }
  }, [sellAmount]);

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
    const OrderAmount = parseFloat(convertedAmount);
    if (!filterredCurrency) {
      Alert.alert('Attention!', 'You have not this currency in your account');
      return;
    } else {
      if (isNaN(OrderAmount) || OrderAmount <= 0) {
        Alert.alert('Invalid Amount!', 'Please enter a valid amount');
      } else if (sellAmount > avaiableBalance) {
        Alert.alert(
          'Invalid Amount!',
          'Your entered amount is below the minimum limit',
        );
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
      } else if (!bankName) {
        Alert.alert('Alert!', 'Please enter bank name');
      } else if (!accountTitle) {
        Alert.alert('Alert!', 'Please enter account title');
      } else if (!accountNumber) {
        Alert.alert('Alert!', 'Please enter account number');
      } else {
        try {
          const id = generateRandomId(20);

          await axios.post('http://10.0.2.2:4200/notifyBuyer', {
            buyerInfo: item.owner,
            seller: user,
            type: 'sell',
            OrderAmount,
            currencyName,
            sellAmount: parseFloat(sellAmount),
            id,
            bankName,
            accountTitle,
            accountNumber,
          });

          setSellAmount(0);
          setBankName('');
          setAccountTitle('');
          setAccountNumber('');
          refreshUser();
          navigation.navigate('Pay the buyer', {
            OrderAmount,
            currencyName,
            item,
            id,
            sellAmount,
            bankName,
            accountTitle,
            accountNumber,
          });
        } catch (error) {
          console.error('Error notifying buyer:', error);
          Alert.alert('Error', 'Failed to notify the buyer');
        }
      }
    }
  };

  return (
    <Custom_BG>
      <ScrollView style={styles.container}>
        <Text style={styles.priceText}>Price: {item.unitPrice}</Text>
        <View style={styles.amountBox}>
          <Text style={styles.amountText}>Amount</Text>
          <View style={{flexDirection: 'row'}}>
            <TextInput
              value={sellAmount}
              style={styles.amountInput}
              placeholder="0.00"
              keyboardType="numeric"
              onChangeText={txt => setSellAmount(txt)}
            />
            <View style={{marginLeft: '5%'}}>
              <Text style={styles.currencyNameText}>
                {filterredCurrency?.currency}
              </Text>
              <Text style={styles.avaiableBalanceText}>{avaiableBalance}</Text>
            </View>
          </View>
          <Text>
            Order Limit: Rs {item.min} - Rs {item.max}
          </Text>
          <Text style={styles.youReceiveText}>
            You Receive {'  '} {convertedAmount} Pkr
          </Text>
        </View>
        <Image
          source={require('../../../Assets/Slicing/P2P/PostAds/BreakLine.png')}
          style={styles.lineImage}
        />
        <View style={styles.infoContainer}>
          <Text style={styles.makerText}>Maker</Text>
          <Text style={styles.makerText}>{item.owner.traderProfile.name}</Text>
        </View>
        <Text style={styles.paymentDetailsText}>Payment Method Details</Text>

        <Text style={styles.label}>Bank Name*</Text>
        <TextInput
          style={styles.input}
          onChangeText={text => setBankName(text)}
          value={bankName}
          color={'black'}
        />
        <Text style={styles.label}>Account Title*</Text>
        <TextInput
          style={styles.input}
          onChangeText={text => setAccountTitle(text)}
          value={accountTitle}
          color={'black'}
        />
        <Text style={styles.label}>Account Number*</Text>
        <TextInput
          style={styles.input}
          onChangeText={text => setAccountNumber(text)}
          value={accountNumber}
          color={'black'}
        />
        <TouchableOpacity>
          <Text style={styles.termsText}>
            By Proceeding, you are agree to the{' '}
            <Text style={styles.termsUnderlineText}>
              AZ-PAY P2P trading legal disclaimer
            </Text>
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleButtonPress}>
          <Text style={styles.buttonText}>Sell {currencyName} with 0 fee</Text>
        </TouchableOpacity>
      </ScrollView>
    </Custom_BG>
  );
};

export default SellAmount;

const styles = StyleSheet.create({
  container: {
    //alignItems: 'center',
    paddingHorizontal: 20,
    flexGrow: 1,
  },
  priceText: {
    fontSize: 22,
    color: 'black',
    marginTop: 8,
    fontWeight: '600',
    fontFamily: 'Poppins Regular',
    alignSelf: 'center',
  },
  amountBox: {
    width: '100%',
    height: 165,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 11,
    marginTop: '5%',
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
  amountInput: {
    width: '68%',
    borderBottomColor: 'rgba(0,0,0,0.25)',
    borderBottomWidth: 1,
    fontSize: 18,
  },
  currencyNameText: {
    fontSize: 20,
    color: 'black',
    //marginTop: 8,
    fontFamily: 'Poppins Regular',
    marginLeft: 5,
    paddingTop: 5,
  },
  avaiableBalanceText: {
    fontSize: 13,
    marginLeft: '8%',
  },
  youReceiveText: {
    fontSize: 17,
    color: 'black',
    marginTop: 8,
    fontFamily: 'Poppins Regular',
    marginTop: 20,
  },
  lineImage: {
    marginVertical: '7%',
    width: '98%',
    alignSelf: 'center',
    tintColor: 'rgba(125, 125, 125, 1)',
  },
  makerText: {
    fontSize: 14,
    color: 'black',
    fontFamily: 'Poppins Regular',
  },
  paymentDetailsText: {
    fontSize: 17,
    color: 'black',
    fontFamily: 'Poppins Regular',
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    marginTop: '4%',
  },

  label: {
    marginTop: '1%',
    marginBottom: '1%',
    //marginLeft: '8%',
    fontSize: 17,
    color: 'black',
    alignSelf: 'flex-start',
    fontFamily: 'Poppins Regular',
  },
  input: {
    height: 48,
    width: '100%',
    alignSelf: 'center',
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: 'black',
    paddingLeft: 10,
    fontSize: 17,
    marginBottom: '0.8%',
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
