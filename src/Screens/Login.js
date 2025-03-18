import React, {useState, useContext} from 'react';
import {
  StyleSheet,
  Alert,
  Text,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
  ImageBackground,
} from 'react-native';
import CustomInput from '../Custom_Components/CustomInput';
import AsyncStorage from '@react-native-async-storage/async-storage';
import UserContext from '../UserContext';

const Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {setUser} = useContext(UserContext);

  const handleLogin = async () => {
    //navigation.navigate('MainDrawer');
    const validateEmail = email => {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailPattern.test(email);
    };
    if (email === '' && password === '') {
      Alert.alert('Attention!', 'Please Enter Email and Password');
    } else {
      if (email === '') {
        Alert.alert('Attention!', 'Please Enter Email');
      } else if (!validateEmail(email)) {
        Alert.alert('Invalid Email', 'Please enter a valid email address.');
      } else if (password === '') {
        Alert.alert('Attention!', 'Please Enter Password');
      } else {
        try {
          let response = await fetch('http://10.0.2.2:4200/login');
          if (!response.ok) {
            throw new Error('Failed to fetch user data');
          }
          let data = await response.json();
          const {users, currencies} = data;

          const user = users.find(user => user.email === email);

          if (!user) {
            Alert.alert('Attention!', 'User not registered');
          } else if (user.password !== password) {
            Alert.alert('Attention!', 'Your Password is incorrect');
          } else {
            await AsyncStorage.setItem('loginToken', 'loggedIn');
            await AsyncStorage.setItem('user', user.email);

            setUser(user);
            navigation.replace('MainDrawer');
          }
        } catch (error) {
          console.error('Error retrieving user data:', error);
          Alert.alert('Error', 'Failed to login. Please try again later.');
        }
      }
    }
  };

  return (
    <ImageBackground
      source={require('../Assets/Slicing/SplashScreen/SplashScreenBg.png')}
      style={styles.backgroundImage}>
      <ScrollView contentContainerStyle={styles.container}>
        <Image
          source={require('../Assets/Slicing/Logo/Logo4.png')}
          style={styles.logo}
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
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Image
            source={require('../Assets/Slicing/Login/LoginBtn.png')}
            style={styles.loginImage}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.forgot}>
          <Text style={styles.forgotText}>Forgot Password?</Text>
        </TouchableOpacity>
        {/* <View style={styles.googleLoginView}>
          <Image
            source={require('../Assets/LoginSignup/Side_Line.png')}
            style={styles.sideLineImage}
          />
          <TouchableOpacity style={styles.googleLogo}>
            <Image
              source={require('../Assets/LoginSignup/Google_Logo.png')}
              style={styles.googleLogoImage}
            />
          </TouchableOpacity>
          <Text style={styles.textOR}>OR</Text>
          <TouchableOpacity style={styles.appleLogo}>
            <Image
              source={require('../Assets/LoginSignup/Apple_Logo.png')}
              style={styles.appleLogoImage}
            />
          </TouchableOpacity>
          <Image
            source={require('../Assets/LoginSignup/Side_Line.png')}
            style={styles.sideLineImage}
          />
        </View> */}
        <View style={styles.signupView}>
          <Text style={styles.dontHaveAccount}>Haven't account?</Text>
          <TouchableOpacity
            style={styles.signupNavigationButton}
            onPress={() => {
              navigation.navigate('Signup');
            }}>
            <Image
              source={require('../Assets/Slicing/Login/SignUpBtn.png')}
              style={styles.signupImage}
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
  logo: {
    height: 120,
    width: 165,
    marginTop: '20%',
    marginBottom: 10,
  },
  loginButton: {
    width: '34%',
    alignItems: 'center',
    marginTop: '8%',
  },
  loginImage: {
    width: '100%',
    height: 41,
    borderRadius: 10,
    marginTop: 20,
  },
  forgot: {
    marginTop: 10,
    marginLeft: 3,
    marginBottom: 3,
  },
  forgotText: {
    fontSize: 16,
    color: 'black',
    fontFamily: 'Poppins Regular',
  },
  googleLoginView: {
    flexDirection: 'row',
    padding: '3%',
  },
  sideLineImage: {
    width: '30%',
    height: '2.5%',
    marginTop: '5%',
    marginHorizontal: 4,
    tintColor: 'black',
  },
  googleLogo: {
    margin: '1%',
    width: 35,
    height: 35,
  },
  googleLogoImage: {
    width: '100%',
    height: '100%',
  },
  textOR: {
    margin: '2%',
    fontSize: 20,
    color: 'black',
    fontFamily: 'Poppins Regular',
  },
  appleLogo: {
    width: 43,
    height: 40,
  },
  appleLogoImage: {
    width: '100%',
    height: '100%',
  },
  signupView: {
    width: '100%',
    marginTop: '2%',
    alignItems: 'flex-start',
  },
  dontHaveAccount: {
    fontSize: 13,
    color: 'black',
    fontFamily: 'Poppins Regular',
  },
  signupNavigationButton: {
    width: '28%',
  },
  signupImage: {
    width: '100%',
    height: 35,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
  },
});

export default Login;
