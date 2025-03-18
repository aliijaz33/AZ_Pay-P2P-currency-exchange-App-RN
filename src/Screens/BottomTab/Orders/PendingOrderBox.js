import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const PendingOrderBox = ({notification}) => {
  return (
    <View style={styles.orderBoxContainer}>
      <Text style={styles.messageText}>{notification.message}</Text>
      <View style={styles.infoContainer}>
        <Text style={styles.leftText}>Order Amount</Text>
        <Text style={styles.leftText}>{notification.OrderAmount} PKR</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.leftText}>Order ID</Text>
        <Text style={styles.leftText}>{notification.id}</Text>
      </View>
    </View>
  );
};

export default PendingOrderBox;

const styles = StyleSheet.create({
  orderBoxContainer: {
    width: '100%',
    marginTop: '3%',
    alignItems: 'center',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 15,
    backgroundColor: 'white',
  },
  infoContainer: {
    width: '92%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  leftText: {
    fontSize: 14,
    color: 'black',
    fontFamily: 'Poppins Regular',
    marginTop: '4%',
  },
  messageText: {
    fontSize: 15,
    color: 'black',
    fontWeight: '700',
    fontFamily: 'Poppins Regular',
    marginTop: '2%',
  },
});
