import {
  StyleSheet,
  Image,
  Text,
  View,
  Linking,
  TouchableOpacity,
  ScrollView,
  TextInput,
  FlatList,
} from 'react-native';
import React, {useState, useContext, useEffect} from 'react';
import StoryBox from '../../Custom_Components/StoryBox';
import UserContext from '../../UserContext';
import useRefreshUser from '../../useRefreshUser';
import CurrencyContext from '../../CurrencyContext';
import LiveCurrencyContext from '../../LiveCurrencyContext';

const Dashboard = ({navigation}) => {
  const {user} = useContext(UserContext);
  const {
    currencies: contextCurrencies,
    loading,
    error,
  } = useContext(CurrencyContext);
  const {currencies} = useContext(LiveCurrencyContext);
  const refreshUser = useRefreshUser();

  const [activeIndex, setActiveIndex] = useState(0);
  const [totalBalance, setTotalBalance] = useState(0);
  const [activeFavButton, setActiveFavButton] = useState(true);
  const [activeTopButton, setActiveTopButton] = useState(false);
  const [currency, setCurrency] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [filteredCurrencies, setFilteredCurrencies] = useState([]);

  const handleSearch = text => {
    setSearchValue(text);
    const filtered = currency.filter(currency =>
      currency.currency.toLowerCase().includes(text.toLowerCase()),
    );
    setFilteredCurrencies(filtered);
  };

  useEffect(() => {
    refreshUser();
    setSearchValue('');
  }, []);

  useEffect(() => {
    if (user) {
      calculateTotalBalance();
      mergeCurrencies();
    }
  }, [user, contextCurrencies, currencies]);

  const calculateTotalBalance = () => {
    let total = 0;
    if (user && user.currencies && currencies.length > 0) {
      user.currencies.forEach(currency => {
        const rate =
          currencies.find(c => c.currency === currency.currency)?.rate || 0;
        if (rate) {
          total += currency.balance * rate;
        }
      });
    }
    setTotalBalance(total.toFixed(2));
  };

  const mergeCurrencies = () => {
    const merged = user.currencies?.map(userCurrency => {
      const contextCurrency = contextCurrencies.find(
        c => c.name === userCurrency.currency,
      );
      const liveCurrency = currencies.find(
        c => c.currency === userCurrency.currency,
      );
      return {
        ...userCurrency,
        imageUrl: contextCurrency ? contextCurrency.imageUrl : null,
        symbol: contextCurrency ? contextCurrency.symbol : null,
        liveRate: liveCurrency ? liveCurrency.rate : null,
      };
    });
    setCurrency(merged);
    setFilteredCurrencies(merged);
  };

  const handleFavActiveButton = () => {
    refreshUser();
    setSearchValue('');
    setActiveFavButton(true);
    setActiveTopButton(false);
  };
  const handleTopActiveButton = () => {
    refreshUser();
    setSearchValue('');
    setActiveTopButton(true);
    setActiveFavButton(false);
  };

  const handleOpenDrawer = () => {
    refreshUser();
    setSearchValue('');
    navigation.openDrawer();
  };
  const handleDepositButton = () => {
    refreshUser();
    setSearchValue('');
    navigation.navigate('Deposit');
  };
  const handleWithdrawButton = () => {
    refreshUser();
    setSearchValue('');
    navigation.navigate('Withdraw');
  };

  const handleViewAll = () => {
    refreshUser();
    setSearchValue('');
    navigation.navigate('My Portfolio');
  };

  const CurrencyDetailComponent = ({id, name, image, symbol, rate}) => {
    const liveRateInt = parseFloat(rate);
    return (
      <View style={styles.cContainer}>
        <Text style={styles.cID}>{id + 1}-</Text>
        <Image style={styles.currencyLogo} source={{uri: image}} />
        <Text style={styles.cName}>{name}</Text>
        <Text style={styles.cSymbolRate}>
          {liveRateInt} <Text style={{fontWeight: 'bold'}}> Rs</Text>
        </Text>
      </View>
    );
  };

  if (loading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerMainView}>
        <TouchableOpacity onPress={handleOpenDrawer}>
          <Image
            source={require('../../Assets/Slicing/Dashboard/MenuLogo.png')}
            style={styles.menuLogo}
          />
        </TouchableOpacity>
        <Image
          source={require('../../Assets/Dashboard/DashboardLogo.png')}
          style={styles.dashboardLogo}
        />
        <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
          <Image
            source={require('../../Assets/Slicing/Dashboard/SettingLogo.png')}
            style={styles.settingLogo}
          />
        </TouchableOpacity>
      </View>
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
      <Text style={styles.totalBalanceText}>Total Balance (PKR)</Text>
      <Text style={styles.balanceText}>Rs {totalBalance}</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.depositButton}
          onPress={handleDepositButton}>
          <Image
            source={require('../../Assets/Slicing/Dashboard/DepositBtn.png')}
            style={styles.depositButton}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.depositButton}
          onPress={handleWithdrawButton}>
          <Image
            source={require('../../Assets/Slicing/Dashboard/WithdrawBtn.png')}
            style={styles.depositButton}
          />
        </TouchableOpacity>
      </View>
      <Image
        source={require('../../Assets/Slicing/P2P/PostAds/BreakLine.png')}
        style={styles.lineImage}
      />
      <Text style={styles.portfolioText}>My Portfolio</Text>

      <View style={styles.portfolioContainer}>
        {filteredCurrencies?.length === 0 ? (
          <Text style={styles.nothingShowText}>
            Nothing to show in Portfolio
          </Text>
        ) : (
          <View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              onScroll={({nativeEvent}) => {
                const nextActiveIndex = Math.round(
                  nativeEvent.contentOffset.x /
                    nativeEvent.layoutMeasurement.width,
                );
                if (nextActiveIndex !== activeIndex) {
                  setActiveIndex(nextActiveIndex);
                }
              }}
              scrollEventThrottle={16}
              style={styles.portfolioScrollContainer}>
              {filteredCurrencies?.map((story, index) => {
                return (
                  <StoryBox
                    key={index}
                    currencyName={story.currency}
                    currencyImage={story.imageUrl}
                    currencySymbol={story.symbol}
                    currentBalance={story.balance.toFixed(1)}
                  />
                );
              })}
            </ScrollView>
          </View>
        )}
      </View>
      {currency?.length === 0 ? null : (
        <TouchableOpacity
          style={styles.viewAllContainer}
          onPress={handleViewAll}>
          <Text style={styles.viewAllText}>View All</Text>
        </TouchableOpacity>
      )}
      <View style={styles.favTopContainer}>
        <TouchableOpacity
          style={styles.favTopButton}
          onPress={handleFavActiveButton}>
          <Text
            style={[styles.favTopText, activeFavButton && {color: 'black'}]}>
            Favorite
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.favTopButton}
          onPress={handleTopActiveButton}>
          <Text
            style={[styles.favTopText, activeTopButton && {color: 'black'}]}>
            Top
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.flatListContainer}>
        {activeFavButton && currency?.length !== 0 ? (
          <FlatList
            data={currency}
            renderItem={({item, index}) => (
              <CurrencyDetailComponent
                id={index}
                name={item.currency}
                image={item.imageUrl}
                symbol={item.symbol}
                rate={item.liveRate}
              />
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        ) : (
          <Text style={{alignSelf: 'center'}}>Nothing Here</Text>
        )}
      </View>
    </View>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  backgroundImage: {
    width: '90%',
    height: 20,
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 10,
  },
  headerMainView: {
    width: '100%',
    height: 55,
    paddingTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  menuLogo: {
    width: 30,
    height: 30,
  },
  dashboardLogo: {
    width: 45,
    height: 45,
    marginTop: '2.5%',
    tintColor: 'black',
  },
  settingLogo: {
    width: 33,
    height: 33,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  searchField: {
    flex: 1,
    height: 37,
    backgroundColor: 'rgba(125, 125,125, 0.2)',
    borderRadius: 20,
    paddingHorizontal: 40,
    marginTop: '5%',
    marginLeft: '1%',
  },
  searchLogo: {
    width: 20,
    height: 20,
    tintColor: 'black',
    position: 'absolute',
    left: '4%',
    top: '50%',
  },
  totalBalanceText: {
    fontSize: 15,
    color: 'rgba(0 ,0 ,0 , 0.8)',
    marginTop: '7%',
    marginLeft: '2%',
    fontFamily: 'Poppins Regular',
  },
  balanceText: {
    color: 'black',
    fontSize: 40,
    fontFamily: 'Poppins Regular',
    fontWeight: 'bold',
    marginLeft: '2%',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: '7%',
    paddingHorizontal: '14%',
    justifyContent: 'space-around',
  },
  depositButton: {
    width: 125,
    height: 35,
  },
  lineImage: {
    marginTop: '5%',
    width: '100%',
    alignSelf: 'center',
    tintColor: 'rgba(125, 125, 125, 0.6)',
  },
  portfolioText: {
    color: 'black',
    fontSize: 25,
    fontFamily: 'Poppins Regular',
    marginLeft: '3%',
    marginTop: '5%',
  },
  nothingShowText: {
    color: 'black',
    fontSize: 15,
    fontFamily: 'Poppins Regular',
    alignSelf: 'center',
    // marginLeft: '3%',
    // marginTop: '10%',
  },
  portfolioContainer: {
    width: '100%',
    marginLeft: '2%',
    marginTop: '2%',
  },
  portfolioScrollContainer: {
    width: '100%',
  },
  viewAllContainer: {
    alignSelf: 'center',
    marginTop: '3.5%',
  },
  viewAllText: {
    color: 'black',
    fontSize: 15,
    fontFamily: 'Poppins Regular',
  },

  favTopContainer: {
    flexDirection: 'row',
    width: '100%',
    marginTop: '3%',
    borderTopColor: 'black',
    borderTopWidth: 0.5,
  },
  favTopButton: {
    //width: '50%',
    marginLeft: '25%',
    marginTop: '2%',
    alignItems: 'center',
  },
  favTopText: {
    fontSize: 18,
    color: 'grey',
    fontFamily: 'Poppins Regular',
  },
  flatListContainer: {
    marginTop: 10, // Adjust this value based on the height of favTopContainer
    flex: 1,
  },

  chatbot: {
    position: 'absolute',
    bottom: 25,
    right: 15,
  },
  chatbotLogo: {
    width: 60,
    height: 60,
    borderRadius: 40,
  },

  cContainer: {
    flexDirection: 'row',
    width: '92%',
    height: 70,
    alignSelf: 'center',
    alignItems: 'center',
  },
  currencyLogo: {
    width: 30,
    height: 30,
    borderRadius: 20,
  },
  cID: {
    fontSize: 16,
    color: 'black',
    fontFamily: 'Poppins Regular',
    marginRight: '3%',
  },
  cName: {
    fontSize: 16,
    color: 'black',
    fontFamily: 'Poppins Regular',
    marginLeft: '10%',
  },
  cSymbolRate: {
    fontSize: 14,
    color: 'black',
    fontFamily: 'Poppins Regular',
    position: 'absolute',
    bottom: 15,
    right: 15,
  },
});

// const openUrl = async () => {
//   const url = 'https://chat.openai.com/?model=text-davinci-002-render-sha';
//   const bingUrl =
//     'https://www.bing.com/search?q=Bing%20AI&showconv=1&form=MA13FV';
//   Linking.openURL(bingUrl);
//   // const isSupported = await Linking.canOpenURL(url)
//   // if (isSupported) {
//   //   await Linking.openURL(url)
//   // } else {
//   //   Alert.alert ('Oppsss!', `Can't find This URL ${url}`)
//   // }
// };

{
  /* <TouchableOpacity style={styles.chatbot} onPress={openUrl}>
          <Image
            source={require('../../Assets/Main/chatbot.png')}
            style={styles.chatbotLogo}
          />
        </TouchableOpacity> */
}
