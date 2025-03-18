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

import useRefreshUser from '../../../useRefreshUser';

const PayTheBuyer = ({navigation, route}) => {
  const refreshUser = useRefreshUser();
  const {user} = useContext(UserContext);

  const {
    OrderAmount,
    currencyName,
    id,
    item,
    sellAmount,
    bankName,
    accountTitle,
    accountNumber,
  } = route.params;
  const [isTransfered, setIsTransfered] = useState(false);
  const [remainingTime, setRemainingTime] = useState(1200);
  console.log('................>>>>', item);
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

  const handlePaymentReceived = async () => {
    try {
      const response = await fetch(
        'http://10.0.2.2:4200/markSellOrderCompleted',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: user.email,
            notification: {
              id: id,
              buyer: item.owner,
              currencyName,
              convertedAmount: sellAmount,
              OrderAmount,
              bankName,
              accountTitle,
              accountNumber,
              type: 'sell',
            },
          }),
        },
      );
      const data = await response.json();
      if (response.ok) {
        Alert.alert(
          'Success!',
          'Sell order marked as completed successfully',
          [
            {
              text: 'OK',
              onPress: () => navigation.pop(1),
            },
          ],
          {cancelable: false},
        );
        refreshUser();
      } else {
        Alert.alert('Error', data.error);
      }
    } catch (error) {
      console.error('Error marking sell order completed:', error);
      Alert.alert(
        'Error',
        'Failed to mark sell order as completed. Please try again.',
      );
    }
  };

  const handleCancel = async () => {
    try {
      await axios.post('http://10.0.2.2:4200/deleteCanceledNotification', {
        buyerInfo: item.owner,
        id: id,
        type: 'sell',
        currencyName,
        sellAmount,
        sellerEmail: user.email,
      });
      Alert.alert(
        'Canceled!',
        'Your Order has been canceled',
        [
          {
            text: 'OK',
            onPress: () => navigation.pop(1),
          },
        ],
        {cancelable: false},
      );
    } catch (error) {}
  };

  return (
    <Custom_BG>
      <View style={styles.container}>
        <Text style={styles.amountText}>{OrderAmount} Pkr</Text>
        <Text style={styles.timerText}>
          {minutes}:{seconds < 10 ? '0' : ''}
          {seconds}
        </Text>
        <Text style={styles.completeOrderText}>
          Check your account that you provided below. When you receive{' '}
          <Text style={{fontWeight: 'bold', fontSize: 15}}>
            {OrderAmount} Pkr
          </Text>{' '}
          press Payment received button to complete the order
        </Text>
        <View style={styles.detalBox}>
          <Text style={styles.buyText}>Sell {currencyName}</Text>
          <View style={styles.infoContainer}>
            <Text style={styles.upperText}>unit Price</Text>
            <Text style={styles.upperText}>{item.unitPrice}</Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.upperText}>Quantity</Text>
            <Text style={styles.upperText}>
              {sellAmount} {currencyName}
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
            <Text style={styles.belowText}>{bankName}</Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.belowText}>Account Title</Text>
            <Text style={styles.belowText}>{accountTitle}</Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.belowText}>Account Number</Text>
            <Text style={styles.belowText}>{accountNumber}</Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.belowText}>Order ID</Text>
            <Text style={styles.belowText}>{id}</Text>
          </View>
        </View>
        <Text style={styles.noteText}>
          Note: Do not go Back. if you want to cancel the order press cancel
        </Text>

        <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
          <Text style={styles.cancelText}>Cancel Order</Text>
        </TouchableOpacity>
        <View style={styles.buttonChatContainer}>
          <TouchableOpacity
            onPress={handlePaymentReceived}
            style={styles.paymentReceivedButton}>
            <Text style={styles.paymentReceivedButtonText}>
              Payment Received
            </Text>
          </TouchableOpacity>
          <TouchableOpacity>
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

export default PayTheBuyer;

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
  paymentReceivedButton: {
    width: '70%',
    height: 50,
    backgroundColor: 'black',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  paymentReceivedButtonText: {
    color: 'white',
    fontSize: 17,
    fontFamily: 'Poppins Regular',
  },
  chatButton: {
    width: 85,
    height: 50,
  },
  cancelButton: {
    width: '35%',
    height: 30,
    backgroundColor: 'black',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-start',
    marginTop: '2%',
  },
  cancelText: {
    color: 'white',
    fontSize: 13,
    fontFamily: 'Poppins Regular',
  },
});
