import {
  StyleSheet,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
  View,
  FlatList,
} from 'react-native';
import React, {useContext, useState, useEffect} from 'react';
import Custom_BG from '../../../Custom_Components/Custom_BG';
import UserContext from '../../../UserContext';
import useRefreshUser from '../../../useRefreshUser';
import CompletedOrderBox from './CompletedOrderBox';
import PendingOrderBox from './PendingOrderBox';

const Orders = ({navigation}) => {
  const {user} = useContext(UserContext);
  const refreshUser = useRefreshUser();
  const [activeCompletedButton, setActiveCompletedButton] = useState(true);
  const [activePendingButton, setActivePendingButton] = useState(false);

  const handleCompleteActiveButton = () => {
    refreshUser();
    setActivePendingButton(false);
    setActiveCompletedButton(true);
  };
  const handlePendingActiveButton = () => {
    refreshUser();
    setActivePendingButton(true);
    setActiveCompletedButton(false);
  };
  const notificationPress = item => {
    refreshUser();
    if (item.type === 'buy') {
      navigation.navigate('Release Payment', {notification: item});
    } else if (item.type === 'sell') {
      navigation.navigate('Transfer To Seller', {notification: item});
    }
  };

  useEffect(() => {
    refreshUser();
  }, []);
  return (
    <Custom_BG>
      <View style={styles.container}>
        <View style={styles.compPendContainer}>
          <TouchableOpacity
            style={styles.compPendButton}
            onPress={handleCompleteActiveButton}>
            <Text
              style={[
                styles.compPendText,
                activeCompletedButton && {color: 'black'},
              ]}>
              Completed
            </Text>
          </TouchableOpacity>
          <View style={styles.dividerBtwCompPend} />
          <TouchableOpacity
            style={styles.compPendButton}
            onPress={handlePendingActiveButton}>
            <Text
              style={[
                styles.compPendText,
                activePendingButton && {color: 'black'},
              ]}>
              Pending
            </Text>
          </TouchableOpacity>
        </View>
        <Image
          source={require('../../../Assets/Slicing/P2P/PostAds/BreakLine.png')}
          style={styles.lineImage}
        />
        {activeCompletedButton && user.completedOrders.length > 0 && (
          <FlatList
            data={user.completedOrders}
            renderItem={({item}) => <CompletedOrderBox notification={item} />}
          />
        )}
        {activeCompletedButton && user.completedOrders.length === 0 && (
          <Text style={styles.noOrderText}>
            You haven't complete any order yet
          </Text>
        )}
        {activePendingButton && user.notifications.length > 0 && (
          <FlatList
            data={user.notifications}
            renderItem={({item}) => (
              <TouchableOpacity onPress={() => notificationPress(item)}>
                <PendingOrderBox notification={item} />
              </TouchableOpacity>
            )}
          />
        )}
        {activePendingButton && user.notifications.length === 0 && (
          <Text style={styles.noOrderText}>No Pending Order</Text>
        )}
      </View>
    </Custom_BG>
  );
};

export default Orders;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //alignItems: 'center',
    paddingHorizontal: 5,
  },
  compPendContainer: {
    flexDirection: 'row',
    width: '70%',
    marginTop: '3%',
  },
  compPendButton: {
    width: '50%',
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
    width: '57%',
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
