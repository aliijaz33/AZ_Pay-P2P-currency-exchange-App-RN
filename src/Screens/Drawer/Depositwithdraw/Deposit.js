import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import Custom_BG from '../../../Custom_Components/Custom_BG';
import useRefreshUser from '../../../useRefreshUser';

const Deposit = ({navigation}) => {
  const refreshUser = useRefreshUser();
  const [amount, setAmount] = useState();

  const handleNext = () => {
    refreshUser();
    if (amount >= 10) {
      navigation.navigate('Confirm Deposit', {amount: amount});
      setAmount();
    } else if (amount < 10) {
      Alert.alert('Pay Attention!', 'Enter valid amount. (i.e Minimum 10)');
    } else {
      Alert.alert('Pay Attention!', 'Enter an amount.');
    }
  };
  return (
    <Custom_BG>
      <Text style={styles.text}>Enter Amount That You Want to Deposit</Text>
      <View style={styles.container}>
        <Text style={styles.label}>Amount</Text>
        <View style={styles.fieldView}>
          <TextInput
            style={styles.input}
            onChangeText={text => setAmount(text)}
            value={amount}
            placeholder="Minimum 10"
            placeholderTextColor="rgba(180,180,180,1)"
            keyboardType="numeric"
          />
          <View style={styles.icon}>
            <Text style={styles.iconText}>AZ-Pkr</Text>
          </View>
        </View>

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

export default Deposit;

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    color: 'black',
    textAlign: 'center',
    fontFamily: 'Poppins Regular',
    marginHorizontal: '20%',
    marginTop: '6%',
    //fontWeight: 'bold',
  },
  container: {
    width: '100%',
    alignItems: 'center',
  },
  label: {
    marginTop: '10%',
    marginBottom: 10,
    marginLeft: '-50%',
    fontSize: 17,
    fontWeight: 'bold',
    color: 'black',
    fontFamily: 'Poppins Regular',
  },
  input: {
    height: 50,
    width: '70%',
    alignSelf: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,1)',
    backgroundColor: 'rgba(255,255,255,1)',
    paddingLeft: 10,
    fontSize: 17,
    marginLeft: '4%',
    marginBottom: '1.5%',
  },
  fieldView: {
    flexDirection: 'row',
  },
  icon: {
    marginLeft: '-10%',
    marginTop: '3%',
    paddingRight: '3.5%',
  },
  iconText: {
    marginLeft: -25,
    fontSize: 16,
    fontWeight: '600',
    color: 'black',
  },
  button: {
    marginTop: '57%',
  },
  nextButton: {
    width: 160,
    height: 50,
    borderRadius: 8,
  },
});
