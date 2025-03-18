import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import Custom_BG from '../Custom_Components/Custom_BG';
import UserContext from '../UserContext';
import CurrencyContext from '../CurrencyContext';
import PortfolioBox from '../Custom_Components/PortfolioBox';

const AvailableCurrencies = () => {
  const {user} = useContext(UserContext);
  const {currencies: contextCurrencies} = useContext(CurrencyContext);
  const [currency, setCurrency] = useState([]);

  useEffect(() => {
    mergeCurrencies();
  }, []);

  const mergeCurrencies = () => {
    const merged = user.currencies.map(userCurrency => {
      const contextCurrency = contextCurrencies.find(
        c => c.name === userCurrency.currency,
      );
      return {
        ...userCurrency,
        imageUrl: contextCurrency ? contextCurrency.imageUrl : null,
        symbol: contextCurrency ? contextCurrency.symbol : null,
      };
    });
    setCurrency(merged);
  };
  return (
    <Custom_BG>
      <FlatList
        data={currency}
        renderItem={({item, index}) => (
          <PortfolioBox
            key={index}
            currencyName={item.currency}
            currencyImage={item.imageUrl}
            currencySymbol={item.symbol}
            currentBalance={item.balance.toFixed(1)}
          />
        )}
      />
    </Custom_BG>
  );
};

export default AvailableCurrencies;

const styles = StyleSheet.create({});
