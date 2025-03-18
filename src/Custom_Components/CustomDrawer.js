import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  Alert,
  View,
} from 'react-native';
import React, {useContext, useEffect} from 'react';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Clipboard from '@react-native-community/clipboard';
import UserContext from '../UserContext';
import useRefreshUser from '../useRefreshUser';

const CustomDrawer = props => {
  const {user} = useContext(UserContext);
  const refreshUser = useRefreshUser();

  useEffect(() => {
    refreshUser();
  }, []);

  if (user.name) {
    var initialAlphabets = user.name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase();
  } else {
    var initialAlphabets = 'NA';
  }

  const copyToClipboard = () => {
    if (user._id) {
      Clipboard.setString(user._id);
      Alert.alert('Success', 'User ID Copied to clipboard');
    } else {
      Alert.alert('Error', 'Failed to copy user ID');
    }
  };

  const removeData = async () => {
    await AsyncStorage.removeItem('loginToken');
    await AsyncStorage.removeItem('user');
    props.navigation.navigate('Login');
    console.log('Logged Out/ from Custom Drawer--->>>');
  };
  return (
    <View style={styles.container}>
      <DrawerContentScrollView>
        <View style={styles.profileView}>
          <View style={styles.circle}>
            <Text style={styles.initialAlphabets}>{initialAlphabets}</Text>
          </View>
          <View style={styles.nameView}>
            <Text style={styles.name}>{user.name}</Text>
            {/* <Text style={styles.idText}>{user.email}</Text> */}
            <Text style={styles.idText}>
              ID: {user._id}
              {'  '}
              <TouchableOpacity
                style={styles.copyIcon}
                onPress={copyToClipboard}>
                <Icon name="content-copy" size={15} color="gray" />
              </TouchableOpacity>
            </Text>
          </View>
          <TouchableOpacity
            style={styles.backArrowView}
            onPress={() => props.navigation.closeDrawer()}>
            <Image
              source={require('../Assets/Menu/BackArrow.png')}
              style={styles.backArrow}
            />
          </TouchableOpacity>
        </View>
        <Image
          source={require('../Assets/Menu/Line.png')}
          style={styles.line}
        />
        <View style={{paddingTop: 15}}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      <Text style={styles.versionText}>Version: v 1.0.0</Text>
      <Image source={require('../Assets/Menu/Line.png')} style={styles.line} />
      <View style={styles.logOutView}>
        <TouchableOpacity style={{flexDirection: 'row'}} onPress={removeData}>
          <Image
            source={require('../Assets/Menu/LogoutLogo.png')}
            style={styles.logoutLogo}
          />
          <Text style={styles.logOutText}>Log out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CustomDrawer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  profileView: {
    padding: 2,
    flexDirection: 'row',
    marginTop: '15%',
    marginLeft: '3%',
  },
  nameView: {
    marginTop: '1.5%',
    marginLeft: '3.5%',
  },
  circle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  initialAlphabets: {
    color: 'white',
    fontSize: 22,
    fontFamily: 'Poppins Regular',
  },
  name: {
    fontSize: 16,
    color: 'black',
    fontFamily: 'Poppins Regular',
  },
  idText: {
    fontSize: 11,
    color: 'black',
    fontFamily: 'Poppins Regular',
  },
  backArrowView: {
    position: 'absolute',
    marginLeft: '92%',
    marginTop: '-15%',
    height: 50,
    width: 30,
    //justifyContent: 'center',
  },
  backArrow: {
    width: 18,
    height: 30,
    tintColor: 'black',
  },
  line: {
    width: '95%',
    height: 1.5,
    alignSelf: 'center',
    marginTop: 20,
    tintColor: 'black',
  },
  versionText: {
    marginBottom: '-8%',
    alignSelf: 'center',
    fontFamily: 'Poppins Regular',
  },
  logOutView: {
    width: '100%',
    flexDirection: 'row',
    paddingTop: '4.5%',
    paddingBottom: '6%',
    paddingLeft: 20,
  },
  logoutLogo: {
    width: 30,
    height: 33,
  },
  logOutText: {
    marginLeft: 15,
    marginTop: 2,
    fontFamily: 'Poppins Regular',
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
});
