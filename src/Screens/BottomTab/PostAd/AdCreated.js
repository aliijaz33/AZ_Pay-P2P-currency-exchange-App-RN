import {
  ImageBackground,
  StyleSheet,
  Image,
  View,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import CustomHeader from '../../../Custom_Components/CustomHeader';

const AdCreated = ({navigation}) => {
  return (
    <ImageBackground
      source={require('../../../Assets/Slicing/P2P/PostAds/SuccessScreen.png')}
      style={styles.backgroundImage}
      resizeMode="cover">
      <CustomHeader color="white" />
      <TouchableOpacity onPress={() => navigation.navigate('BottomNavigator')}>
        <Image
          source={require('../../../Assets/Slicing/P2P/PostAds/MarketplaceBtn.png')}
          style={styles.button}
        />
      </TouchableOpacity>
    </ImageBackground>
  );
};

export default AdCreated;

const styles = StyleSheet.create({
  backgroundImage: {
    width: '100%',
    height: '100%',
  },
  button: {
    width: '70%',
    height: 39,
    alignSelf: 'center',
    marginTop: '100%',
  },
});
