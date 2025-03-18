import {
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  Text,
  View,
  Alert,
} from 'react-native';
import React, {useContext, useState, useEffect} from 'react';
import Custom_BG from '../../../../Custom_Components/Custom_BG';
import useRefreshUser from '../../../../useRefreshUser';
import UserContext from '../../../../UserContext';
import MessageNotificationContext from '../../../../MessageNotificationContext';
import {useNavigation, useFocusEffect} from '@react-navigation/native';

const ReleaseToBuyer = ({route}) => {
  const {notification} = route.params;
  const refreshUser = useRefreshUser();
  const {user} = useContext(UserContext);
  const {newMessageReceived, setNewMessageReceived, clearMessages} = useContext(
    MessageNotificationContext,
  );

  const navigation = useNavigation();

  const handleChatPress = () => {
    refreshUser();
    navigation.navigate('Chat', {
      recipientEmail: notification.buyer.email,
      id: notification.id,
    });
  };

  const available = user.currencies.find(
    currency => currency.currency == notification.currencyName,
  );

  const handlePaymentReceived = async () => {
    try {
      const response = await fetch('http://10.0.2.2:4200/paymentReceived', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: user.email,
          notification,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert(
          'Success!',
          'Payment is sent to buyer and order marked as completed',
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
      console.error('Error marking payment received:', error);
      Alert.alert(
        'Error',
        'Failed to mark payment as received. Please try again.',
      );
    }
  };
  return (
    <Custom_BG>
      <View style={styles.container}>
        <Text style={styles.messageText}>{notification.message}</Text>
        <Text style={styles.orderInfoText}>Order info</Text>
        <View style={styles.infoContainer}>
          <Text style={styles.leftText}>Amount</Text>
          <Text style={styles.leftText}>
            {notification.convertedAmount} {notification.currencyName}
          </Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.leftText}>Order type</Text>
          <Text style={styles.leftText}>{notification.type}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.leftText}>Order By</Text>
          <Text style={styles.leftText}>{notification.buyer.name}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.leftText}>Order Amount By</Text>
          <Text style={styles.leftText}>{notification.OrderAmount} PKR</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.leftText}>Order ID</Text>
          <Text style={styles.leftText}>{notification.id}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.leftText}>Payment window</Text>
          <Text style={styles.leftText}>20 mins</Text>
        </View>

        <Text style={styles.availableText}>
          Available: {'  '} {available.balance} {notification.currencyName}
        </Text>
        <Text style={styles.noteText}>
          Note: Please first confirm that payment is received in your Bank
          Account then press button to release amount to buyer.
        </Text>
        <View style={styles.buttonChatContainer}>
          <TouchableOpacity
            onPress={handlePaymentReceived}
            style={styles.paymentReceivedButton}>
            <Text style={styles.paymentReceivedButtonText}>
              Payment Received
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleChatPress}>
            <Image
              source={require('../../../../Assets/Slicing/P2P/P2PBuyScreens/ChatBtn.png')}
              style={styles.chatButton}
            />
            {newMessageReceived && <View style={styles.redDot} />}
          </TouchableOpacity>
        </View>
      </View>
    </Custom_BG>
  );
};

export default ReleaseToBuyer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  messageText: {
    fontSize: 16,
    color: 'black',
    fontFamily: 'Poppins Regular',
    marginTop: '3%',
  },

  currencyNameText: {
    fontSize: 20,
    color: 'black',
    marginTop: 8,
    fontFamily: 'Poppins Regular',
    marginLeft: 5,
    paddingTop: 5,
  },
  availableText: {
    fontSize: 17,
    color: 'black',
    marginTop: 8,
    fontFamily: 'Poppins Regular',
    marginTop: 20,
  },
  orderInfoText: {
    fontSize: 20,
    color: 'black',
    fontFamily: 'Poppins Regular',
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    marginTop: '5%',
  },
  infoContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  leftText: {
    fontSize: 14,
    color: 'black',
    fontFamily: 'Poppins Regular',
    marginTop: '4%',
  },
  noteText: {
    fontSize: 15,
    color: 'black',
    fontFamily: 'Poppins Regular',
    marginTop: '12%',
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
  redDot: {
    position: 'absolute',
    top: -5,
    right: -5,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'red',
  },
});
