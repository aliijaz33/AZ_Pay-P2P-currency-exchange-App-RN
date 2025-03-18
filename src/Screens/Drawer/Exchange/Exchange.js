import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Alert,
  Image,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import React, {useState, useEffect, useContext} from 'react';
import CustomDropdown from '../../../Custom_Components/CustomDropdown';
import AwesomeAlert from 'react-native-awesome-alerts';
import {useIsFocused} from '@react-navigation/native';
import UserContext from '../../../UserContext';
import useRefreshUser from '../../../useRefreshUser';
import LiveCurrencyContext from '../../../LiveCurrencyContext';

const Exchange = () => {
  const {user} = useContext(UserContext);
  const refreshUser = useRefreshUser();
  const {currencies} = useContext(LiveCurrencyContext);

  const [symbol1, setSymbol1] = useState('SELECT');
  const [symbol2, setSymbol2] = useState('SELECT');
  const [value1, setValue1] = useState(0);
  const [value2, setValue2] = useState(0);
  const [inputVisible, setInputVisible] = useState(false);
  const [input1, setInput1] = useState(false);
  const [input2, setInput2] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [indicator, setIndicator] = useState(false);
  const [isCancel, setIsCancel] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);
  const [avilableBalance1, setAvailableBalance1] = useState(0);
  const [avilableBalance2, setAvailableBalance2] = useState(0);

  const isFocused = useIsFocused();

  useEffect(() => {
    if (!isFocused) {
      setSymbol1('SELECT');
      setSymbol2('SELECT');
      setValue1(0);
      setValue2(0);
      setInput1(false);
      setInput2(false);
      setIsEnabled(false);
      setAvailableBalance1(0);
      setAvailableBalance2(0);
      refreshUser();
    }
  }, [isFocused]);

  useEffect(() => {
    const calculateValue2 = () => {
      if (
        symbol1 !== 'SELECT' &&
        symbol2 !== 'SELECT' &&
        currencies.length > 0
      ) {
        const extractCurrency = symbol => symbol;

        const rate1Currency = extractCurrency(symbol1);
        const rate2Currency = extractCurrency(symbol2);

        const rate1 =
          currencies.find(c => c.currency === rate1Currency)?.rate || 0;
        const rate2 =
          currencies.find(c => c.currency === rate2Currency)?.rate || 0;

        if (rate1 && rate2) {
          const calculatedValue2 = (value1 * rate2 * rate1).toFixed(7);
          setValue2(calculatedValue2);
          if (value1 !== 0) {
            setIsEnabled(true);
          }
        }
      }
    };

    refreshUser();
    calculateValue2();
  }, [symbol1, symbol2, value1, currencies]);

  const handleSwap = () => {
    const tempSymbol = symbol1;
    const tempValue = value1;
    const temavbBln1 = avilableBalance1;

    setSymbol1(symbol2);
    setValue1(value2);
    setAvailableBalance1(avilableBalance2);

    setSymbol2(tempSymbol);
    setValue2(tempValue);
    setAvailableBalance2(temavbBln1);
    refreshUser();
  };

  const cancelPressed = () => {
    setShowAlert(false);
    setIsCancel(true);
  };
  const confirmPressed = () => {
    setIndicator(true);
    setTimeout(() => {
      setIsCancel(false);
      setIndicator(false);
      setShowAlert(false);
      handleExchange();
    }, 1500);
  };

  const handleExchangebuttonPress = () => {
    if (value1 === 0.0) {
      Alert.alert('Attention!', 'Please enter value greater than 0');
    } else if (value1 > avilableBalance1) {
      Alert.alert(
        'Attention!',
        'Insufficient balance for the selected currency',
      );
    } else if (symbol1 === symbol2) {
      Alert.alert(
        'Attention!',
        `You can't perform exchange with same currency`,
      );
    } else {
      setShowAlert(true);
    }
  };
  const handleExchange = async () => {
    try {
      const response = await fetch('http://10.0.2.2:4200/exchange', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          address: user.address,
          sourceCurrency: symbol1,
          targetCurrency: symbol2,
          sourceAmount: parseFloat(value1),
          targetAmount: parseFloat(value2),
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setSymbol1('SELECT');
        setSymbol2('SELECT');
        setValue1(0);
        setValue2(0);
        setAvailableBalance1(0);
        setAvailableBalance2(0);
        refreshUser();
        console.log('Response exchange:', data.message);
      } else {
        console.log('Response exchange not successful:', response.statusText);
      }
    } catch (error) {
      console.error('Error exchanging currency:', error);
    }
  };

  const handleValueChange1 = (currency, balance) => {
    setSymbol1(currency);
    setAvailableBalance1(balance);
    setInput1(false);
    refreshUser();
    console.log('Selected Currency 1:', symbol1);
    console.log('Selected Currency 1 balance:', avilableBalance1);
  };
  const handleValueChange2 = (currency, balance) => {
    setSymbol2(currency);
    setAvailableBalance2(balance);
    setInput2(false);
    refreshUser();
    console.log('Selected Currency 2:', symbol2);
    console.log('Selected Currency 2 balance:', avilableBalance2);
  };
  const ShowInput1 = () => {
    setInputVisible(true);
    setInput1(true);
    setInput2(false);
    refreshUser();
  };
  const ShowInput2 = () => {
    setInputVisible(true);
    setInput1(false);
    setInput2(true);
    refreshUser();
  };
  const closeInput = () => {
    setInputVisible(false);
    refreshUser();
  };
  const CountPlus1 = () => {
    const numericValue = parseFloat(value1);
    if (!isNaN(numericValue)) {
      setValue1(numericValue + 1);
    }
  };
  const CountMinus1 = () => {
    const numericValue = parseFloat(value1);
    if (!isNaN(numericValue) && numericValue > 0) {
      setValue1(numericValue - 1);
    }
  };
  const CountPlus2 = () => {
    const numericValue = parseFloat(value2);
    if (!isNaN(numericValue)) {
      setValue2(numericValue + 1);
    }
  };
  const CountMinus2 = () => {
    const numericValue = parseFloat(value2);
    if (!isNaN(numericValue) && numericValue > 0) {
      setValue2(numericValue - 1);
    }
  };

  return (
    <View style={{flex: 1}}>
      <ImageBackground
        source={require('../../../Assets/Slicing/MainBackground.png')}
        style={styles.backgroundImage}
        resizeMode="cover">
        <View style={styles.container}>
          <View style={styles.currencyInputContainer}>
            <TouchableOpacity style={styles.selectSymbol} onPress={ShowInput1}>
              <Text style={styles.selectSymbolText}>{symbol1}</Text>
            </TouchableOpacity>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              onChangeText={val => setValue1(val)}
              value={value1.toString()}
              onFocus={closeInput}
            />
            <View>
              <TouchableOpacity style={styles.upIcon} onPress={CountPlus1}>
                <Image
                  source={require('../../../Assets/Exchange/UpArrow.png')}
                  style={styles.upArrow}
                />
              </TouchableOpacity>
              <TouchableOpacity style={styles.upIcon} onPress={CountMinus1}>
                <Image
                  source={require('../../../Assets/Exchange/DownArrow.png')}
                  style={styles.upArrow}
                />
              </TouchableOpacity>
            </View>
          </View>
          {symbol1 === 'SELECT' ? (
            <></>
          ) : (
            <Text style={styles.availableText}>
              {avilableBalance1} {symbol1}
            </Text>
          )}
          <TouchableOpacity
            style={styles.exchangeArrowButton}
            onPress={handleSwap}>
            <Image
              source={require('../../../Assets/Exchange/ExchangeArrow.png')}
              style={styles.exchangeArrow}
            />
          </TouchableOpacity>

          <View style={styles.currencyInputContainer}>
            <TouchableOpacity style={styles.selectSymbol} onPress={ShowInput2}>
              <Text style={styles.selectSymbolText}>{symbol2}</Text>
            </TouchableOpacity>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              onChangeText={val => setValue2(val)}
              value={value2.toString()}
              onFocus={closeInput}
            />
            <View>
              <TouchableOpacity style={styles.upIcon} onPress={CountPlus2}>
                <Image
                  source={require('../../../Assets/Exchange/UpArrow.png')}
                  style={styles.upArrow}
                />
              </TouchableOpacity>
              <TouchableOpacity style={styles.upIcon} onPress={CountMinus2}>
                <Image
                  source={require('../../../Assets/Exchange/DownArrow.png')}
                  style={styles.upArrow}
                />
              </TouchableOpacity>
            </View>
          </View>
          {symbol2 === 'SELECT' ? (
            <></>
          ) : (
            <Text style={styles.availableText}>
              {avilableBalance2} {symbol2}
            </Text>
          )}
          <TouchableOpacity
            disabled={!isEnabled}
            style={styles.button}
            onPressIn={handleExchangebuttonPress}>
            <Image
              source={require('../../../Assets/Slicing/Exchange/ExchangeBtn.png')}
              style={[
                styles.exchangeButton,
                isEnabled ? styles.enabledButton : styles.disabledButton,
              ]}
            />
          </TouchableOpacity>
        </View>

        <AwesomeAlert
          contentContainerStyle={styles.contentContainerStyle}
          show={showAlert}
          showCancelButton={true}
          cancelText="Cancel"
          cancelButtonTextStyle={{
            color: 'black',
            fontFamily: 'Poppins Regular',
          }}
          onCancelPressed={cancelPressed}
          showConfirmButton={true}
          confirmText="Confirm"
          confirmButtonStyle={{
            backgroundColor: 'black',
            marginLeft: 40,
          }}
          confirmButtonTextStyle={{fontFamily: 'Poppins Regular'}}
          onConfirmPressed={confirmPressed}
          showProgress={indicator}
          progressSize={40}
          progressColor="black"
          closeOnTouchOutside={false}
          closeOnHardwareBackPress={false}
          onDismiss={() => {
            isCancel
              ? Alert.alert('Cancel!', 'You Cancel This Exchange Transaction')
              : Alert.alert('Exchange', 'Success!');
          }}
          customView={
            <View style={styles.alertView}>
              <Text style={styles.alertText}>Do You want to Exchange</Text>
              <Text style={styles.alertConversionText}>
                {value1}{' '}
                <Text style={{fontWeight: 'bold', fontSize: 15}}>
                  {symbol1}
                </Text>
              </Text>
              <Text style={styles.alertConversionText}>to</Text>
              <Text style={styles.alertConversionText}>
                {value2}{' '}
                <Text style={{fontWeight: 'bold', fontSize: 15}}>
                  {symbol2}
                </Text>
              </Text>
            </View>
          }
        />

        {inputVisible && input1 && (
          <KeyboardAvoidingView
            style={[styles.keyboardAvoidingView, {marginTop: '5%'}]}>
            <ScrollView contentContainerStyle={styles.inputView}>
              <TouchableOpacity
                onPress={closeInput}
                style={styles.closeInputArrow}>
                <Image
                  source={require('../../../Assets/Transfer/CloseArrow.png')}
                  style={styles.closeImage}
                />
              </TouchableOpacity>
              <Text style={styles.selectCurrencyText}>Select Currency</Text>
              {}
              <CustomDropdown
                onValueChange={handleValueChange1}
                balance={avilableBalance1}
              />
            </ScrollView>
          </KeyboardAvoidingView>
        )}
        {inputVisible && input2 && (
          <KeyboardAvoidingView
            style={[styles.keyboardAvoidingView, {marginTop: '5%'}]}>
            <ScrollView contentContainerStyle={styles.inputView}>
              <TouchableOpacity
                onPress={closeInput}
                style={styles.closeInputArrow}>
                <Image
                  source={require('../../../Assets/Transfer/CloseArrow.png')}
                  style={styles.closeImage}
                />
              </TouchableOpacity>
              <Text style={styles.selectCurrencyText}>Select Currency</Text>
              {}
              <CustomDropdown
                onValueChange={handleValueChange2}
                balance={avilableBalance2}
              />
            </ScrollView>
          </KeyboardAvoidingView>
        )}
      </ImageBackground>
    </View>
  );
};

export default Exchange;

const styles = StyleSheet.create({
  backgroundImage: {
    width: '100%',
    height: '100%',
  },
  container: {
    marginTop: '23%',
  },
  currencyInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectSymbol: {
    width: 70,
    height: 40,
    borderWidth: 1.5,
    borderColor: 'black',
    borderRadius: 7,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: '12%',
    marginRight: '7%',
  },
  selectSymbolText: {
    //fontSize: 13,
    fontWeight: 'bold',
    color: 'black',
    fontFamily: 'Poppins Regular',
  },
  input: {
    width: 150,
    height: 55,
    backgroundColor: 'rgba(125, 125, 125, 0.2)',
    borderRadius: 8,
    borderColor: 'black',
    borderWidth: 1,
    color: 'black',
    fontFamily: 'Poppins Regular',
    fontSize: 18,
    paddingLeft: 8,
  },
  upIcon: {
    marginLeft: -18,
    margin: 8,
  },
  upArrow: {
    width: 13,
    height: 11,
    tintColor: 'black',
  },
  availableText: {
    fontSize: 12,
    color: 'black',
    alignSelf: 'center',
    marginLeft: '23%',
    marginTop: '2%',
  },
  exchangeArrow: {
    width: 25,
    height: 25,
    tintColor: 'black',
  },
  exchangeArrowButton: {
    alignSelf: 'center',
    margin: '5%',
    paddingLeft: '7%',
  },
  button: {
    alignSelf: 'center',
    marginTop: '56%',
  },
  exchangeButton: {
    width: 198,
    height: 45.2,
  },
  enabledButton: {
    opacity: 1,
  },
  disabledButton: {
    opacity: 0.7,
  },
  keyboardAvoidingView: {
    flex: 1,
    marginTop: '5%',
    position: 'absolute',
    bottom: 0,
    height: 400,
    width: '100%',
  },
  inputView: {
    flexGrow: 1,
    backgroundColor: 'rgba(0,0,0,0.83)',
    padding: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    width: '100%',
  },
  closeInputArrow: {
    alignSelf: 'center',
  },
  closeImage: {
    width: 25,
    height: 13,
    tintColor: 'white',
  },
  selectCurrencyText: {
    color: 'white',
    fontSize: 25,
    fontFamily: 'Poppins Regular',
    alignSelf: 'center',
    marginTop: '3%',
  },

  contentContainerStyle: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  alertView: {
    alignItems: 'center',
  },
  alertText: {
    color: 'black',
    fontFamily: 'Poppins Regular',
    fontSize: 20,
  },
  alertConversionText: {
    color: 'black',
    fontFamily: 'Poppins Regular',
    fontSize: 17,
  },
});
