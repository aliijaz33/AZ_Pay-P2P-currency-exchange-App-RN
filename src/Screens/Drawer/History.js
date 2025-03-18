import {StyleSheet, Text, FlatList, ImageBackground, View} from 'react-native';
import React, {useContext} from 'react';
import Custom_BG from '../../Custom_Components/Custom_BG';
import CompletedOrderBox from '../BottomTab/Orders/CompletedOrderBox';
import UserContext from '../../UserContext';

const History = () => {
  const {user} = useContext(UserContext);

  return (
    <View style={{flex: 1}}>
      <ImageBackground
        source={require('../../Assets/Slicing/MainBackground.png')}
        style={styles.backgroundImage}
        resizeMode="cover">
        <View style={styles.container}>
          <FlatList
            data={user.completedOrders}
            renderItem={({item}) => <CompletedOrderBox notification={item} />}
          />
        </View>
      </ImageBackground>
    </View>
  );
};

export default History;

const styles = StyleSheet.create({
  backgroundImage: {
    width: '100%',
    height: '100%',
  },
  container: {
    marginTop: '17%',
    paddingHorizontal: '2%',
  },
});
