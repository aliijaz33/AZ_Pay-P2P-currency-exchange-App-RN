import {
  StyleSheet,
  Text,
  View,
  Alert,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from 'react-native';
import React, {useState, useContext} from 'react';
import Custom_BG from '../../../Custom_Components/Custom_BG';
import useRefreshUser from '../../../useRefreshUser';
import UserContext from '../../../UserContext';

const ConfirmWithdraw = ({navigation, route}) => {
  const [confirm, setConfirm] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const refreshUser = useRefreshUser();
  const {user} = useContext(UserContext);

  const {details} = route.params;

  const handleConfirm = async () => {
    setShowLoader(true);
    try {
      const response = await fetch('http://10.0.2.2:4200/withdraw', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          bankName: details.bankDetail.bankName,
          accountTitle: details.bankDetail.accountTitle,
          accountNumber: details.bankDetail.accountNumber,
          amount: details.amount,
          userId: user._id,
          brandCode: details.bankDetail.branchCode,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        setTimeout(() => {
          setShowLoader(false);
          setConfirm(true);
          refreshUser();
        }, 1000);
      } else {
        setShowLoader(false);
        setConfirm(false);
        Alert.alert('Error', data.message);
      }
    } catch (error) {
      console.error('Error submitting withdrawal:', error);
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
            source={require('../../../Assets/Slicing/DepositWithdraw/RequestSubmit.png')}
            style={styles.reqSubmitedImage}
          />
        </View>
      ) : (
        <>
          <Text style={styles.text}>Withdraw Details</Text>
          <View style={styles.container}>
            <View style={styles.accountDetailContainer}>
              <View style={styles.detailsView}>
                <Text style={styles.detailsText}>Bank Name</Text>
                <Text style={styles.detailsText}>Account Title</Text>
                <Text style={styles.detailsText}>Account Number</Text>
              </View>
              <View style={styles.detailsView}>
                <Text style={styles.detailsText}>
                  {details.bankDetail.bankName}
                </Text>
                <Text style={styles.detailsText}>
                  {details.bankDetail.accountTitle}
                </Text>
                <Text style={styles.accountNumberText}>
                  {details.bankDetail.accountNumber}
                </Text>
              </View>
            </View>
            <Text style={styles.amountWithdrawText}>Amount Withdraw</Text>
            <View style={{flexDirection: 'row', alignSelf: 'center'}}>
              <Text style={styles.amountText}>{details.amount}</Text>
              <Text style={styles.currencyIconText}>AZ-Pkr</Text>
            </View>
          </View>
          <TouchableOpacity
            //disabled={!isEnabled}
            style={styles.button}
            onPressIn={handleConfirm}>
            <Image
              source={require('../../../Assets/Slicing/DepositWithdraw/ConfirmBtn.png')}
              style={styles.confirmButton}
            />
          </TouchableOpacity>
        </>
      )}
    </Custom_BG>
  );
};

export default ConfirmWithdraw;

const styles = StyleSheet.create({
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
  text: {
    fontSize: 21,
    color: 'black',
    textAlign: 'center',
    fontFamily: 'Poppins Regular',
    marginTop: '5%',
    fontWeight: 'bold',
  },
  container: {
    width: '90%',
    //height: 190,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: 'black',
    alignSelf: 'center',
    marginTop: '10%',
    backgroundColor: 'white',
  },
  accountDetailContainer: {
    flexDirection: 'row',
  },
  detailsView: {
    width: '49%',
    marginLeft: '2%',
  },
  detailsText: {
    fontSize: 16.5,
    color: 'black',
    fontFamily: 'Poppins Regular',
    marginLeft: '3%',
    marginTop: '10%',
    //fontWeight: 'bold',
  },
  accountNumberText: {
    fontSize: 15,
    color: 'black',
    fontFamily: 'Poppins Regular',
    marginLeft: '5%',
    marginTop: '10%',
    fontWeight: 'bold',
  },
  amountWithdrawText: {
    fontSize: 25,
    color: 'black',
    textAlign: 'center',
    fontFamily: 'Poppins Regular',
    marginTop: '7%',
  },
  amountText: {
    fontSize: 35,
    color: 'black',
    textAlign: 'center',
    fontFamily: 'Poppins Regular',
    marginTop: '2%',
    marginLeft: '7%',
    fontWeight: 'bold',
  },
  currencyIconText: {
    fontSize: 14.5,
    color: 'black',
    textAlign: 'center',
    fontFamily: 'Poppins Regular',
    marginTop: '7.5%',
    marginLeft: '1.5%',
    marginBottom: '5%',
  },
  button: {
    marginTop: '28%',
    alignSelf: 'center',
  },
  confirmButton: {
    width: 190,
    height: 50,
    borderRadius: 8,
    //tintColor: 'black',
  },
});
