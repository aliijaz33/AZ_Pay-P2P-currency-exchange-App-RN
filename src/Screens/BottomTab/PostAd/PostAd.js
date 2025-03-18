import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
} from 'react-native';
import React, {useState, useContext, useEffect} from 'react';
import Custom_BG from '../../../Custom_Components/Custom_BG';
import UserContext from '../../../UserContext';
import PostedAdBox from './PostedAdBox';
import useRefreshUser from '../../../useRefreshUser';

const PostAd = ({navigation}) => {
  const [adsShow, setAdsShow] = useState();
  const [activeButton, setActiveButton] = useState('buy');

  const {user, setUser} = useContext(UserContext);
  const refreshUser = useRefreshUser();

  const adsData = user?.traderProfile?.ads;

  const handleButtonPress = index => {
    setActiveButton(index);
  };
  useEffect(() => {
    setAdsShow(adsData);
    //console.log('sell Ads at post Ads-->>> ', sellAds);
  }, [adsData]);

  const buyAds = adsData?.sell;
  const sellAds = adsData?.buy;

  const handleDeleteAd = async (index, isBuy) => {
    try {
      const response = await fetch('http://10.0.2.2:4200/deleteAd', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          LogedUserEmail: user.email,
          index: index,
          isBuy: isBuy,
        }),
      });

      if (response.ok) {
        const updatedUser = {...user};
        if (isBuy) {
          updatedUser.traderProfile.ads.buy.splice(index, 1);
        } else {
          updatedUser.traderProfile.ads.sell.splice(index, 1);
        }
        refreshUser();
        setUser(updatedUser);
        setAdsShow(updatedUser.traderProfile.ads);
      } else {
        const errorData = await response.json();
        console.error('Failed to delete ad:', errorData.error);
      }
    } catch (error) {
      console.error('Error deleting ad:', error);
    }
  };

  return (
    <Custom_BG>
      {buyAds?.length === 0 && sellAds?.length === 0 ? (
        <View style={styles.noAdsContainer}>
          <Image
            source={require('../../../Assets/Slicing/P2P/PostAds/NoAds.png')}
            style={styles.noAdsImage}
          />
          <Text style={styles.noAdText}>No Ads Found</Text>
          <Text style={styles.createAdText}>
            Create an ad to buy or sell currency
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Create an Ad')}>
            <Image
              source={require('../../../Assets/Slicing/P2P/PostAds/CreateAdBtn.png')}
              style={styles.createAdButton}
            />
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.postAdMainContainer}>
          <View style={styles.buySellButtonContainer}>
            <TouchableOpacity
              onPress={() => handleButtonPress('buy')}
              activeOpacity={1}
              style={[
                styles.buySellButton,
                activeButton === 'buy' && styles.selectedButton,
              ]}>
              <Text
                style={[
                  styles.buySellButtonText,
                  activeButton === 'buy' && styles.selectedButtonText,
                ]}>
                Buy
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleButtonPress('sell')}
              activeOpacity={1}
              style={[
                styles.buySellButton,
                activeButton === 'sell' && styles.selectedButton,
              ]}>
              <Text
                style={[
                  styles.buySellButtonText,
                  activeButton === 'sell' && styles.selectedButtonText,
                ]}>
                Sell
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.adsContainer}>
            {activeButton === 'buy' && buyAds?.length === 0 && (
              <Text style={styles.noAdsText}>No Buy ads</Text>
            )}
            {activeButton === 'sell' && sellAds?.length === 0 && (
              <Text style={styles.noAdsText}>No Sell ads</Text>
            )}
            {activeButton === 'buy' ? (
              <FlatList
                data={buyAds}
                renderItem={({item, index}) => (
                  <PostedAdBox
                    key={index}
                    index={index}
                    currencySymbol={item.currencySymbol}
                    unitPrice={item.unitPrice}
                    min={item.min}
                    max={item.max}
                    quantity={item.quantity}
                    paymentMethod={item.paymentMethod}
                    activeButton={activeButton}
                    onDelete={() => handleDeleteAd(index, true)}
                  />
                )}
              />
            ) : (
              <FlatList
                data={sellAds}
                renderItem={({item, index}) => (
                  <PostedAdBox
                    key={index}
                    index={index}
                    currencySymbol={item.currencySymbol}
                    unitPrice={item.unitPrice}
                    min={item.min}
                    max={item.max}
                    quantity={item.quantity}
                    paymentMethod={item.paymentMethod}
                    activeButton={activeButton}
                    onDelete={() => handleDeleteAd(index, false)}
                  />
                )}
              />
            )}
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('Create an Ad')}>
            <Image
              source={require('../../../Assets/Slicing/P2P/PostAds/CreateAd/CreateAdBtn.png')}
              style={styles.createAdButton2}
            />
          </TouchableOpacity>
        </View>
      )}
    </Custom_BG>
  );
};

export default PostAd;

const styles = StyleSheet.create({
  noAdsContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noAdsImage: {
    width: 90,
    height: 88,
  },
  noAdText: {
    fontSize: 20,
    color: 'rgba(0 ,0 ,0 , 1)',
    marginTop: '5%',
    //marginLeft: '2%',
    fontFamily: 'Poppins Regular',
  },
  createAdText: {
    fontSize: 14,
    color: 'rgba(0 ,0 ,0 , 0.7)',
    fontFamily: 'Poppins Regular',
    marginBottom: '5%',
  },
  createAdButton: {
    width: 113.8,
    height: 30,
    //alignItems: 'center',
  },

  //Active Adds
  postAdMainContainer: {
    flex: 1,
    alignItems: 'center',
  },
  buySellButtonContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginVertical: '4%',
    height: 30,
    width: '35%',
    borderRadius: 5,
    backgroundColor: 'rgba(125, 125, 125, 0.4)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buySellButton: {
    width: '48%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  selectedButton: {
    backgroundColor: 'white',
  },
  buySellButtonText: {
    fontSize: 18,
  },
  selectedButtonText: {
    fontSize: 20,
    color: 'black',
    backgroundColor: 'white',
  },
  noAdsText: {
    fontSize: 20,
    color: 'black',
    fontFamily: 'Poppins Regular',
    alignSelf: 'center',
  },
  adsContainer: {
    flex: 1,
    width: '100%',
    padding: '2.48%',
    marginBottom: '13%',
    //alignItems: 'center',
  },
  createAdButton2: {
    width: 113.8,
    height: 30,
    alignSelf: 'center',
    position: 'absolute',
    bottom: 17,
  },
});
