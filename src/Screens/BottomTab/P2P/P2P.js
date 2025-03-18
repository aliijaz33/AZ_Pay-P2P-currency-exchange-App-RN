import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useState, useContext, useEffect} from 'react';
import axios from 'axios';
import P2PBuyAds from '../P2P/P2PBuyAds';
import P2PSellAds from '../P2P/P2PSellAds';
import Custom_BG from '../../../Custom_Components/Custom_BG';
import useRefreshUser from '../../../useRefreshUser';

const P2P = ({navigation, route}) => {
  const refreshUser = useRefreshUser();
  const [ads, setAds] = useState({buy: [], sell: []});

  const {buy, sell, name: currencyName} = route.params;
  if (buy === undefined) {
    var x = sell;
  } else if (sell === undefined) {
    var x = buy;
  }
  const [activeButton, setActiveButton] = useState(x);
  const handleButtonPress = index => {
    refreshUser();
    setActiveButton(index);
  };

  useEffect(() => {
    const fetchAds = async () => {
      refreshUser();
      try {
        const response = await axios.get(
          `http://10.0.2.2:4200/getAds/${currencyName}`,
        );
        setAds(response.data);
      } catch (error) {
        console.error('Error fetching ads:', error);
      }
    };

    fetchAds();
  }, [currencyName]);

  const filteredAds = ads[activeButton];

  return (
    <Custom_BG>
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
      <View style={styles.filterContainer}>
        <View style={styles.currencyNameContainer}>
          <Text style={styles.currencyNameText}>{currencyName}</Text>
        </View>
        {/* <TouchableOpacity>
          <Image
            source={require('../../../Assets/Slicing/P2P/FilterLogo.png')}
            style={styles.filterIcon}
          />
        </TouchableOpacity> */}
      </View>
      <View style={styles.adsContainer}>
        {filteredAds.length > 0 ? (
          <FlatList
            data={filteredAds}
            renderItem={({item}) =>
              activeButton === 'buy' ? (
                <P2PBuyAds
                  navigation={navigation}
                  item={item}
                  currencyName={currencyName}
                />
              ) : (
                <P2PSellAds
                  navigation={navigation}
                  item={item}
                  currencyName={currencyName}
                />
              )
            }
          />
        ) : (
          <Text style={styles.noAdText}>
            No {activeButton} ads available for {currencyName}
          </Text>
        )}
      </View>
    </Custom_BG>
  );
};

export default P2P;

const styles = StyleSheet.create({
  buySellButtonContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginVertical: '5%',
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
  filterContainer: {
    flexDirection: 'row',
    width: '100%',
    paddingHorizontal: '3%',
    marginBottom: '2%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  currencyNameContainer: {
    backgroundColor: 'rgba(125, 125, 125, 0.4)',
    width: 80,
    height: 30,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  currencyNameText: {
    color: 'black',
    fontSize: 15,
  },
  filterIcon: {
    width: 20,
    height: 20,
  },
  adsContainer: {
    marginTop: '2%',
    width: '100%',
    padding: '2.48%',
    marginBottom: '39%',
  },
  noAdText: {
    fontSize: 18,
    color: 'black',
    fontFamily: 'Poppins Regular',
    alignSelf: 'center',
  },
});
