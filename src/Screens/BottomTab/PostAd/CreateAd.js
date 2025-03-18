import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useContext, useEffect} from 'react';
import Custom_BG from '../../../Custom_Components/Custom_BG';
import CustomDropdown2 from '../../../Custom_Components/CustomDropdown2';
import PaymentSelector from '../../../Custom_Components/PaymentSelector';
import LiveCurrencyContext from '../../../LiveCurrencyContext';
import UserContext from '../../../UserContext';

//1
import useRefreshUser from '../../../useRefreshUser';

const CreateAd = ({navigation}) => {
  const [currencySymbol, setCurrencySymbol] = useState('');
  const [unitPrice, setUnitPrice] = useState(0);
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [balance, setBalance] = useState(null);
  const [minLimit, setMinLimit] = useState(0);
  const [maxLimit, setMaxLimit] = useState(0);
  const [livePrice, setLivePrice] = useState(0);

  const [activeBuyButton, setActiveBuyButton] = useState(true);
  const [activeSellButton, setActiveSellButton] = useState(false);
  const [indicator, setIndicator] = useState(false);
  const {currencies} = useContext(LiveCurrencyContext);
  const {user} = useContext(UserContext);
  //2
  const refreshUser = useRefreshUser();

  useEffect(() => {
    if (currencySymbol) {
      const currencyLiveRate = currencies.find(
        currency => currency.currency === currencySymbol,
      );

      if (currencyLiveRate) {
        const rate = parseFloat(currencyLiveRate.rate);
        setLivePrice(rate);

        const twoPercent = rate * 0.02;
        setMinLimit((rate - twoPercent).toFixed(2));
        setMaxLimit((rate + twoPercent).toFixed(2));
      }
    }
  }, [currencySymbol, currencies]);

  const handleBuyActiveButton = () => {
    setActiveBuyButton(true);
    setActiveSellButton(false);
    setUnitPrice('');
    setMin('');
    setMax('');
    setQuantity('');
    setPaymentMethod(null);
    refreshUser();
  };

  const handleSellActiveButton = () => {
    setActiveSellButton(true);
    setActiveBuyButton(false);
    setUnitPrice('');
    setQuantity('');
    setPaymentMethod(null);
    refreshUser();
  };

  const handleValueChange = (currency, balance) => {
    setCurrencySymbol(currency);
    setBalance(parseFloat(balance.toFixed(2)));
    console.log('Selected Currency at create AD: --->>>', currencySymbol);
  };

  const handlePaymentMethodSelect = method => {
    setPaymentMethod(method);
    refreshUser();
    console.log('Selected Method at create AD: --->>>', paymentMethod);
  };

  const handleCreateAd = async () => {
    if (!unitPrice || !quantity || !currencySymbol || !paymentMethod) {
      Alert.alert('Error', 'Please fill in all the fields');
      setIndicator(false);
      return;
    }
    if (unitPrice < minLimit || unitPrice > maxLimit) {
      Alert.alert('Attention', 'Please fill unit price between given limit');
      setIndicator(false);
      return;
    }
    if (min < 0) {
      Alert.alert('Attention', 'Please enter minimum limit greater than 0');
      setIndicator(false);
      return;
    }
    if (max <= min) {
      console.log('Minimum limit--->>', min, typeof min);
      console.log('Maximum limit--->>', max, typeof max);

      Alert.alert(
        'Attention',
        'Please enter maximum limit greater than minimum',
      );
      setIndicator(false);
      return;
    }

    if (max > balance * livePrice) {
      Alert.alert(
        'Attention',
        'Please enter maximum limit according to available balance',
      );
      setIndicator(false);
      return;
    }
    if (quantity < 0 || quantity === 0) {
      Alert.alert('Attention', 'Please enter quantity greater than 0');
      setIndicator(false);
      return;
    }
    if (quantity > balance) {
      Alert.alert(
        'Attention',
        'Please enter quantity according to available balance',
      );
      setIndicator(false);
      return;
    }

    setIndicator(true);
    try {
      const response = await fetch('http://10.0.2.2:4200/createAd', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          LogedUserEmail: user.email,
          adDetails: {
            currencySymbol: currencySymbol,
            unitPrice: unitPrice,
            min: min,
            max: max,
            quantity: quantity,
            paymentMethod: paymentMethod,
          },
          isBuy: activeBuyButton,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        setTimeout(() => {
          setIndicator(false);
          setActiveBuyButton(true);
          setActiveSellButton(false);
          setCurrencySymbol('');
          setUnitPrice('');
          setMin('');
          setMax('');
          setQuantity('');
          setPaymentMethod(null);
          refreshUser(); //3 Refresh user data
          navigation.navigate('Ad Created');
        }, 400);
      } else {
        Alert.alert('Error', data.error || 'Failed to create ad');
      }
    } catch (error) {
      console.error('Error creating ad:', error);
      Alert.alert('Error', 'An error occurred while creating the ad');
    }
  };

  return (
    <Custom_BG>
      {indicator ? <ActivityIndicator size={40} color="black" /> : ''}
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.setPriceText}>Set ad price</Text>
        <Text style={styles.iWantText}>I want to</Text>
        <View style={styles.buySellButtonContainer}>
          <TouchableOpacity
            style={[
              styles.buySellButton,
              activeBuyButton && styles.buyActiveButton,
            ]}
            onPress={handleBuyActiveButton}>
            <Text
              style={[
                styles.buySellText,
                activeBuyButton && styles.buySellActiveText,
              ]}>
              Buy
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.buySellButton,
              activeSellButton && styles.sellActiveButton,
            ]}
            onPress={handleSellActiveButton}>
            <Text
              style={[
                styles.buySellText,
                activeSellButton && styles.buySellActiveText,
              ]}>
              Sell
            </Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.selectorTitleText}>Currency</Text>
        <CustomDropdown2 onValueChange={handleValueChange} balance={balance} />
        <Image
          source={require('../../../Assets/Slicing/P2P/PostAds/BreakLine.png')}
          style={styles.lineImage}
        />
        <Text style={styles.inputTitle}>Unit Price</Text>
        <TextInput
          style={styles.input}
          value={unitPrice}
          placeholder="Unit Price"
          keyboardType="numeric"
          onChangeText={text => {
            const numeric = parseFloat(text);
            if (!isNaN(numeric)) {
              setUnitPrice(numeric);
            } else {
              setUnitPrice(0);
            }
          }}
        />
        <Text style={styles.minMaxPriceText}>
          Min - Max Price:{'    '}
          <Text style={styles.priceRangeValueText}>
            Rs {minLimit} - Rs {maxLimit}
          </Text>
        </Text>
        <Text style={styles.minMaxPriceText}>
          Market Price:{'    '}
          <Text style={styles.priceRangeValueText}>Rs {livePrice}</Text>
        </Text>
        <Image
          source={require('../../../Assets/Slicing/P2P/PostAds/BreakLine.png')}
          style={styles.lineImage}
        />
        <Text style={styles.inputTitle}>Limit</Text>
        <View style={styles.limitContainer}>
          <TextInput
            style={styles.minInput}
            value={min}
            placeholder="Min"
            keyboardType="numeric"
            onChangeText={text => {
              const numeric = parseFloat(text);
              if (!isNaN(numeric)) {
                setMin(numeric);
              } else {
                setMin(0);
              }
            }}
          />
          <Text style={styles.rangerLine}> - </Text>
          <TextInput
            style={styles.minInput}
            value={max}
            placeholder="Max"
            keyboardType="numeric"
            onChangeText={text => {
              const numeric = parseFloat(text);
              if (!isNaN(numeric)) {
                setMax(numeric);
              } else {
                setMax(0);
              }
            }}
          />
        </View>

        <Image
          source={require('../../../Assets/Slicing/P2P/PostAds/BreakLine.png')}
          style={styles.lineImage}
        />
        <Text style={styles.inputTitle}>Quantity</Text>
        <TextInput
          style={styles.input}
          value={quantity}
          placeholder="Quantity"
          keyboardType="numeric"
          onChangeText={text => {
            const numeric = parseFloat(text);
            if (!isNaN(numeric)) {
              setQuantity(numeric);
            } else {
              setQuantity(0);
            }
          }}
        />
        <Text style={styles.availableText}>
          Available:{' '}
          <Text style={styles.priceRangeValueText}>
            {balance} {currencySymbol}
          </Text>
        </Text>
        <Image
          source={require('../../../Assets/Slicing/P2P/PostAds/BreakLine.png')}
          style={styles.lineImage}
        />
        <Text style={styles.selectorTitleText}>Payment Method</Text>
        <PaymentSelector onPaymentMethodSelect={handlePaymentMethodSelect} />
        {!unitPrice ||
        !quantity ||
        !currencySymbol ||
        !paymentMethod ||
        !min ||
        !max ? (
          <Image
            source={require('../../../Assets/Slicing/P2P/PostAds/CreateAdDisableBtn.png')}
            style={styles.createAdButton}
          />
        ) : (
          <TouchableOpacity onPress={handleCreateAd}>
            <Image
              source={require('../../../Assets/Slicing/P2P/PostAds/CreateAdEnableBtn.png')}
              style={styles.createAdEnableButton}
            />
          </TouchableOpacity>
        )}
      </ScrollView>
    </Custom_BG>
  );
};

export default CreateAd;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: 10,
  },
  setPriceText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'black',
    marginTop: '5%',
    fontFamily: 'Poppins Regular',
  },
  iWantText: {
    fontSize: 16,
    color: 'black',
    marginTop: '5%',
    fontFamily: 'Poppins Regular',
  },
  selectorTitleText: {
    fontSize: 16,
    color: 'black',
    marginTop: '5%',
    fontFamily: 'Poppins Regular',
  },
  buySellButtonContainer: {
    flexDirection: 'row',
    width: '100%',
    marginTop: '5%',
    backgroundColor: 'rgba(125, 125, 125, 0.25)',
    borderRadius: 6,
  },
  buySellButton: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buyActiveButton: {
    backgroundColor: 'rgba(24, 178, 45, 1)',
    borderRadius: 6,
  },
  sellActiveButton: {
    backgroundColor: 'rgba(205, 0,0, 1)',
    borderRadius: 6,
  },
  buySellText: {
    fontSize: 18,
    color: 'grey',
    fontFamily: 'Poppins Regular',
  },
  buySellActiveText: {
    color: 'white',
  },
  lineImage: {
    marginVertical: '5%',
    width: '98%',
    alignSelf: 'center',
    tintColor: 'rgba(125, 125, 125, 0.6)',
  },
  input: {
    width: '100%',
    height: 45,
    borderColor: 'rgba(0,0,0,0.7)',
    borderWidth: 1,
    borderRadius: 7,
    marginBottom: '2%',
    paddingLeft: 10,
  },
  inputTitle: {
    fontSize: 16,
    color: 'black',
    //marginTop: '5%',
    fontFamily: 'Poppins Regular',
  },
  minMaxPriceText: {
    fontSize: 12,
    color: 'grey',
    fontFamily: 'Poppins Regular',
  },
  priceRangeValueText: {
    fontSize: 13,
    color: 'black',
    fontFamily: 'Poppins Regular',
  },
  limitContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  minInput: {
    width: '46%',
    height: 45,
    borderColor: 'rgba(0,0,0,0.7)',
    borderWidth: 1,
    borderRadius: 7,
    marginBottom: '2%',
    paddingLeft: 10,
  },
  rangerLine: {
    fontSize: 35,
    color: 'black',
  },
  availableText: {
    fontSize: 12,
    color: 'grey',
    fontFamily: 'Poppins Regular',
    alignSelf: 'flex-end',
  },
  createAdButton: {
    marginTop: '15%',
    marginBottom: '8%',
    width: '100%',
    height: 54.3,
  },
  createAdEnableButton: {
    marginTop: '15%',
    marginBottom: '8%',
    width: '100%',
    height: 53,
  },
});
