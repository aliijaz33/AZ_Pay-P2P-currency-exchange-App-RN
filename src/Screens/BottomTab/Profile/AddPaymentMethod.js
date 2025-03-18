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
  ActivityIndicator,
} from 'react-native';
import React, {useState, useContext} from 'react';
import Custom_BG from '../../../Custom_Components/Custom_BG';
import AwesomeAlert from 'react-native-awesome-alerts';
import UserContext from '../../../UserContext';
import useRefreshUser from '../../../useRefreshUser';

const AddPaymentMethod = ({navigation}) => {
  const {user} = useContext(UserContext);
  const refreshUser = useRefreshUser();

  const [bankName, setBankName] = useState('');
  const [accountTitle, setAccountTitle] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [branchCode, setBranchCode] = useState('');

  const [showAlert, setShowAlert] = useState(false);
  const [indicator, setIndicator] = useState(false);

  const handleNext = () => {
    if (bankName === '') {
      Alert.alert('Pay Attention!', 'Enter Bank Name');
    } else if (accountTitle === '') {
      Alert.alert('Pay Attention!', 'Enter Account Title');
    } else if (accountNumber === '') {
      Alert.alert('Pay Attention!', 'Enter Account Number');
    } else {
      setShowAlert(true);
    }
  };

  const cancelPressed = () => {
    setShowAlert(false);
    setBankName('');
    setAccountTitle('');
    setAccountNumber('');
    setBranchCode('');
    Alert.alert('Canceled!', 'You Cancel This Action');
  };

  const confirmPressed = async () => {
    setIndicator(true);
    try {
      const response = await fetch('http://10.0.2.2:4200/addPaymentMethod', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          LogedUserEmail: user.email,
          paymentMethod: {
            bankName: bankName,
            accountTitle: accountTitle,
            accountNumber: accountNumber,
            branchCode: branchCode,
          },
        }),
      });
      const data = await response.json();
      if (response.ok) {
        setIndicator(false);
        setShowAlert(false);
        setBankName('');
        setAccountTitle('');
        setAccountNumber('');
        setBranchCode('');
        refreshUser();
        setTimeout(() => {
          setIndicator(false);
          setShowAlert(false);
          Alert.alert('Success!', 'Payment Added Successfully');
        }, 300);
      } else {
        Alert.alert('Error', data.error || 'Failed to add payment method');
      }
    } catch (error) {
      console.error('Error adding payment method:', error);
      Alert.alert('Error', 'An error occurred while adding the payment method');
    } finally {
      setIndicator(false);
    }
  };
  return (
    <Custom_BG>
      {indicator ? <ActivityIndicator size={40} color="black" /> : ''}
      <Text style={styles.text}>Enter your bank or other wallet details</Text>
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
      <AwesomeAlert
        contentContainerStyle={styles.contentContainerStyle}
        show={showAlert}
        showCancelButton={true}
        cancelText="Cancel"
        cancelButtonTextStyle={{
          color: 'black',
          fontFamily: 'Poppins Regular',
        }}
        onCancelPressed={cancelPressed}
        showConfirmButton={true}
        confirmText="Confirm"
        confirmButtonStyle={{
          backgroundColor: 'black',
          marginLeft: 40,
        }}
        confirmButtonTextStyle={{fontFamily: 'Poppins Regular'}}
        onConfirmPressed={confirmPressed}
        closeOnTouchOutside={false}
        closeOnHardwareBackPress={false}
        customView={
          <View style={styles.alertView}>
            <Text style={styles.alertText}>Cross Check the details</Text>
            <Text style={styles.alertConversionText}>
              Bank Name: {bankName}
            </Text>
            <Text style={styles.alertConversionText}>
              Account Title: {accountTitle}
            </Text>
            <Text style={styles.alertConversionText}>
              Account Number: {accountNumber}
            </Text>
            <Text style={styles.alertConversionText}>
              Branch Code: {branchCode}
            </Text>
          </View>
        }
      />
    </Custom_BG>
  );
};

export default AddPaymentMethod;

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    color: 'black',
    textAlign: 'center',
    fontFamily: 'Poppins Regular',
    marginHorizontal: '5%',
    marginTop: '4%',
    marginBottom: '1%',
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

  //Alert styles
  contentContainerStyle: {
    width: '100%',
    paddingHorizontal: 1,
    paddingVertical: 20,
  },
  alertView: {
    alignItems: 'flex-start',
  },
  alertText: {
    color: 'black',
    fontFamily: 'Poppins Regular',
    fontSize: 20,
    marginBottom: 10,
  },
  alertConversionText: {
    color: 'black',
    fontFamily: 'Poppins Regular',
    fontSize: 17,
    textAlign: 'center',
  },
});
