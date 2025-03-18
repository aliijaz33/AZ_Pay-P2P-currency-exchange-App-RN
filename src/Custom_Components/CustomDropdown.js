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

  console.log(select);

  return (
    <View>
      <SelectList
        setSelected={handleChange}
        data={dropdownData}
        boxStyles={styles.selectBox}
        placeholder="Select Currency"
        arrowicon={
          <Image
            source={require('../Assets/Transfer/DropdownDown.png')}
            style={styles.dropDownarrow}
          />
        }
        inputStyles={styles.selectInputStyle}
        dropdownStyles={styles.dropdownStyles}
        dropdownTextStyles={styles.dropdownTextStyles}
        save="value"
      />
    </View>
  );
};

export default CustomDropdown;

const styles = StyleSheet.create({
  selectBox: {
    backgroundColor: 'white',
    borderColor: 'rgba(230,230,230,0.9)',
    width: '92%',
    alignSelf: 'center',
  },
  dropDownarrow: {
    width: 17,
    height: 9,
    marginTop: 5,
    marginRight: -6,
    tintColor: 'black',
  },
  selectInputStyle: {
    fontSize: 17,
    marginLeft: -7,
    color: 'black',
  },
  dropdownStyles: {
    width: '90%',
    alignSelf: 'center',
    backgroundColor: 'white',
  },
  dropdownTextStyles: {
    fontSize: 18,
    color: 'black',
    fontFamily: 'Poppins Regular',
  },
});

// color: 'rgba(0,100,255,1)',
//     fontFamily: 'Poppins Regular',
