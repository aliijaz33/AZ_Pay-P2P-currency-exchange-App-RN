import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useContext} from 'react';
import Custom_BG from '../../../Custom_Components/Custom_BG';
import UserContext from '../../../UserContext';

const PaymentMethods = ({navigation}) => {
  const {user} = useContext(UserContext);
  const paymentData = user.traderProfile.paymentMethods;

  const CustomItem = ({bankName, accountTitle, accountNumber, branchCode}) => {
    return (
      <View style={styles.parmentBox}>
        <View style={styles.infoContainer}>
          <Text style={styles.belowText}>Bank name</Text>
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
          <Text style={styles.belowText}>Branch Code</Text>
          <Text style={styles.belowText}>{branchCode}</Text>
        </View>
      </View>
    );
  };
  return (
    <Custom_BG>
      <TouchableOpacity
        onPress={() => navigation.navigate('Add Payment Method')}>
        <Text style={styles.addpaymentButton}>+ Add Payment Method</Text>
      </TouchableOpacity>
      <View>
        <FlatList
          data={paymentData}
          renderItem={({item}) => (
            <CustomItem
              bankName={item.bankName}
              accountTitle={item.accountTitle}
              accountNumber={item.accountNumber}
              branchCode={item.branchCode}
            />
          )}
        />
      </View>
    </Custom_BG>
  );
};

export default PaymentMethods;

const styles = StyleSheet.create({
  parmentBox: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    marginTop: '3%',
    paddingHorizontal: 10,
    marginHorizontal: '3%',
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
  addpaymentButton: {
    fontSize: 18,
    color: 'black',
    fontWeight: 'bold',
    fontFamily: 'Poppins Regular',
    marginTop: '4%',
    marginLeft: '5%',
  },
});
