import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Custom_BG from '../../../Custom_Components/Custom_BG';

export default function P2PGuide() {
  return (
    <Custom_BG>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.text}>
          Creating trade offers on AZ-Pay is straightforward. Navigate to the
          'P2P Trading' section, where you can select the currency you wish to
          trade. You can browse through existing trade offers from other users
          in the 'Offers List' and choose the ones that meet your needs.
        </Text>

        <Text style={styles.text}>
          When you find a suitable trade offer, you can view the trader’s
          information and decide to deal with that person. The app facilitates
          an in-app chat feature that allows you to negotiate trade details and
          ensure both parties are satisfied with the terms. This chat function
          is secure and provides a convenient way to communicate directly with
          your trading partner.
        </Text>
        <Text style={styles.text}>
          Completing a transaction involves releasing payment once a trade offer
          is accepted. The app ensures that all transactions are secure and
          timely, thanks to features like two-factor authentication and
          encryption. After the trade is completed, you can leave feedback and
          rate your trading partner. This feedback system helps build a
          trustworthy community and ensures that all users maintain high
          standards of conduct.
        </Text>

        <Text style={styles.text}>
          For any issues or questions, the app offers troubleshooting tips and a
          support feature to help resolve common problems. Additionally, you can
          contact customer support for further assistance. By following these
          guidelines, you can take full advantage of the AZ-Pay P2P Currency
          Exchange App, enjoying a transparent, efficient, and secure trading
          experience.
        </Text>
      </ScrollView>
    </Custom_BG>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    paddingHorizontal: '5%',
  },
  text: {
    fontSize: 16,
    color: 'black',
    //marginTop: '5%',
    fontFamily: 'Poppins Regular',
    textAlign: 'justify',
    marginVertical: '3%',
  },
});
