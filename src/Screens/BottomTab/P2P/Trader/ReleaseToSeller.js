import {
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  Text,
  View,
  Alert,
} from 'react-native';
import React, {useContext, useState} from 'react';
import Custom_BG from '../../../../Custom_Components/Custom_BG';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Clipboard from '@react-native-community/clipboard';
import useRefreshUser from '../../../../useRefreshUser';
import UserContext from '../../../../UserContext';
const ReleaseToSeller = ({navigation, route}) => {
  const {notification} = route.params;
  const refreshUser = useRefreshUser();
  const {user} = useContext(UserContext);

  const copyToClipboard = () => {
    if (item.paymentMethod) {
      Clipboard.setString(item.paymentMethod.accountNumber);
      Alert.alert('Success', 'Account Number Copied to clipboard');
    } else {
      Alert.alert('Error', 'Failed to copy Account Number');
    }
  };
  const handleNotifyBuyer = async () => {
    try {
      const response = await fetch(
        'http://10.0.2.2:4200/notifyAndAddSellAmountToBuyer',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: user.email,
            notification: {
              id: notification.id,
              currencyName: notification.currencyName,
              sellAmount: notification.sellAmount,
            },
          }),
        },
      );
      const data = await response.json();
      if (response.ok) {
        Alert.alert(
          'Success!',
          'Payment is sent to seller and order marked as completed',
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
            {notification.sellAmount} {notification.currencyName}
          </Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.leftText}>Order type</Text>
          <Text style={styles.leftText}>{notification.type}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.leftText}>Order By</Text>
          <Text style={styles.leftText}>{notification.seller.name}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.leftText}>Order Amount</Text>
          <Text style={styles.leftText}>{notification.OrderAmount} PKR</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.leftText}>Order ID</Text>
          <Text style={styles.leftText}>{notification.id}</Text>
        </View>

        <Text style={styles.availableText}>Buyer Account Info</Text>
        <View style={styles.infoContainer}>
          <Text style={styles.leftText}>Bank Name</Text>
          <Text style={styles.leftText}>{notification.bankName}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.leftText}>Account Title</Text>
          <Text style={styles.leftText}>{notification.accountTitle}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.leftText}>Account Number</Text>
          <Text style={styles.accountNumberText}>
            {notification.accountNumber}
          </Text>
          <TouchableOpacity style={styles.copyIcon} onPress={copyToClipboard}>
            <Icon name="content-copy" size={15} color="gray" />
          </TouchableOpacity>
        </View>
        <Text style={styles.noteText}>
          Note: Please send {notification.OrderAmount} Pkr to above account and
          then press button to notify buyer
        </Text>
        <View style={styles.buttonChatContainer}>
          <TouchableOpacity
            onPress={handleNotifyBuyer}
            style={styles.paymentReceivedButton}>
            <Text style={styles.paymentReceivedButtonText}>
              Transferred, Notify Buyer
            </Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Image
              source={require('../../../../Assets/Slicing/P2P/P2PBuyScreens/ChatBtn.png')}
              style={styles.chatButton}
            />
          </TouchableOpacity>
        </View>
      </View>
    </Custom_BG>
  );
};

export default ReleaseToSeller;

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
  accountNumberText: {
    fontSize: 14,
    color: 'black',
    fontFamily: 'Poppins Regular',
    marginTop: '4%',
    marginLeft: '15%',
  },
  copyIcon: {
    marginTop: 15,
  },
});
