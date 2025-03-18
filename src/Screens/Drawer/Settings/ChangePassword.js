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

const ChangePassword = () => {
  const {user} = useContext(UserContext);
  const refreshUser = useRefreshUser();
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [indicator, setIndicator] = useState(false);

  const validatePassword = password => {
    const passwordPattern =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{8,}$/;
    return passwordPattern.test(password);
  };
  const handleConfirmPress = async () => {
    setIndicator(true);
    if (newPassword === '' || oldPassword === '' || confirmNewPassword === '') {
      Alert.alert('Attention!', 'Please fill all fields first');
      return;
    }
    if (oldPassword !== user.password) {
      Alert.alert('Attention', 'Your old password is incorrect');
      return;
    }
    if (!validatePassword(newPassword)) {
      Alert.alert(
        'Invalid Password format',
        'Please enter a valid password (minimum 8 characters with at least one special character, one number, one uppercase and one lowercase letter).',
      );
      return;
    }
    if (newPassword === user.password) {
      Alert.alert(
        'Attention!',
        'Your new Password should not match with old password',
      );
      return;
    }
    if (newPassword !== confirmNewPassword) {
      Alert.alert('Attention!', "Your Password doesn't match");
      return;
    }

    try {
      const response = await axios.post('http://10.0.2.2:4200/changePassword', {
        email: user.email,
        newPassword: newPassword,
      });

      if (response.status === 200) {
        refreshUser();
        setOldPassword('');
        setNewPassword('');
        setConfirmNewPassword('');
        setIndicator(false);
        Alert.alert('Success', 'Your Password has been changed successfully');
      } else {
        setIndicator(false);
        Alert.alert('Error', 'Failed to change your password');
      }
    } catch (error) {
      setIndicator(false);
      console.error('Error changing password:', error);
      Alert.alert('Error', 'An error occurred while changing your password');
    }
  };

  return (
    <Custom_BG>
      <View style={styles.container}>
        {indicator ? <ActivityIndicator size={40} color="black" /> : null}
        <Text style={styles.inputTitle}>Old Password</Text>
        <TextInput
          style={styles.input}
          value={oldPassword}
          placeholder="Enter Old Password"
          onChangeText={text => setOldPassword(text)}
        />
        <Text style={styles.inputTitle}>New Password</Text>
        <TextInput
          style={styles.input}
          value={newPassword}
          placeholder="Enter New Password"
          onChangeText={text => setNewPassword(text)}
        />
        <Text style={styles.inputTitle}>Confirm New Password</Text>
        <TextInput
          style={styles.input}
          value={confirmNewPassword}
          placeholder="Enter New Password Again"
          onChangeText={text => setConfirmNewPassword(text)}
        />
        <Text style={styles.noteText}>
          Note: Please make sure your password should not matched with old
          password and new password should be minimum 8 chracters long and
          should contains atleast 1 upper case and 1 lower case letter, one
          numeric and one special chracter.
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

export default ChangePassword;

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
    width: '100%',
    height: 45,
    borderColor: 'rgba(0,0,0,0.7)',
    borderWidth: 1,
    borderRadius: 7,
    marginBottom: '2%',
    paddingLeft: 10,
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
});
