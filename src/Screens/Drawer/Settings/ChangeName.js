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

const ChangeName = () => {
  const {user} = useContext(UserContext);
  const refreshUser = useRefreshUser();
  const [newName, setName] = useState('');
  const [indicator, setIndicator] = useState(false);

  const handleConfirmPress = async () => {
    setIndicator(true);
    if (newName === user.name) {
      Alert.alert('Error', "Same name can't be replaced");
      return;
    }
    try {
      const response = await axios.post('http://10.0.2.2:4200/changeName', {
        email: user.email,
        newName: newName,
      });

      if (response.status === 200) {
        setIndicator(false);
        refreshUser();
        setName('');
        Alert.alert('Success', 'Your name has been changed successfully');
      } else {
        setIndicator(false);
        Alert.alert('Error', 'Failed to change your name');
      }
    } catch (error) {
      setIndicator(false);
      console.error('Error changing name:', error);
      Alert.alert('Error', 'An error occurred while changing your name');
    }
  };
  return (
    <Custom_BG>
      <View style={styles.container}>
        {indicator ? <ActivityIndicator size={40} color="black" /> : null}

        <Text style={styles.oldNameText}>
          Old Name: <Text style={{fontSize: 18}}>{user.name}</Text>
        </Text>
        <Text style={styles.inputTitle}>New Name</Text>
        <TextInput
          style={styles.input}
          value={newName}
          placeholder="Enter new name"
          onChangeText={text => setName(text)}
        />
        <Text style={styles.noteText}>
          Note: Please make sure your name should always be your original
          name(name on your ID Card)
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

export default ChangeName;

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
