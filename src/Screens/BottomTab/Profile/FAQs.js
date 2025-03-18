import {StyleSheet, ScrollView, Text, View} from 'react-native';
import React from 'react';
import Custom_BG from '../../../Custom_Components/Custom_BG';

const FAQs = () => {
  return (
    <Custom_BG>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.headingText}>Frequently Asked Questions</Text>
        <Text style={styles.questionText}>
          Q1. What is P2P currency trading?
        </Text>
        <Text style={styles.answerText}>
          Peer-to-peer currency trading allows users to trade currencies
          directly with each other without intermediaries.
        </Text>

        <Text style={styles.questionText}>
          Q2. What currencies can I trade on AZ-Pay?
        </Text>
        <Text style={styles.answerText}>
          AZ-Pay supports a wide range of currencies. Check the current list of
          supported currencies in the app.
        </Text>

        <Text style={styles.questionText}>Q3. Is there a fee for trading?</Text>
        <Text style={styles.answerText}>
          AZ-Pay charges minimal transaction fees.
        </Text>

        <Text style={styles.questionText}>
          Q4. How are exchange rates determined?
        </Text>
        <Text style={styles.answerText}>
          Exchange rates are determined by real-time market data and user-set
          rates for each trade offer.
        </Text>

        <Text style={styles.questionText}>
          Q5. What security measures are in place?
        </Text>
        <Text style={styles.answerText}>
          The app uses two-factor authentication, encryption, and other security
          protocols to protect your data and transactions.
        </Text>

        <Text style={styles.questionText}>
          Q6. What should I do if I encounter a problem with a trade?
        </Text>
        <Text style={styles.answerText}>
          Use the in-app support feature to report the issue or contact customer
          support for assistance.
        </Text>

        <Text style={styles.questionText}>
          Q7. How do I leave feedback for a trading partner?
        </Text>
        <Text style={styles.answerText}>
          After completing a trade, you can rate and leave feedback for your
          trading partner in the 'Completed Trades' section.
        </Text>
      </ScrollView>
    </Custom_BG>
  );
};

export default FAQs;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: '5%',
  },
  headingText: {
    fontSize: 25,
    color: 'black',
    fontWeight: 'bold',
    fontFamily: 'Poppins Regular',
    textAlign: 'justify',
    marginTop: '2%',
    textDecorationLine: 'underline',
  },
  questionText: {
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
    fontFamily: 'Poppins Regular',
    textAlign: 'justify',
    marginTop: '4%',
  },
  answerText: {
    fontSize: 18,
    color: 'black',
    fontFamily: 'Poppins Regular',
    textAlign: 'justify',
    marginTop: '2%',
  },
});
