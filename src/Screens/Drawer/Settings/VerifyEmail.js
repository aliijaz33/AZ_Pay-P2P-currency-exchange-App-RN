import {
  StyleSheet,
  TextInput,
  Image,
  Text,
  View,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import React, {useContext, useState} from 'react';
import Custom_BG from '../../../Custom_Components/Custom_BG';
import UserContext from '../../../UserContext';
import useRefreshUser from '../../../useRefreshUser';
import axios from 'axios';

const VerifyEmail = () => {
  const {user} = useContext(UserContext);
  const refreshUser = useRefreshUser();
  const [code, setCode] = useState('');
  const [indicator, setIndicator] = useState(false);

  const handleSendPress = async () => {
    if (user.emailVerified) {
      Alert.alert('Attention!', 'Your email is already verified');
      return;
    }
    setIndicator(true);
    try {
      const response = await axios.post(
        'http://10.0.2.2:4200/sendVerificationCode',
        {
          email: user.email,
        },
      );

      if (response.status === 200) {
        setIndicator(false);
        Alert.alert('Success', 'Verification code sent to your email');
      } else {
        setIndicator(false);
        Alert.alert('Error', 'Failed to send verification code');
      }
    } catch (error) {
      setIndicator(false);
      console.error('Error sending verification code:', error);
      Alert.alert('Error', 'An error occurred while sending verification code');
    }
  };
  const handleConfirmPress = async () => {
    if (user.emailVerified) {
      Alert.alert('Attention!', 'Your email is already verified');
      return;
    }
    if (code === '') {
      Alert.alert('Attention!', 'Please fill in first');
      return;
    }

    setIndicator(true);
    try {
      const response = await axios.post('http://10.0.2.2:4200/verifyEmail', {
        email: user.email,
        code: code,
      });

      if (response.status === 200) {
        setIndicator(false);
        setCode('');
        refreshUser();
        Alert.alert('Success', 'Your email has been verified');
      } else {
        setIndicator(false);
        Alert.alert('Error', 'Failed to verify email');
      }
    } catch (error) {
      setIndicator(false);
      console.error('Error verifying email:', error);
      Alert.alert('Error', 'An error occurred while verifying your email');
    }
  };
  return (
    <Custom_BG>
      <View style={styles.container}>
        {indicator ? <ActivityIndicator size={40} color="black" /> : null}
        <Text style={styles.inputTitle}>Your Email: {user.email}</Text>
        <Text style={styles.inputTitle}>Code</Text>
        <View style={{flexDirection: 'row'}}>
          <TextInput
            style={styles.input}
            value={code}
            placeholder="Enter Code"
            onChangeText={text => setCode(text)}
          />
          <TouchableOpacity style={styles.sendButton} onPress={handleSendPress}>
            <Text style={styles.sendButtonText}>Send</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.noteText}>
          Note: Press send button to get code on your above mentioned email and
          paste this code here to verify your email.
        </Text>
        <TouchableOpacity
          style={{marginTop: '15%'}}
          onPress={handleConfirmPress}>
          <Image
            source={require('../../../Assets/Slicing/Settings/ConfirmEnableBtn.png')}
            style={styles.confirmButton}
          />
        </TouchableOpacity>
      </View>
    </Custom_BG>
  );
};

export default VerifyEmail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: '3%',
  },
  oldNameText: {
    color: 'black',
    fontSize: 20,
    marginTop: '3%',
    alignSelf: 'flex-start',
    marginLeft: '2%',
    //fontWeight: 'bold',
    fontFamily: 'Poppins Regular',
  },
  input: {
    width: '83%',
    height: 45,
    borderColor: 'rgba(0,0,0,0.7)',
    borderWidth: 1,
    borderRadius: 7,
    marginBottom: '2%',
    paddingLeft: 10,
    marginRight: '2%',
  },
  inputTitle: {
    fontSize: 16,
    color: 'black',
    marginTop: '5%',
    fontFamily: 'Poppins Regular',
  },
  noteText: {
    fontSize: 14,
    color: 'black',
    marginTop: '3%',
    fontFamily: 'Poppins Regular',
  },
  confirmButton: {
    width: '100%',
    height: 50,
  },
  sendButton: {
    height: 45,
    width: '15%',
    borderColor: 'rgba(0,0,0,0.7)',
    borderWidth: 1,
    borderRadius: 7,
    marginBottom: '2%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
  },
  sendButtonText: {
    fontSize: 16,
    color: 'white',
    fontFamily: 'Poppins Regular',
  },
});
