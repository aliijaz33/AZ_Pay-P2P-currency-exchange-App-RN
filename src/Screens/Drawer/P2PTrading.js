import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  FlatList,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState, useContext} from 'react';
import CurrencyBox from '../../Custom_Components/CurrencyBox';
import LiveCurrencyContext from '../../LiveCurrencyContext';
import {useIsFocused} from '@react-navigation/native';

const P2PTrading = ({navigation}) => {
  const [searchValue, setSearchValue] = useState('');
  const [showLoader, setShowLoader] = useState(true);
  const [localcurrencies, setLocalCurrencies] = useState([]);
  const [filteredCurrencies, setFilteredCurrencies] = useState([]);
  const {currencies} = useContext(LiveCurrencyContext);
  const isFocused = useIsFocused();

  const fetchLocalCurrencies = async () => {
    try {
      let response = await fetch('http://10.0.2.2:4200/getCurrencies');
      if (!response.ok) {
        throw new Error('Failed to fetch local currencies data');
      }
      let data = await response.json();
      setLocalCurrencies(data);
      setFilteredCurrencies(data);
      setShowLoader(false);
    } catch (error) {
      console.error('Error retrieving local currencies data:', error);
      Alert.alert(
        'Error',
        'Failed to fetch local currencies. Please try again later.',
      );
      setShowLoader(false);
    }
  };

  useEffect(() => {
    fetchLocalCurrencies();
  }, []);

  useEffect(() => {
    if (localcurrencies.length > 0) {
      const updatedCurrencyRates = getCurrencyRates();
      setFilteredCurrencies(updatedCurrencyRates);
      if (!isFocused) {
        setSearchValue('');
        setFilteredCurrencies(updatedCurrencyRates);
      }
    }
  }, [localcurrencies, currencies, isFocused]);

  const findCurrencyRate = currencyName => {
    const matchedCurrency = currencies.find(
      currency => currency.currency === currencyName,
    );
    return matchedCurrency ? matchedCurrency.rate : 'Rate not found';
  };

  const getCurrencyRates = () => {
    return localcurrencies.map(localCurrency => {
      const targetCurrency = localCurrency.name;
      const rate = findCurrencyRate(targetCurrency);
      return {...localCurrency, rate};
    });
  };

  const handleSearch = text => {
    setSearchValue(text);
    const filtered = getCurrencyRates().filter(currency =>
      currency.name.toLowerCase().includes(text.toLowerCase()),
    );
    setFilteredCurrencies(filtered);
  };

  return (
    <ImageBackground
      source={require('../../Assets/Slicing/MainBackground.png')}
      style={styles.backgroundImage}
      resizeMode="cover">
      <View style={styles.searchContainer}>
        <Image
          source={require('../../Assets/Slicing/Dashboard/SearchLogo.png')}
          style={styles.searchLogo}
        />
        <TextInput
          style={styles.searchField}
          value={searchValue}
          placeholder="Search Currency"
          placeholderTextColor="rgba(0,0,0,0.75)"
          onChangeText={handleSearch}
        />
      </View>
      <View style={styles.currencyContainer}>
        {showLoader ? (
          <ActivityIndicator size={35} color="black" />
        ) : filteredCurrencies.length === 0 ? (
          <Text style={styles.noResultText}>No Result</Text>
        ) : (
          <FlatList
            data={filteredCurrencies}
            renderItem={({item}) => (
              <CurrencyBox
                navigation={navigation}
                name={item.name}
                price={item.rate}
                source={item.imageUrl}
              />
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        )}
      </View>
    </ImageBackground>
  );
};

export default P2PTrading;

const styles = StyleSheet.create({
  backgroundImage: {
    width: '100%',
    height: '100%',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
    marginTop: '15%',
    width: '97%',
  },
  searchField: {
    flex: 1,
    height: 37,
    backgroundColor: 'rgba(125, 125,125, 0.2)',
    borderRadius: 20,
    paddingHorizontal: 40,
    marginTop: '5%',
    marginLeft: '3%',
  },
  searchLogo: {
    width: 20,
    height: 20,
    tintColor: 'black',
    position: 'absolute',
    left: '5%',
    top: '50%',
  },
  // searchField: {
  //   width: '90%',
  //   height: 40,
  //   fontSize: 18,
  //   borderColor: 'black',
  //   borderWidth: 1,
  //   borderRadius: 6,
  //   marginTop: '20%',
  //   alignSelf: 'center',
  //   paddingHorizontal: 15,
  //   backgroundColor: 'rgba(125, 125, 125, 0.3)',
  // },
  currencyContainer: {
    marginTop: '2%',
    width: '100%',
    padding: '2.48%',
    paddingBottom: '33%',
  },
  noResultText: {
    fontSize: 25,
    color: 'black',
    fontFamily: 'Poppins Regular',
    alignSelf: 'center',
  },
});
