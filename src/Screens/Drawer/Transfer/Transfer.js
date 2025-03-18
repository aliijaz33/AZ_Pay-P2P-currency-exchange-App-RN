import {
  Image,
  ImageBackground,
  ScrollView,
  Share,
  Alert,
  StyleSheet,
  KeyboardAvoidingView,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';
import React, {useState, useContext, useEffect} from 'react';
import TransferInput from '../../../Custom_Components/TransferInput';
import CustomDropdown from '../../../Custom_Components/CustomDropdown';
import AwesomeAlert from 'react-native-awesome-alerts';
import {useIsFocused} from '@react-navigation/native';
import UserContext from '../../../UserContext';
import useRefreshUser from '../../../useRefreshUser';
import Clipboard from '@react-native-community/clipboard';

const Transfer = () => {
  const {user} = useContext(UserContext);
  const refreshUser = useRefreshUser();

  const [inputVisible, setInputVisible] = useState(false);
  const [sendView, setSendView] = useState(false);
  const [receiveView, setReceiveView] = useState(false);
  const [currencySymbol, setCurrencySymbol] = useState('');
  const [address, setAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [balance, setBalance] = useState();
  const [showAlert, setShowAlert] = useState(false);
  const [indicator, setIndicator] = useState(false);

  const adrs = user.address;

  const isFocused = useIsFocused();
  const copyToClipboard = () => {
    if (adrs) {
      refreshUser();
      Clipboard.setString(adrs);
      Alert.alert('Success', 'Address Copied to clipboard');
    } else {
      Alert.alert('Error', 'Failed to copy address');
    }
  };
  useEffect(() => {
    if (!isFocused) {
      resetForm();
    }
    refreshUser();
  }, [isFocused]);

  const resetForm = () => {
    setCurrencySymbol('');
    setAddress('');
    setAmount('');
    setReceiveView(false);
    setSendView(false);
    setInputVisible(false);
    setBalance();
    refreshUser();
  };

  const handleSend = () => {
    if (currencySymbol === '') {
      Alert.alert('Attention!', 'Please Select a Currency');
    } else if (address === '') {
      Alert.alert('Attention!', 'Please enter the recipient Address');
    } else if (amount === '') {
      Alert.alert('Attention!', 'Please enter the amount to be transferred');
    } else if (parseFloat(amount) > balance) {
      Alert.alert(
        'Attention!',
        'Insufficient balance for the selected currency',
      );
    } else if (parseFloat(amount) < 0.5) {
      Alert.alert('Attention!', 'Your Entered amount is less than 0.5');
    } else {
      refreshUser();
      setShowAlert(true);
    }
  };

  const cancelPressed = () => {
    setCurrencySymbol('');
    setShowAlert(false);
    setAddress('');
    setAmount('');
  };

  const confirmPressed = async () => {
    setIndicator(true);
    try {
      const response = await fetch('http://10.0.2.2:4200/transfer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          currency: currencySymbol,
          recipientAddress: address,
          senderAddress: adrs,
          amount: parseFloat(amount),
        }),
      });

      const data = await response.json();
      if (response.ok) {
        refreshUser();
        setShowAlert(false);

        setTimeout(() => {
          setIndicator(false);
          resetForm();
          setShowAlert(false);
          Alert.alert('Transfer', 'Success!');
        }, 300);
      } else {
        setIndicator(false);
        setShowAlert(false);
        Alert.alert(
          'Error',
          data.message || 'Failed to transfer currency. May user not found',
        );
      }
    } catch (error) {
      console.error('Error transferring currency:', error);
      setIndicator(false);
      setShowAlert(false);
      Alert.alert(
        'Error',
        'Failed to transfer currency. Please try again later.',
      );
    } finally {
      setIndicator(false);
    }
  };

  const handleValueChange = (currency, balance) => {
    setCurrencySymbol(currency);
    setBalance(balance);
    refreshUser();
    console.log('Selected Trasfer Currency:', currencySymbol);
  };
  const Send = () => {
    setInputVisible(true);
    setSendView(true);
    setReceiveView(false);
    refreshUser();
  };
  const Receive = () => {
    setInputVisible(true);
    setSendView(false);
    setReceiveView(true);
    refreshUser();
  };
  const onShare = async () => {
    try {
      const result = await Share.share({
        message: adrs,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      Alert.alert(error.message);
    }
  };
  const closeInput = () => {
    setInputVisible(false);
    setSendView(false);
    setReceiveView(false);
    setCurrencySymbol('');
    setShowAlert(false);
    setAddress('');
    setAmount('');
    refreshUser();
  };

  return (
    <View style={{flex: 1}}>
      <ImageBackground
        source={require('../../../Assets/Slicing/MainBackground.png')}
        style={styles.backgroundImage}
        resizeMode="cover">
        <View style={styles.container}>
          <TouchableOpacity onPress={() => Send()} style={styles.button}>
            <Image
              source={require('../../../Assets/Slicing/Transfer/SendBtn.png')}
              style={[
                styles.disableSend,
                sendView ? styles.enableSend : styles.disableSend,
              ]}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Receive()} style={styles.button}>
            <Image
              source={require('../../../Assets/Slicing/Transfer/ReceiveBtn.png')}
              style={[
                styles.disableSend,
                receiveView ? styles.enableSend : styles.disableSend,
              ]}
            />
          </TouchableOpacity>
        </View>
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
          showProgress={indicator}
          progressSize={40}
          progressColor="black"
          closeOnTouchOutside={false}
          closeOnHardwareBackPress={false}
          customView={
            <View style={styles.alertView}>
              <Text style={styles.alertText}>Do You want to Transfer</Text>
              <Text style={styles.alertConversionText}>
                {amount}{' '}
                <Text style={{fontWeight: 'bold', fontSize: 15}}>
                  {currencySymbol}
                </Text>
              </Text>
              <Text style={styles.alertConversionText}>to</Text>
              <Text style={styles.alertConversionText}>{address}</Text>
            </View>
          }
        />

        {inputVisible && sendView && (
          <KeyboardAvoidingView style={styles.keyboardAvoidingView}>
            <ScrollView contentContainerStyle={styles.inputView}>
              <TouchableOpacity
                onPress={closeInput}
                style={styles.closeInputArrow}>
                <Image
                  source={require('../../../Assets/Transfer/CloseArrow.png')}
                  style={styles.closeImage}
                />
              </TouchableOpacity>
              <Text style={styles.sendCurrencyText}>Send Currency</Text>

              <Text style={styles.label}>Currency</Text>
              <CustomDropdown
                onValueChange={handleValueChange}
                balance={balance}
              />
              <TransferInput
                label="Address"
                placeholder="Long Press to Paste"
                value={address}
                onChangeText={text => setAddress(text)}
              />
              <TransferInput
                label="Sending Amount"
                placeholder="Minimum 0.5"
                value={amount}
                onChangeText={text => setAmount(text)}
                currencySymbol={currencySymbol}
                numeric="numeric"
              />

              <View style={styles.availableView}>
                <Text style={styles.availableText}>Available</Text>
                <Text style={styles.balanceText}>
                  {balance} {currencySymbol}
                </Text>
              </View>
              <TouchableOpacity onPress={handleSend} style={styles.sendButton}>
                <Image
                  source={require('../../../Assets/Slicing/Transfer/SendBtn2.png')}
                  style={styles.sendButtonImage}
                />
              </TouchableOpacity>
            </ScrollView>
          </KeyboardAvoidingView>
        )}

        {inputVisible && receiveView && (
          <KeyboardAvoidingView
            style={[styles.keyboardAvoidingView, {marginTop: '40%'}]}>
            <ScrollView contentContainerStyle={styles.inputView}>
              <TouchableOpacity
                onPress={closeInput}
                style={styles.closeInputArrow}>
                <Image
                  source={require('../../../Assets/Transfer/CloseArrow.png')}
                  style={styles.closeImage}
                />
              </TouchableOpacity>
              <Text style={styles.sendCurrencyText}>Your AZ address</Text>

              <Text style={styles.address}>{adrs}</Text>
              <View style={styles.copyView}>
                <TouchableOpacity onPress={copyToClipboard} style={styles.copy}>
                  <Image
                    source={require('../../../Assets/Transfer/CopyButton.png')}
                    style={styles.copyButton}
                  />
                  <Text style={styles.copyText}>Copy</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={onShare} style={styles.copy}>
                  <Image
                    source={require('../../../Assets/Transfer/ShareButton.png')}
                    style={styles.copyButton}
                  />
                  <Text style={styles.copyText}>Share</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        )}
      </ImageBackground>
    </View>
  );
};

export default Transfer;

const styles = StyleSheet.create({
  backgroundImage: {
    width: '100%',
    height: '100%',
  },
  container: {
    marginTop: '17%',
  },
  button: {
    width: '63%',
    alignSelf: 'center',
  },
  disableSend: {
    width: 253,
    height: 65,
    alignSelf: 'center',
    marginTop: '6%',
  },
  enableSend: {
    borderWidth: 3,
    borderColor: 'black',
    borderRadius: 15,
  },
  keyboardAvoidingView: {
    flex: 1,
    marginTop: '15%',
  },
  inputView: {
    flexGrow: 1,
    backgroundColor: 'rgba(0,0,0,0.83)',
    padding: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    width: '100%',
  },
  closeInputArrow: {
    alignSelf: 'center',
  },
  closeImage: {
    width: 25,
    height: 13,
    tintColor: 'white',
  },
  sendCurrencyText: {
    color: 'white',
    fontSize: 25,
    fontFamily: 'Poppins Regular',
    alignSelf: 'center',
    marginTop: '3%',
    fontWeight: 'bold',
  },
  label: {
    marginTop: 10,
    marginBottom: 5,
    marginLeft: '5%',
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
    fontFamily: 'Poppins Regular',
  },
  availableView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: '4.5%',
    marginBottom: '10%',
  },
  availableText: {
    fontSize: 13,
    fontWeight: '400',
    color: 'white',
    fontFamily: 'Poppins Regular',
  },
  balanceText: {
    color: 'white',
    fontFamily: 'Poppins Regular',
    fontSize: 13,
  },
  sendButton: {
    margin: '3%',
    marginBottom: '8%',
    alignSelf: 'flex-end',
  },
  sendButtonImage: {
    width: 120,
    height: 40.5,
  },
  address: {
    color: 'white',
    //fontWeight: 'bold',
    fontFamily: 'Poppins Regular',
    fontSize: 15,
    marginHorizontal: '10%',
    marginVertical: '8%',
    textAlign: 'center',
  },
  copyView: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
  copy: {
    marginHorizontal: '9%',
    marginTop: '5%',
  },
  copyButton: {
    width: 50,
    height: 50,
    tintColor: 'white',
  },
  copyText: {
    color: 'white',
    fontFamily: 'Poppins Regular',
    fontSize: 15,
    margin: 3,
  },

  contentContainerStyle: {
    width: '100%',
    paddingHorizontal: 1,
    paddingVertical: 20,
  },
  alertView: {
    alignItems: 'center',
  },
  alertText: {
    color: 'black',
    fontFamily: 'Poppins Regular',
    fontSize: 22,
    marginBottom: 10,
  },
  alertConversionText: {
    color: 'black',
    fontFamily: 'Poppins Regular',
    fontSize: 17,
    textAlign: 'center',
  },
});

{
  /* <TouchableOpacity onPress={toggleSendReceive} style={{ alignSelf: 'flex-end', marginBottom: 10 }}>
          <Text>{isSendView ? 'Receive' : 'Send'}</Text>
        </TouchableOpacity> */
}
