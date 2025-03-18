import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
  ImageBackground,
  Alert,
} from 'react-native';
import CustomInput from '../Custom_Components/CustomInput';
import {CheckBox} from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Signup = ({navigation}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [checked, setChecked] = useState(false);

  const balance = 0;
  const currencies = [];
  const traderProfile = {};

  const validateName = name => {
    const namePattern = /^[a-zA-Z ]{3,25}$/;
    return namePattern.test(name);
  };

  const validateEmail = email => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const validatePassword = password => {
    const passwordPattern =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{8,}$/;
    return passwordPattern.test(password);
  };

  const postData = async () => {
    const userData = {name, email, password};
    try {
      let response = await fetch('http://10.0.2.2:4200/signup', {
        method: 'POST',
        body: JSON.stringify(userData),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to post data');
      }

      let result = await response.json();
      setName('');
      setEmail('');
      setPassword('');
      setConfirmPassword();
      setChecked(false);
      console.log(result);
      Alert.alert(
        'Registration Success!',
        'You are registered successfully, Go back to login',
      );
    } catch (error) {
      console.error('Error posting data:', error);
    }
  };

  const handleSignup = async () => {
    if (
      name === '' ||
      email === '' ||
      password === '' ||
      confirmPassword === ''
    ) {
      Alert.alert('Attention!', 'Please Enter Your Details');
      return;
    }
    if (!validateName(name)) {
      Alert.alert(
        'Invalid Name',
        'Please enter a valid name (3-25 characters, letters and spaces only).',
      );
      return;
    }
    if (!validateEmail(email)) {
      Alert.alert('Invalid Email', 'Please enter a valid email address.');
      return;
    }
    if (!validatePassword(password)) {
      Alert.alert(
        'Invalid Password',
        'Please enter a valid password (minimum 8 characters with at least one special character, one number, one uppercase and one lowercase letter).',
      );
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Attention!', "Your Password doesn't match");
      return;
    }

    try {
      let response = await fetch('http://10.0.2.2:4200/login');
      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }
      let userData = await response.json();
      let users = userData.users;
      console.log('signupdata--->>', users);

      const user = users.find(user => user.email === email);
      if (user) {
        Alert.alert('Attention!', 'User is already registered');
      } else {
        await postData();
      }
    } catch (error) {
      console.error('Error in signup process:', error);
      Alert.alert(
        'Error',
        'An error occurred during signup. Please try again.',
      );
    }
  };

  // const handleSignup = async () => {
  //   if (name == '' && email == '' && password == '' && confirmPassword == '') {
  //     Alert.alert('Attention!', 'Please Enter Your Details');
  //   } else {
  //     if (name == '') {
  //       Alert.alert('Attention!', 'Please Enter Your Name');
  //     }
  //     if (!validateName(name)) {
  //       Alert.alert(
  //         'Invalid Name',
  //         'Please enter a valid name (3-25 characters, letters and spaces only).',
  //       );
  //       return;
  //     } else if (email == '') {
  //       Alert.alert('Attention!', 'Please Enter Your Email');
  //       return;
  //     } else if (!validateEmail(email)) {
  //       Alert.alert('Invalid Email', 'Please enter a valid email address.');
  //       return;
  //     } else if (password == '') {
  //       Alert.alert('Attention!', 'Please Enter Password');
  //       return;
  //     } else if (!validatePassword(password)) {
  //       Alert.alert(
  //         'Invalid Password',
  //         'Please enter a valid password (minimum 8 characters with at least one special character, one number, one uppercase and one lowercase letter).',
  //       );
  //     } else if (confirmPassword == '') {
  //       Alert.alert('Attention!', 'Please Retype your Password');
  //     } else if (password !== confirmPassword) {
  //       Alert.alert('Attention!', `Your Password doesn't match`);
  //     } else {
  //       let response = await fetch('http://10.0.2.2:4200/login');
  //       if (!response.ok) {
  //         throw new Error('Failed to fetch user data');
  //       }
  //       let userData = await response.json();
  //       const user = userData.find(user => user.email === email);
  //       if (user) {
  //         Alert.alert('Attention!', 'User is already registered');
  //       } else {
  //         await postData();
  //         Alert.alert(
  //           'Registration Success!',
  //           'You are registered successfuly, Go back to login',
  //         );
  //       }
  //     }
  //   }
  // };
  return (
    <ImageBackground
      source={require('../Assets/Slicing/SplashScreen/SplashScreenBg.png')}
      style={styles.backgroundImage}>
      <ScrollView contentContainerStyle={styles.container}>
        <Image
          source={require('../Assets/Slicing/SignUp/WelcomeText.png')}
          style={styles.welcomeLogo}
        />
        <CustomInput
          label={'Full Name'}
          onChangeText={text => setName(text)}
          placeholder="Enter your Full Name"
          value={name}
        />
        <CustomInput
          label={'Email'}
          onChangeText={text => setEmail(text)}
          placeholder="Enter your Email"
          value={email}
        />
        <CustomInput
          label={'Password'}
          onChangeText={text => setPassword(text)}
          placeholder="Enter your Password"
          value={password}
          secureTextEntry
        />
        <CustomInput
          label={'Confirm Password'}
          onChangeText={text => setConfirmPassword(text)}
          placeholder="Retype your Password"
          value={confirmPassword}
          secureTextEntry
        />
        <View style={styles.checkBoxView}>
          <CheckBox
            uncheckedIcon={
              <Image
                source={require('../Assets/Slicing/SignUp/TickBox.png')}
                style={styles.tick}
              />
            }
            checkedIcon={
              <Image
                source={require('../Assets/Slicing/SignUp/Tick.png')}
                style={styles.tick}
              />
            }
            checked={checked}
            onPress={() => setChecked(!checked)}
          />
          <Text style={styles.checkBoxText}>I agree to the </Text>
          <TouchableOpacity style={styles.trems}>
            <Text style={styles.checkBoxTermText}>Terms and Conditions</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.signUpButton}
          disabled={!checked}
          onPress={handleSignup}>
          <Image
            source={require('../Assets/Slicing/SignUp/SignUpBtnEnable.png')}
            style={[
              styles.signUpImage,
              checked ? styles.enableButton : styles.disableButton,
            ]}
          />
        </TouchableOpacity>
        <View style={styles.backLoginView}>
          <TouchableOpacity
            style={styles.backLoginNavigationButton}
            onPress={() => {
              navigation.navigate('Login');
            }}>
            <Image
              source={require('../Assets/Slicing/SignUp/BackBtn.png')}
              style={styles.backLoginImage}
            />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    paddingTop: '5%',
    paddingBottom: 10,
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
  },
  welcomeLogo: {
    height: 70,
    width: 250,
    marginTop: '22%',
    marginBottom: '3%',
  },
  checkBoxView: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    marginLeft: '-4%',
    marginTop: '1.5%',
  },
  tick: {
    width: 20,
    height: 20,
  },
  checkBoxText: {
    color: 'black',
    fontSize: 14,
    fontFamily: 'Poppins Regular',
    marginTop: '4%',
    marginLeft: '-2%',
  },
  trems: {
    marginTop: '3.7%',
  },
  checkBoxTermText: {
    color: 'black',
    fontSize: 15,
    fontFamily: 'Poppins Regular',
    textDecorationLine: 'underline',
  },
  signUpButton: {
    width: '72%',
    alignItems: 'center',
  },
  enableButton: {
    opacity: 1,
  },
  disableButton: {
    opacity: 0.5,
  },
  signUpImage: {
    width: '100%',
    height: 41,
    borderRadius: 10,
    marginTop: 10,
  },
  backLoginView: {
    width: '100%',
    marginTop: '4%',
  },
  backLoginNavigationButton: {
    width: '16%',
  },
  backLoginImage: {
    width: '100%',
    height: 38,
  },
});

export default Signup;
