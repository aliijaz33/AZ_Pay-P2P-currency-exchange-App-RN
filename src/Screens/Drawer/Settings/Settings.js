import {
  StyleSheet,
  Image,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import React, {useContext, useEffect} from 'react';
import UserContext from '../../../UserContext';
import useRefreshUser from '../../../useRefreshUser';

const Settings = ({navigation}) => {
  const {user} = useContext(UserContext);
  const refreshUser = useRefreshUser();

  useEffect(() => {
    refreshUser();
  }, []);
  const initialAlphabets = user.name
    .split(' ')
    .map(word => word.charAt(0))
    .join('')
    .toUpperCase();

  const handleNamePress = () => {
    navigation.navigate('Change Name');
  };
  const handlePasswordPress = () => {
    navigation.navigate('Change Password');
  };
  const handleEmailPress = () => {
    navigation.navigate('Verify Email');
  };
  return (
    <View style={{flex: 1}}>
      <ImageBackground
        source={require('../../../Assets/Slicing/MainBackground.png')}
        style={styles.backgroundImage}
        resizeMode="cover">
        <View style={styles.circle}>
          <Text style={styles.initialAlphabets}>{initialAlphabets}</Text>
        </View>
        <Text style={styles.nameText}>{user.name}</Text>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.emailText}>{user.email}</Text>
          {user.emailVerified ? (
            <Image
              source={require('../../../Assets/Slicing/P2P/Profile/SuccessLogo.png')}
              style={styles.successLogo}
            />
          ) : (
            <Image
              source={require('../../../Assets/Slicing/P2P/Profile/FailedLogo.png')}
              style={styles.failedLogo}
            />
          )}
        </View>
        <Image
          source={require('../../../Assets/Slicing/BlackLine.png')}
          style={styles.line}
        />
        <TouchableOpacity style={styles.button} onPress={handleEmailPress}>
          <Image
            source={require('../../../Assets/Slicing/Settings/VerifyEmailBtn.png')}
            style={styles.buttonImage}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleNamePress}>
          <Image
            source={require('../../../Assets/Slicing/Settings/ChangeNameBtn.png')}
            style={styles.buttonImage}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.tallaButton}
          onPress={handlePasswordPress}>
          <Image
            source={require('../../../Assets/Slicing/Settings/ChangePasswordBtn.png')}
            style={styles.tallaButtonImage}
          />
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({
  backgroundImage: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },
  circle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '25%',
  },
  initialAlphabets: {
    color: 'white',
    fontSize: 50,
    //fontWeight: 'bold',
    fontFamily: 'Poppins Regular',
  },
  nameText: {
    color: 'black',
    fontSize: 18,
    marginTop: '2%',
    fontFamily: 'Poppins Regular',
  },
  successLogo: {
    width: 20,
    height: 15,
    marginLeft: '2%',
    marginTop: '0.5%',
    marginRight: '-5%',
  },
  failedLogo: {
    width: 15,
    height: 15,
    marginLeft: '2%',
    marginTop: '0.5%',
    marginRight: '-5%',
  },
  line: {
    width: '95%',
    height: 0.5,
    alignSelf: 'center',
    marginVertical: '6%',
    tintColor: 'black',
  },
  button: {
    width: '93%',
    marginVertical: '5.5%',
  },
  buttonImage: {
    width: '100%',
    height: 23,
  },
  tallaButton: {
    width: '93%',
    marginVertical: '5.5%',
  },
  tallaButtonImage: {
    width: '100%',
    height: 28,
  },
});
