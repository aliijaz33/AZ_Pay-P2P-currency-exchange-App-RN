import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Alert,
  View,
} from 'react-native';
import React, {useState} from 'react';
import Custom_BG from '../../../Custom_Components/Custom_BG';
import useRefreshUser from '../../../useRefreshUser';

const Withdraw = ({navigation}) => {
  const [bankName, setBankName] = useState('');
  const [accountTitle, setAccountTitle] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [branchCode, setBranchCode] = useState();
  const refreshUser = useRefreshUser();

  const bankDetail = {bankName, accountTitle, accountNumber, branchCode};
  const handleNext = () => {
    refreshUser();
    if (bankName === '') {
      Alert.alert('Pay Attention!', 'Enter Bank Name');
    } else if (accountTitle === '') {
      Alert.alert('Pay Attention!', 'Enter Account Title');
    } else if (accountNumber === '') {
      Alert.alert('Pay Attention!', 'Enter Account Number');
    } else {
      navigation.navigate('Withdraw Amount', {bankDetail: bankDetail});
      setBankName();
      setAccountTitle();
      setAccountNumber();
      setBranchCode();
    }
  };
  return (
    <Custom_BG>
      <Text style={styles.text}>
        Enter your bank or other wallet details in which you want to withdraw
        your money
      </Text>
      <KeyboardAvoidingView style={styles.keyboardAvoidingView}>
        <ScrollView contentContainerStyle={styles.inputView}>
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
          <Text style={styles.label}>Branch Code (optional)</Text>
          <TextInput
            style={styles.input}
            onChangeText={text => setBranchCode(text)}
            value={branchCode}
            color={'black'}
            keyboardType="numeric"
          />

          <TouchableOpacity
            //disabled={!isEnabled}
            style={styles.button}
            onPressIn={handleNext}>
            <Image
              source={require('../../../Assets/Slicing/DepositWithdraw/NextBtn.png')}
              style={styles.nextButton}
            />
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </Custom_BG>
  );
};

export default Withdraw;

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    color: 'black',
    textAlign: 'center',
    fontFamily: 'Poppins Regular',
    marginHorizontal: '5%',
    marginTop: '4%',
    marginBottom: '5%',
  },
  keyboardAvoidingView: {
    flex: 1,
    marginTop: '2%',
  },
  inputView: {
    flexGrow: 1,
    padding: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    width: '100%',
  },
  label: {
    marginTop: '3%',
    marginBottom: 7,
    marginLeft: '8%',
    fontSize: 17,
    color: 'black',
    fontFamily: 'Poppins Regular',
  },
  input: {
    height: 48,
    width: '85%',
    alignSelf: 'center',
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: 'black',
    paddingLeft: 10,
    fontSize: 17,
    marginBottom: '0.8%',
  },
  button: {
    marginTop: '20%',
    alignSelf: 'center',
  },
  nextButton: {
    width: 190,
    height: 55,
    borderRadius: 8,
  },
});
