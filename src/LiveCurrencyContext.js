import React, {createContext, useEffect, useState} from 'react';
import {Alert} from 'react-native';

const LiveCurrencyContext = createContext();

const API_KEY = '3acd87fb1c8783e5f1a30090cee8c1a0';

export const LiveCurrencyProvider = ({children}) => {
  const [currencies, setCurrencies] = useState([]);

  const fetchCurrencies = async () => {
    try {
      console.log('Fetching currency data...');
      let response = await fetch(
        `http://api.exchangeratesapi.io/v1/latest?access_key=${API_KEY}`,
      );
      if (!response.ok) {
        throw new Error('Failed to fetch currencies data');
      }
      let data = await response.json();
      console.log('API response:', data);

      if (data && data.rates) {
        const eurToPkrRate = data.rates.PKR;
        if (!eurToPkrRate) {
          throw new Error('PKR rate not found');
        }

        const rates = Object.keys(data.rates).map(currency => {
          if (currency === 'PKR') {
            return {currency: 'AZ-PKR', rate: 1};
          }
          return {
            currency: `AZ-${currency}`,
            rate: (eurToPkrRate / data.rates[currency]).toFixed(2),
          };
        });

        setCurrencies(rates);
        console.log('Currency API response:', rates);
      } else {
        throw new Error('Invalid data format');
      }
    } catch (error) {
      console.error('Error retrieving currencies data:', error);
      Alert.alert(
        'Error',
        'Failed to fetch currencies. Please try again later.',
      );
    }
  };

  useEffect(() => {
    fetchCurrencies();
  }, []);

  return (
    <LiveCurrencyContext.Provider value={{currencies}}>
      {children}
    </LiveCurrencyContext.Provider>
  );
};

export default LiveCurrencyContext;
