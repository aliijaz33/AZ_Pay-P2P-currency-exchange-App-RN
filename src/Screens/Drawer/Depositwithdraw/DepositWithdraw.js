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
import React, {useState} from 'react';
import useRefreshUser from '../../../useRefreshUser';

const DepositWithdraw = ({navigation}) => {
  const refreshUser = useRefreshUser();

  const handleDepositButton = () => {
    refreshUser();
    navigation.navigate('Deposit');
  };
  const handleWithdrawButton = () => {
    refreshUser();
    navigation.navigate('Withdraw');
  };
  return (
    <View style={{flex: 1}}>
      <ImageBackground
        source={require('../../../Assets/Slicing/MainBackground.png')}
        style={styles.backgroundImage}
        resizeMode="cover">
        <View style={styles.container}>
          <TouchableOpacity onPress={handleDepositButton} style={styles.button}>
            <Image
              source={require('../../../Assets/Slicing/DepositWithdraw/DepositBtn.png')}
              style={styles.disableSend}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleWithdrawButton}
            style={styles.button}>
            <Image
              source={require('../../../Assets/Slicing/DepositWithdraw/WithdrawBtn.png')}
              style={styles.disableSend}
            />
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

export default DepositWithdraw;

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
    marginVertical: '2%',
  },
  disableSend: {
    width: 272,
    height: 70,
    alignSelf: 'center',
    marginTop: '6%',
  },
});
