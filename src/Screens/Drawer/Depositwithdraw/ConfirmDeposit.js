import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Image,
} from 'react-native';
import React, {useState, useContext} from 'react';
import Custom_BG from '../../../Custom_Components/Custom_BG';
import Clipboard from '@react-native-community/clipboard';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import useRefreshUser from '../../../useRefreshUser';
import UserContext from '../../../UserContext';

const ConfirmDeposit = ({route, navigation}) => {
  const {amount} = route.params;
  const [accountNumber, setAccountNumber] = useState('23452436467635745');
  const [showLoader, setShowLoader] = useState(false);
  const [timeoutExpired, setTimeoutExpired] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const refreshUser = useRefreshUser();
  const {user} = useContext(UserContext);

  const copyToClipboard = () => {
    if (accountNumber) {
      Clipboard.setString(accountNumber);
      Alert.alert('Success', 'Address Copied to clipboard');
    } else {
      Alert.alert('Error', 'Failed to copy address');
    }
  };

  const handleConfirm = async () => {
    setShowLoader(true);
    try {
      const response = await fetch('http://10.0.2.2:4200/deposit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount,
          userId: user._id,
          userName: user.name,
          accountNumber,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        setTimeout(() => {
          refreshUser();
          setShowLoader(false);
          setConfirm(true);
        }, 1000);
      } else {
        setShowLoader(false);
        setConfirm(false);
        Alert.alert('Error', data.message);
      }
    } catch (error) {
      console.error('Error confirming deposit:', error);
      setShowLoader(false);
      setConfirm(false);
      Alert.alert('Error', 'An error occurred while processing your request');
    }
  };

  return (
    <Custom_BG>
      {showLoader && (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="black" />
        </View>
      )}
      {confirm ? (
        <View style={styles.reqSubmitedImageView}>
          <Image
            source={require('../../../Assets/Slicing/DepositWithdraw/DepositReqSubmit.png')}
            style={styles.reqSubmitedImage}
          />
        </View>
      ) : (
        <>
          <Text style={styles.text}>
            Please send <Text style={styles.bold}> {amount} PKR </Text> to below
            account
          </Text>
          <View style={styles.accountDetailContainer}>
            <View style={styles.detailsView}>
              <Text style={styles.detailsText}>Bank Name</Text>
              <Text style={styles.detailsText}>Account Title</Text>
              <Text style={styles.detailsText}>Account Number</Text>
              <Text style={styles.detailsText}>Branch Code</Text>
            </View>
            <View style={styles.detailsView}>
              <Text style={styles.detailsText}>Allied Bank</Text>
              <Text style={styles.detailsText}>AZPay</Text>
              <Text style={styles.accountNumberText}>
                {accountNumber}{' '}
                <TouchableOpacity
                  style={styles.copyIcon}
                  onPress={copyToClipboard}>
                  <Icon name="content-copy" size={15} color="black" />
                </TouchableOpacity>
              </Text>
              <Text style={styles.detailsText}>1008</Text>
            </View>
          </View>
          <Text style={styles.noteText}>
            <Text style={styles.note}>Note:</Text> Please send amount from your
            own bank account with same title as of your AZ-Pay account name
          </Text>
          <TouchableOpacity style={styles.button} onPressIn={handleConfirm}>
            <Image
              source={require('../../../Assets/Slicing/DepositWithdraw/ConfirmBtn.png')}
              style={styles.confirmButton}
            />
          </TouchableOpacity>
          <Text style={styles.confirmText}>Confirm when you sent amount</Text>
        </>
      )}
    </Custom_BG>
  );
};

export default ConfirmDeposit;

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    color: 'black',
    textAlign: 'center',
    fontFamily: 'Poppins Regular',
    marginHorizontal: '20%',
    marginTop: '5%',
    //fontWeight: 'bold',
  },
  bold: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  accountDetailContainer: {
    width: '90%',
    height: 190,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: 'black',
    alignSelf: 'center',
    marginTop: '5%',
    flexDirection: 'row',
  },
  detailsView: {
    width: '47%',
    marginLeft: '2%',
  },
  detailsText: {
    fontSize: 16,
    color: 'black',
    fontFamily: 'Poppins Regular',
    marginLeft: '5%',
    marginTop: '10%',
    //fontWeight: 'bold',
  },
  accountNumberText: {
    fontSize: 13,
    color: 'black',
    fontFamily: 'Poppins Regular',
    marginLeft: '5%',
    marginTop: '10%',
    fontWeight: 'bold',
  },
  copyIcon: {
    width: 20,
    height: 17,
    alignItems: 'center',
    paddingTop: 2.5,
  },
  note: {
    fontWeight: 'bold',
    fontSize: 15,
  },
  noteText: {
    fontSize: 13,
    color: 'black',
    fontFamily: 'Poppins Regular',
    marginHorizontal: '2%',
    alignSelf: 'center',
    marginTop: '2%',
  },
  button: {
    marginTop: '37%',
    alignSelf: 'center',
  },
  confirmButton: {
    width: 190,
    height: 50,
    borderRadius: 8,
  },
  confirmText: {
    fontSize: 13,
    color: 'black',
    fontFamily: 'Poppins Regular',
    alignSelf: 'center',
    marginTop: '2%',
  },
  reqSubmitedImageView: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    marginTop: '-20%',
  },
  reqSubmitedImage: {
    width: 340,
    height: 175,
  },
});
