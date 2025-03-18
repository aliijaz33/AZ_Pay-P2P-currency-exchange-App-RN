import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  View,
} from 'react-native';
import React, {useContext, useState, useEffect} from 'react';
import Custom_BG from '../../../Custom_Components/Custom_BG';
import UserContext from '../../../UserContext';
import useRefreshUser from '../../../useRefreshUser';

const Notifications = () => {
  const {user} = useContext(UserContext);
  const refreshUser = useRefreshUser();
  const [activeOrderButton, setActiveOrderButton] = useState(true);
  const [activePaymentButton, setActivePaymentButton] = useState(false);
  const [notifiOrderCount, setNotifiOrderCount] = useState(0);
  const [notifiPaymentCount, setNotifiPaymentCount] = useState(0);

  useEffect(() => {
    setNotifiOrderCount(user.notifications.length);
    setNotifiPaymentCount(user.traderProfile.transferred.length);
  }, [user]);
  const handleOredrActiveButton = () => {
    refreshUser();
    setActivePaymentButton(false);
    setActiveOrderButton(true);
  };
  const handlePaymentActiveButton = () => {
    refreshUser();
    setActivePaymentButton(true);
    setActiveOrderButton(false);
  };
  return (
    <Custom_BG>
      <View style={styles.container}>
        <View style={styles.compPendContainer}>
          <TouchableOpacity
            style={styles.oedersButton}
            onPress={handleOredrActiveButton}>
            <Text
              style={[
                styles.compPendText,
                activeOrderButton && {color: 'black'},
              ]}>
              Orders
            </Text>
          </TouchableOpacity>
          <View style={styles.notifiCircle}>
            <Text style={styles.notifiCountText}>{notifiOrderCount}</Text>
          </View>
          <View style={styles.dividerBtwCompPend} />
          <TouchableOpacity
            style={styles.paymentsButton}
            onPress={handlePaymentActiveButton}>
            <Text
              style={[
                styles.compPendText,
                activePaymentButton && {color: 'black'},
              ]}>
              Payment Received
            </Text>
          </TouchableOpacity>
          <View style={styles.notifiCircle}>
            <Text style={styles.notifiCountText}>{notifiPaymentCount}</Text>
          </View>
        </View>
        <Image
          source={require('../../../Assets/Slicing/P2P/PostAds/BreakLine.png')}
          style={styles.lineImage}
        />
        {activeOrderButton && user.notifications.length > 0 && (
          <FlatList
            data={user.notifications}
            renderItem={({item, index}) => (
              <Text style={styles.notiText}>
                {index + 1}- {item.message}*
              </Text>
            )}
          />
        )}
        {activeOrderButton && user.notifications.length === 0 && (
          <Text style={styles.noOrderText}>No notifications for orders</Text>
        )}
        {activePaymentButton && user.traderProfile.transferred.length > 0 && (
          <FlatList
            data={user.traderProfile.transferred}
            renderItem={({item, index}) => (
              <Text style={styles.notiText}>
                {index + 1}- {item.paymentReceived}*
              </Text>
            )}
          />
        )}
        {activePaymentButton && user.traderProfile.transferred.length === 0 && (
          <Text style={styles.noOrderText}>No Payment Received</Text>
        )}
      </View>
    </Custom_BG>
  );
};

export default Notifications;

const styles = StyleSheet.create({
  notiText: {
    color: 'black',
    fontSize: 14,
    marginTop: '1%',
    fontFamily: 'Poppins Regular',
    marginTop: '3%',
    marginLeft: '4%',
  },
  noNotiText: {
    fontSize: 18,
    color: 'black',
    fontFamily: 'Poppins Regular',
    marginTop: '15%',
    alignSelf: 'center',
  },
  notifiCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '-1%',
    marginRight: '3%',
    marginLeft: '-6%',
  },
  notifiCountText: {
    color: 'white',
    fontSize: 13,
    fontWeight: 'bold',
  },

  container: {
    flex: 1,
    //alignItems: 'center',
    paddingHorizontal: 5,
  },
  compPendContainer: {
    flexDirection: 'row',
    width: '90%',
    marginTop: '3%',
  },
  oedersButton: {
    width: '30%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paymentsButton: {
    width: '60%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  compPendText: {
    fontSize: 18,
    color: 'grey',
    fontFamily: 'Poppins Regular',
  },
  dividerBtwCompPend: {
    borderRightColor: 'black',
    borderRightWidth: 2,
    marginTop: 4,
    marginBottom: 6,
  },
  lineImage: {
    marginVertical: '1.5%',
    width: '75%',
    marginLeft: '5%',
    //alignSelf: 'center',
    tintColor: 'rgba(125, 125, 125, 1)',
  },
  noOrderText: {
    fontSize: 18,
    color: 'black',
    fontFamily: 'Poppins Regular',
    marginTop: '45%',
    alignSelf: 'center',
  },
});
