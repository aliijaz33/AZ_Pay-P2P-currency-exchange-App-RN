import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import React, {useState, useContext, useEffect} from 'react';
import Custom_BG from '../../../Custom_Components/Custom_BG';
import useRefreshUser from '../../../useRefreshUser';
import UserContext from '../../../UserContext';

const WithdrawAmount = ({navigation, route}) => {
  const {bankDetail} = route.params;
  const [amount, setAmount] = useState();
  const [availableAmount, setAvailableAmount] = useState(0);
  const refreshUser = useRefreshUser();
  const {user} = useContext(UserContext);
  const details = {bankDetail, amount};

  const initialAlphabets = bankDetail.accountTitle
    .split(' ')
    .map(word => word.charAt(0))
    .join('')
    .toUpperCase();

  useEffect(() => {
    function AZPKRBalance(user) {
      const currencyObject = user.currencies.find(
        currency => currency.currency === 'AZ-PKR',
      );
      return currencyObject ? currencyObject.balance : null;
    }
    const AZPKR = AZPKRBalance(user, 'AZ-PKR');
    setAvailableAmount(AZPKR);
  }, []);

  const handleNext = () => {
    refreshUser();
    if (!amount) {
      Alert.alert('Pay Attention!', 'Enter an amount.');
    } else if (amount <= 0) {
      Alert.alert('Pay Attention!', 'Enter valid amount. (i.e greater that 0)');
    } else if (amount > availableAmount) {
      Alert.alert(
        'Insufficient Balance!',
        'You entered invalid amount. (Greater than your available balance)',
      );
    } else {
      navigation.navigate('Confirm Withdraw', {details: details});
      setAmount();
    }
  };

  const handleMax = () => {
    setAmount(String(availableAmount));
  };

  return (
    <Custom_BG>
      <Text style={styles.text}>Enter Amount</Text>
      <View style={styles.circleContainer}>
        <View style={styles.circle}>
          <Text style={styles.initialAlphabets}>{initialAlphabets}</Text>
        </View>
        <View style={styles.accountInfoView}>
          <Text style={styles.accountTitleText}>{bankDetail.accountTitle}</Text>
          <Text style={styles.accountTitleText}>
            {bankDetail.accountNumber}
          </Text>
        </View>
      </View>
      <View style={styles.container}>
        <Text style={styles.label}>Amount</Text>
        <View style={styles.fieldView}>
          <TextInput
            style={styles.input}
            onChangeText={text => setAmount(text)}
            value={amount}
            placeholderTextColor="rgba(180,180,180,1)"
            keyboardType="numeric"
            color={'black'}
          />
          <TouchableOpacity style={styles.maxIcon} onPress={handleMax}>
            <Text style={styles.maxIconText}>Max</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.avialableText}>
          Available: {availableAmount} AZ-Pkr
        </Text>
        <TouchableOpacity
          //disabled={!isEnabled}
          style={styles.button}
          onPressIn={handleNext}>
          <Image
            source={require('../../../Assets/Slicing/DepositWithdraw/NextBtn.png')}
            style={styles.nextButton}
          />
        </TouchableOpacity>
      </View>
    </Custom_BG>
  );
};

export default WithdrawAmount;

const styles = StyleSheet.create({
  text: {
    fontSize: 21,
    color: 'black',
    textAlign: 'center',
    fontFamily: 'Poppins Regular',
    marginTop: '3%',
    fontWeight: 'bold',
  },
  circleContainer: {
    flexDirection: 'row',
    width: '100%',
    marginTop: '12%',
    marginLeft: '8%',
  },
  circle: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  initialAlphabets: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'Poppins Regular',
  },
  accountInfoView: {
    paddingLeft: 2,
  },
  accountTitleText: {
    fontSize: 15,
    color: 'black',
    fontFamily: 'Poppins Regular',
    marginLeft: '12%',
  },
  container: {
    width: '100%',
    alignItems: 'center',
  },
  label: {
    marginTop: '10%',
    marginBottom: 10,
    marginLeft: '-63%',
    fontSize: 17,
    fontWeight: 'bold',
    color: 'black',
    fontFamily: 'Poppins Regular',
  },
  input: {
    height: 48,
    width: '80%',
    alignSelf: 'center',
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: 'black',
    paddingLeft: 10,
    fontSize: 17,
    marginBottom: '0.8%',
  },
  fieldView: {
    flexDirection: 'row',
  },
  maxIcon: {
    marginLeft: '-10%',
    marginTop: '2.5%',
    paddingRight: '3.5%',
  },
  maxIconText: {
    marginLeft: -10,
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  avialableText: {
    marginLeft: '45%',
    fontSize: 13,
    color: 'black',
    marginTop: 2,
    //fontWeight: 'bold',
  },
  button: {
    marginTop: '40%',
  },
  nextButton: {
    width: 160,
    height: 50,
    borderRadius: 8,
  },
});
