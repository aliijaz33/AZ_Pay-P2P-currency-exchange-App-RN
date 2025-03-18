import React, {createContext, useEffect, useState, useCallback} from 'react';
import {Alert, ActivityIndicator, View} from 'react-native';

const CurrencyContext = createContext();

export const CurrencyProvider = ({children}) => {
  const [currencies, setCurrencies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCurrencies = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      let response = await fetch('http://10.0.2.2:4200/getCurrencies');
      if (!response.ok) {
        throw new Error('Failed to fetch currencies data');
      }
      let data = await response.json();
      setCurrencies(data);
    } catch (error) {
      console.error('Error retrieving currencies data:', error);
      setError('Failed to fetch currencies. Please try again later.');

      Alert.alert(
        'Error',
        'Failed to fetch currencies. Please try again later.',
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCurrencies();
  }, [fetchCurrencies]);

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
    <CurrencyContext.Provider value={{currencies}}>
      {children}
    </CurrencyContext.Provider>
  );
};

export default CurrencyContext;
