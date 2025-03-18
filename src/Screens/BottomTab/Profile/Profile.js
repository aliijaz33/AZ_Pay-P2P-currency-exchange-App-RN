import {
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
  View,
  TextInput,
  Alert,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import React, {useState, useContext, useEffect} from 'react';
import Custom_BG from '../../../Custom_Components/Custom_BG';
import UserContext from '../../../UserContext';
import axios from 'axios';
import useRefreshUser from '../../../useRefreshUser';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Profile = ({navigation}) => {
  const {user} = useContext(UserContext);
  const refreshUser = useRefreshUser();

  const LogedUserEmail = user.email;
  const LogedUserTraderProfile = user.traderProfile;
  const [showProfile, setShowProfile] = useState(LogedUserTraderProfile);
  const [verified, setVerified] = useState(false);
  const [traderName, setTraderName] = useState('');
  const [indicator, setIndicator] = useState(false);
  const [notifiCount, setNotifiCount] = useState(0);

  // console.log('from trader Profile--->>', LogedUserTraderProfile);

  // console.log('from trader Profile LogedUserEmail--->>', LogedUserEmail);

  useEffect(() => {
    setNotifiCount(user.notifications.length);
  }, [user]);

  const handleNext = async () => {
    setIndicator(true);
    if (traderName === '') {
      setIndicator(false);
      Alert.alert('Pay Attention!', 'Enter Name');
      return;
    } else {
      try {
        const response = await axios.post(
          'http://10.0.2.2:4200/createTraderProfile',
          {
            traderName: traderName,
            LogedUserEmail: LogedUserEmail,
          },
        );
        await refreshUser();
        setIndicator(false);
        setTraderName('');
        Alert.alert('Success!', 'Your trader profile is created');
        setShowProfile(true);
      } catch (error) {
        setIndicator(false);
        console.error('Error creating trader profile:', error);
      }
    }
  };

  const handlePaymentMethodsPress = () => {
    refreshUser();
    navigation.navigate('Payment Methods');
  };

  if (showProfile && LogedUserTraderProfile) {
    var initialAlphabets = LogedUserTraderProfile?.name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase();
  }
  return (
    <Custom_BG>
      {indicator ? <ActivityIndicator size={40} color="black" /> : ''}

      {showProfile.name !== '' ? (
        <>
          <TouchableOpacity
            style={styles.notifiContainer}
            onPress={() => navigation.navigate('Notification Center')}>
            <Icon name="notifications" size={30} color="black" />
            {notifiCount === 0 ? null : <View style={styles.notifiCircle} />}
          </TouchableOpacity>
          <View style={styles.profileContainer}>
            <View style={styles.circleContainer}>
              <View style={styles.circle}>
                <Text style={styles.initialAlphabets}>{initialAlphabets}</Text>
              </View>
              <View style={styles.accountInfoView}>
                <Text style={styles.accountTitleText}>
                  {LogedUserTraderProfile?.name}
                </Text>
                <Text style={styles.accountTitleText}>
                  {LogedUserTraderProfile?.id}
                </Text>
              </View>
            </View>
            <Text style={styles.joinText}>
              Pakistan | joined on: {LogedUserTraderProfile?.creationDate}
            </Text>

            <View style={styles.kycContainer}>
              <Image
                source={require('../../../Assets/Slicing/P2P/Profile/FailedLogo.png')}
                style={styles.statusLogo}
              />
              <Text style={styles.statusText}>ID verification</Text>
              {user.emailVerified ? (
                <>
                  <Image
                    source={require('../../../Assets/Slicing/P2P/Profile/SuccessLogo.png')}
                    style={styles.statusLogo}
                  />
                  <Text style={styles.statusSuccessText}>Email</Text>
                </>
              ) : (
                <>
                  <Image
                    source={require('../../../Assets/Slicing/P2P/Profile/FailedLogo.png')}
                    style={styles.statusLogo}
                  />
                  <Text style={styles.statusText}>Email</Text>
                </>
              )}

              <TouchableOpacity
                onPress={() => navigation.navigate('Verification')}>
                <Image
                  source={require('../../../Assets/Slicing/P2P/Profile/VerificationBtn.png')}
                  style={styles.verifyButton}
                />
              </TouchableOpacity>
            </View>

            <Image
              source={require('../../../Assets/Slicing/P2P/PostAds/BreakLine.png')}
              style={styles.lineImage}
            />
            <TouchableOpacity
              style={styles.paymentButton}
              onPress={handlePaymentMethodsPress}>
              <Image
                style={styles.paymentButtonImage}
                source={require('../../../Assets/Slicing/P2P/Profile/PaymentBtn.png')}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.paymentButton}
              onPress={() => navigation.navigate('P2P Guide')}>
              <Image
                style={styles.paymentButtonImage}
                source={require('../../../Assets/Slicing/P2P/Profile/P2PGuideBtn.png')}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.paymentButton}
              onPress={() => navigation.navigate('FAQs')}>
              <Image
                style={styles.paymentButtonImage}
                source={require('../../../Assets/Slicing/P2P/Profile/FAQsBtn.png')}
              />
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <View style={{flex: 1, marginTop: '5%'}}>
          <Text style={styles.text}>Enter name to create trader profile</Text>
          <Text style={styles.label}>Name</Text>
          <TextInput
            style={styles.input}
            value={traderName}
            placeholder="Trader Profile Name"
            onChangeText={txt => setTraderName(txt)}
          />
          <TouchableOpacity style={styles.button} onPressIn={handleNext}>
            <Image
              source={require('../../../Assets/Slicing/DepositWithdraw/NextBtn.png')}
              style={styles.nextButton}
            />
          </TouchableOpacity>
        </View>
      )}
    </Custom_BG>
  );
};

export default Profile;

const styles = StyleSheet.create({
  text: {
    marginBottom: 7,
    fontSize: 17,
    color: 'black',
    fontFamily: 'Poppins Regular',
    alignSelf: 'center',
  },
  label: {
    marginTop: '15%',
    marginBottom: 7,
    marginLeft: '8%',
    fontSize: 17,
    color: 'black',
    fontFamily: 'Poppins Regular',
  },
  input: {
    height: 48,
    width: '85%',
    alignSelf: 'center',
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: 'black',
    paddingLeft: 10,
    fontSize: 17,
    marginBottom: '0.8%',
  },
  button: {
    marginTop: '20%',
    alignSelf: 'center',
  },
  nextButton: {
    width: 190,
    height: 55,
    borderRadius: 8,
  },

  notifiContainer: {
    justifyContent: 'center',
    alignSelf: 'flex-end',
    marginTop: '3%',
    marginRight: '3%',
    flexDirection: 'row',
  },
  notifiCircle: {
    width: 7,
    height: 7,
    borderRadius: 5,
    backgroundColor: 'red',
    marginLeft: '-1.7%',
  },
  notifiCountText: {
    color: 'white',
    fontSize: 12,
    fontFamily: 'Poppins Regular',
  },

  profileContainer: {
    flex: 1,
    marginLeft: '5%',
  },
  circleContainer: {
    flexDirection: 'row',
    width: '100%',
  },
  circle: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  initialAlphabets: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'Poppins Regular',
  },
  accountInfoView: {
    paddingLeft: 2,
  },
  accountTitleText: {
    fontSize: 15,
    color: 'black',
    fontFamily: 'Poppins Regular',
    marginLeft: '12%',
  },
  joinText: {
    fontSize: 13,
    color: 'black',
    fontFamily: 'Poppins Regular',
    marginTop: '3%',
  },
  kycContainer: {
    flexDirection: 'row',
    marginTop: '1.5%',
  },
  statusLogo: {
    width: 10,
    height: 10,
  },
  statusText: {
    color: 'red',
    fontSize: 10,
    marginLeft: '2%',
    marginRight: '3%',
    marginTop: '-0.7%',
    fontFamily: 'Poppins Regular',
  },
  statusSuccessText: {
    color: 'green',
    fontSize: 10,
    marginLeft: '2%',
    marginRight: '3%',
    marginTop: '-0.7%',
    fontFamily: 'Poppins Regular',
  },
  verifyButton: {
    width: 128,
    height: 25,
    marginLeft: '36.5%',
    marginTop: '-8%',
  },
  lineImage: {
    marginVertical: '5%',
    width: '98%',
    marginRight: '2.5%',
    alignSelf: 'center',
    tintColor: 'rgba(125, 125, 125, 0.6)',
  },
  paymentButton: {
    width: '97%',
    height: 30,
    marginVertical: '4%',
  },
  paymentButtonImage: {
    width: '100%',
    height: 23,
  },
});
