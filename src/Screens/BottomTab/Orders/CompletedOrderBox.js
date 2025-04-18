import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const CompletedOrderBox = ({notification}) => {
  return (
    <View style={styles.orderBoxContainer}>
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
        <Text style={styles.leftText}>Order Amount</Text>
        <Text style={styles.leftText}>{notification.OrderAmount} PKR</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.leftText}>Order ID</Text>
        <Text style={styles.leftText}>{notification.id}</Text>
      </View>
      <Text style={styles.dateText}>{notification.completedTimestamp}</Text>
    </View>
  );
};

export default CompletedOrderBox;

const styles = StyleSheet.create({
  orderBoxContainer: {
    width: '100%',
    //height: 140,
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
    marginTop: '2%',
    marginBottom: '1%',
  },
  dateText: {
    fontSize: 12,
    //color: 'black',
    fontFamily: 'Poppins Regular',
    alignSelf: 'flex-end',
    paddingRight: '4%',
  },
});
