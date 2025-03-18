import {StyleSheet, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Dashboard from './Dashboard';
import P2PTrading from './P2PTrading';
import DepositWithdraw from './Depositwithdraw/DepositWithdraw';
import Transfer from './Transfer/Transfer';
import Exchange from './Exchange/Exchange';
import History from './History';
import Settings from './Settings/Settings';

import CustomDrawer from '../../Custom_Components/CustomDrawer';
import CustomHeader from '../../Custom_Components/CustomHeader';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawer {...props} />}
      screenOptions={({navigation}) => ({
        headerShown: true,
        drawerActiveBackgroundColor: 'rgba(125,125,125,0.3)',
        drawerActiveTintColor: 'rgba(0,0,0,1)',
        drawerInactiveTintColor: 'rgba(0,0,0,0.8)',
        header: () => <CustomHeader showMenuIcon={true} color="black" />,
        headerStyle: {backgroundColor: 'transparent'},
        headerTransparent: true,
        drawerLabelStyle: {
          marginLeft: -12,
          fontFamily: 'Poppins Regular',
          fontSize: 15,
          //fontWeight: 'bold',
        },
      })}>
      <Drawer.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          headerShown: false,
          drawerIcon: ({color}) => (
            <Image
              source={require('../../Assets/Menu/HomeLogo.png')}
              style={{width: 28, height: 28, tintColor: color}}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="P2P Trading"
        component={P2PTrading}
        options={{
          drawerIcon: ({color}) => (
            <Image
              source={require('../../Assets/Menu/P2PLogo.png')}
              style={{width: 29, height: 29, tintColor: color}}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Deposit/Withdraw"
        component={DepositWithdraw}
        options={{
          drawerIcon: ({color}) => (
            <Image
              source={require('../../Assets/Menu/DepositLogo.png')}
              style={{width: 30, height: 30, tintColor: color}}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Transfer"
        component={Transfer}
        options={{
          drawerIcon: ({color}) => (
            <Image
              source={require('../../Assets/Menu/TransferLogo.png')}
              style={{width: 29, height: 29, tintColor: color}}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Exchange"
        component={Exchange}
        options={{
          drawerIcon: ({color}) => (
            <Image
              source={require('../../Assets/Menu/ExchangeLogo.png')}
              style={{width: 29, height: 29, tintColor: color}}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="History"
        component={History}
        options={{
          drawerIcon: ({color}) => (
            <Image
              source={require('../../Assets/Menu/HistoryLogo.png')}
              style={{width: 29, height: 27, tintColor: color}}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Settings"
        component={Settings}
        options={{
          drawerIcon: ({color}) => (
            <Image
              source={require('../../Assets/Main/SettingLogo.png')}
              style={{width: 29, height: 29, tintColor: color}}
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;

//For Header Customization

// headerTintColor: '#fff',
// headerStyle: {
//   backgroundColor: 'rgba(0,100,255,1)',
// },
// headerTitleStyle: {
//   fontFamily: 'Poppins Regular',
//   fontSize: 22
// },
// headerLeft: () => (
//   <TouchableOpacity onPress={() => navigation.openDrawer()} style={{ marginLeft: 15 }}>
//     <Image
//       source={require('../../Assets/Dashboard/MenuLogo.png')}
//       style={{ width: 25, height: 25, resizeMode: 'contain', tintColor: 'white' }}
//     />
//   </TouchableOpacity>
// ),
// headerTitleAlign: 'center',
