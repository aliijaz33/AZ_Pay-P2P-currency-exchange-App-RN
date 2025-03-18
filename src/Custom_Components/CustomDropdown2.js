import {StyleSheet, Text, View, Image} from 'react-native';
import React, {useState, useContext} from 'react';
import {SelectList} from 'react-native-dropdown-select-list';
import UserContext from '../UserContext';

const CustomDropdown = ({onValueChange, balance}) => {
  const [select, setSelect] = useState('');
  const {user} = useContext(UserContext);

  const currencies = user.currencies;

  const dropdownData = currencies.map((currency, index) => ({
    key: index.toString(),
    value: currency.currency,
    price: currency.balance,
  }));

  const handleChange = val => {
    setSelect(val);
    onValueChange(val, getBalance(val));
  };

  const getBalance = currency => {
    const selectedCurrency = currencies.find(c => c.currency === currency);
    return selectedCurrency ? selectedCurrency.balance : 0;
  };

  return (
    <View>
      <SelectList
        setSelected={handleChange}
        data={dropdownData}
        boxStyles={styles.selectBox}
        placeholder="Select Currency"
        arrowicon={
          <Image
            source={require('../Assets/Slicing/P2P/PostAds/DropDownArrow.png')}
            style={styles.dropDownarrow}
          />
        }
        inputStyles={styles.selectInputStyle}
        dropdownStyles={styles.dropdownStyles}
        dropdownTextStyles={styles.dropdownTextStyles}
        dropdownItemStyles={styles.dropdownItemStyles}
        save="value"
      />
    </View>
  );
};

export default CustomDropdown;

const styles = StyleSheet.create({
  selectBox: {
    backgroundColor: 'rgba(255,255,255,1)',
    borderColor: 'rgba(0,0,0,0.7)',
    width: '100%',
    height: 45,
    alignSelf: 'center',
  },
  dropDownarrow: {
    width: 17,
    height: 9,
    marginTop: 5,
    marginRight: -6,
  },
  selectInputStyle: {
    fontSize: 15,
    marginLeft: -7,
    color: 'black',
  },
  dropdownStyles: {
    width: '90%',
    alignSelf: 'center',
    backgroundColor: 'rgba(125,125,125,0.4)',
  },
  dropdownTextStyles: {
    fontSize: 18,
    color: 'black',
    fontFamily: 'Poppins Regular',
    marginLeft: '-6%',
  },
  dropdownItemStyles: {
    borderBottomColor: 'black',
    borderBottomWidth: 0.5,
    width: '90%',
    alignSelf: 'center',
  },
});

// color: 'rgba(0,100,255,1)',
//     fontFamily: 'Poppins Regular',
