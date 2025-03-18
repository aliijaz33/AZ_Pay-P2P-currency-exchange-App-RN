import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  Alert,
  Image,
} from 'react-native';
import React, {useState, useEffect, useContext} from 'react';
import Custom_BG from '../../../Custom_Components/Custom_BG';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Clipboard from '@react-native-community/clipboard';
import axios from 'axios';
import UserContext from '../../../UserContext';
import MessageNotificationContext from '../../../MessageNotificationContext';
import useRefreshUser from '../../../useRefreshUser';
import {useNavigation, useFocusEffect} from '@react-navigation/native';

const PayTheSeller = ({route}) => {
  const navigation = useNavigation();
  const refreshUser = useRefreshUser();
  const {user} = useContext(UserContext);
  const {newMessageReceived, setNewMessageReceived, clearMessages} = useContext(
    MessageNotificationContext,
  );

  const {OrderAmount, currencyName, id, item, convertedAmount} = route.params;
  const [isTransfered, setIsTransfered] = useState(false);
  const [remainingTime, setRemainingTime] = useState(11200);

  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTime(prevTime => {
        if (prevTime === 1) {
          clearInterval(interval);
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);
  const minutes = Math.floor(remainingTime / 60);
  const seconds = remainingTime % 60;

  const copyToClipboard = () => {
    if (item.paymentMethod) {
      Clipboard.setString(item.paymentMethod.accountNumber);
      Alert.alert('Success', 'Account Number Copied to clipboard');
    } else {
      Alert.alert('Error', 'Failed to copy Account Number');
    }
  };

  const handleChatPress = () => {
    refreshUser();
    setNewMessageReceived(false);
    navigation.navigate('Chat', {recipientEmail: item.owner.email, id: id});
  };

  const handleTransfered = async () => {
    try {
      const response = await axios.post(
        'http://10.0.2.2:4200/addTransferNotify',
        {
          sellerInfo: item.owner,
          id: id,
          type: 'buy',
          currencyName,
          OrderAmount,
          convertedAmount,
          buyer: user.name,
        },
      );

      if (response.status === 200) {
        setIsTransfered(true);
        Alert.alert(
          '',
          'Your Record has been Submitted. Seller will release your payment shortly',
        );
      } else {
        Alert.alert('Error', 'Failed to submit record');
      }
    } catch (error) {
      console.log(
        'Your Record not Submitted',
        error.response?.data || error.message,
      );
      Alert.alert('Attention!', 'Your Order already submitted');
    }
  };

  const deleteNotification = async () => {
    try {
      await axios.post('http://10.0.2.2:4200/deleteNotification', {
        sellerInfo: item.owner,
        id: id,
        type: 'buy',
        currencyName,
      });
    } catch (error) {}
  };

  useEffect(() => {
    if (remainingTime === 0 && !isTransfered) {
      deleteNotification();
      Alert.alert(
        'Time is up!',
        'Your Order has been canceled',
        [
          {
            text: 'OK',
            onPress: () => navigation.pop(1),
          },
        ],
        {cancelable: false},
      );
    } else if (remainingTime === 0 && isTransfered) {
      Alert.alert(
        'Time is up!',
        'You can report this add if you have not receive your amount',
      );
    }
  }, [remainingTime, isTransfered]);

  useEffect(() => {
    const backHandler = navigation.addListener('beforeRemove', e => {
      if (!isTransfered) {
        e.preventDefault(); // Prevent the default behavior

        deleteNotification().finally(() => {
          navigation.dispatch(e.data.action); // Execute the default action after custom code
        });
      } else {
        navigation.dispatch(e.data.action); // Execute the default action immediately
      }
    });

    return () => backHandler();
  }, [navigation, isTransfered]);

  return (
    <Custom_BG>
      <View style={styles.container}>
        <Text style={styles.amountText}>
          {convertedAmount} {currencyName}
        </Text>
        <Text style={styles.timerText}>
          {minutes}:{seconds < 10 ? '0' : ''}
          {seconds}
        </Text>
        <Text style={styles.completeOrderText}>
          Pay{' '}
          <Text style={{fontWeight: 'bold', fontSize: 15}}>
            {OrderAmount} Pkr
          </Text>{' '}
          within 20 minutes after that order will be canceled
        </Text>
        <View style={styles.detalBox}>
          <Text style={styles.buyText}>Buy {currencyName}</Text>
          <View style={styles.infoContainer}>
            <Text style={styles.upperText}>unit Price</Text>
            <Text style={styles.upperText}>{item.unitPrice}</Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.upperText}>Quantity</Text>
            <Text style={styles.upperText}>
              {convertedAmount} {currencyName}
            </Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.upperText}>Order Amount</Text>
            <Text style={styles.upperText}>{OrderAmount} Pkr</Text>
          </View>
          <Image
            source={require('../../../Assets/Slicing/P2P/PostAds/BreakLine.png')}
            style={styles.lineImage}
          />
          <View style={styles.infoContainer}>
            <Text style={styles.belowText}>Payment Method</Text>
            <Text style={styles.belowText}>{item.paymentMethod.bankName}</Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.belowText}>Account Title</Text>
            <Text style={styles.belowText}>
              {item.paymentMethod.accountTitle}
            </Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.belowText}>Account Number</Text>
            <Text style={styles.accountText}>
              {item.paymentMethod.accountNumber}
            </Text>
            <TouchableOpacity style={styles.copyIcon} onPress={copyToClipboard}>
              <Icon name="content-copy" size={15} color="gray" />
            </TouchableOpacity>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.belowText}>Order ID</Text>
            <Text style={styles.belowText}>{id}</Text>
          </View>
        </View>
        <Text style={styles.noteText}>
          Note: To cancel the order press back button.
        </Text>
        <Text style={styles.descriptionText}>
          Leave the App, open selected payment platform and transfer the funds
          into seller's account provided above
        </Text>

        <View style={styles.buttonChatContainer}>
          <TouchableOpacity onPress={handleTransfered}>
            <Image
              source={require('../../../Assets/Slicing/P2P/P2PBuyScreens/TransferedBtn.png')}
              style={styles.notifyButton}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleChatPress}>
            <Image
              source={require('../../../Assets/Slicing/P2P/P2PBuyScreens/ChatBtn.png')}
              style={styles.chatButton}
            />
          </TouchableOpacity>
        </View>
      </View>
    </Custom_BG>
  );
};

export default PayTheSeller;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingHorizontal: 20,
    flex: 1,
  },
  amountText: {
    color: 'black',
    fontSize: 23,
    marginTop: '4%',
    fontFamily: 'Poppins Regular',
  },
  timerText: {
    color: 'rgba(125,125,125,1)',
    fontSize: 25,
    marginTop: '1.5%',
    marginBottom: '1.5%',
    fontFamily: 'Poppins Regular',
  },
  completeOrderText: {
    color: 'black',
    fontSize: 14,
    textAlign: 'center',
    paddingLeft: '5%',
    paddingRight: '5%',
    marginBottom: '2%',
    fontFamily: 'Poppins Regular',
  },
  detalBox: {
    width: '100%',
    //height: 165,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 11,
    marginTop: '5%',
    backgroundColor: 'white',
    paddingLeft: 12,
    paddingRight: 12,
  },
  buyText: {
    fontSize: 15,
    color: 'black',
    fontFamily: 'Poppins Regular',
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    marginTop: 5,
  },
  infoContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  upperText: {
    fontSize: 14,
    color: 'black',
    fontFamily: 'Poppins Regular',
    marginTop: '4%',
  },
  lineImage: {
    marginVertical: '5%',
    width: '100%',
    alignSelf: 'center',
    tintColor: 'rgba(125, 125, 125, 1)',
  },
  belowText: {
    fontSize: 14,
    color: 'black',
    fontFamily: 'Poppins Regular',
    marginBottom: '4%',
  },
  accountText: {
    fontSize: 14,
    color: 'black',
    fontFamily: 'Poppins Regular',
    marginRight: '-23%',
  },
  descriptionText: {
    fontSize: 15,
    //color: 'black',
    textAlign: 'center',
    fontFamily: 'Poppins Regular',
    marginTop: '2%',
  },
  noteText: {
    fontSize: 15,
    color: 'black',
    fontFamily: 'Poppins Regular',
    marginTop: '2%',
    alignSelf: 'flex-start',
  },
  buttonChatContainer: {
    width: '100%',
    flexDirection: 'row',
    position: 'absolute',
    bottom: 20,
    justifyContent: 'space-between',
    paddingHorizontal: '4%',
  },
  notifyButton: {
    width: 235,
    height: 50,
  },
  chatButton: {
    width: 85,
    height: 50,
  },
});
