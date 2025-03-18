import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Splash from '../Screens/Splash';
import Login from '../Screens/Login';
import Signup from '../Screens/Signup';
import MainDrawer from './MainDrawer';
import Deposit from '../Screens/Drawer/Depositwithdraw/Deposit';
import ConfirmDeposit from '../Screens/Drawer/Depositwithdraw/ConfirmDeposit';
import Withdraw from '../Screens/Drawer/Depositwithdraw/Withdraw';
import WithdrawAmount from '../Screens/Drawer/Depositwithdraw/WithdrawAmount';
import ConfirmWithdraw from '../Screens/Drawer/Depositwithdraw/ConfirmWithdraw';
import BottomNavigator from '../Screens/BottomTab/BottomNavigator';
import CreateAd from '../Screens/BottomTab/PostAd/CreateAd';
import AdCreated from '../Screens/BottomTab/PostAd/AdCreated';
import BuyAmount from '../Screens/BottomTab/P2P/BuyAmount';
import CreateProfile from '../Screens/BottomTab/Profile/CreateProfile';
import PaymentMethods from '../Screens/BottomTab/Profile/PaymentMethods';
import AddPaymentMethod from '../Screens/BottomTab/Profile/AddPaymentMethod';
import Verification from '../Screens/BottomTab/Profile/Verification';
import SellAmount from '../Screens/BottomTab/P2P/SellAmount';
import PayTheSeller from '../Screens/BottomTab/P2P/PayTheSeller';
import ReleaseToBuyer from '../Screens/BottomTab/P2P/Trader/ReleaseToBuyer';
import PayTheBuyer from '../Screens/BottomTab/P2P/PayTheBuyer';
import ReleaseToSeller from '../Screens/BottomTab/P2P/Trader/ReleaseToSeller';
import AvailableCurrencies from '../Screens/AvailableCurrencies';
import Notifications from '../Screens/BottomTab/Profile/Notifications';
import Chat from '../Screens/BottomTab/P2P/Chat';
import ChangeName from '../Screens/Drawer/Settings/ChangeName';
import P2PGuide from '../Screens/BottomTab/Profile/P2PGuide';
import FAQs from '../Screens/BottomTab/Profile/FAQs';
import ChangePassword from '../Screens/Drawer/Settings/ChangePassword';
import VerifyEmail from '../Screens/Drawer/Settings/VerifyEmail';

const Stack = createNativeStackNavigator();

const MainStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="MainDrawer" component={MainDrawer} />
      <Stack.Screen name="Deposit" component={Deposit} />
      <Stack.Screen name="Confirm Deposit" component={ConfirmDeposit} />
      <Stack.Screen name="Withdraw" component={Withdraw} />
      <Stack.Screen name="Withdraw Amount" component={WithdrawAmount} />
      <Stack.Screen name="Confirm Withdraw" component={ConfirmWithdraw} />
      <Stack.Screen name="BottomNavigator" component={BottomNavigator} />
      <Stack.Screen name="Create an Ad" component={CreateAd} />
      <Stack.Screen name="Ad Created" component={AdCreated} />
      <Stack.Screen name="Create Profile" component={CreateProfile} />
      <Stack.Screen name="P2P Guide" component={P2PGuide} />
      <Stack.Screen name="FAQs" component={FAQs} />

      <Stack.Screen name="Payment Methods" component={PaymentMethods} />
      <Stack.Screen name="Add Payment Method" component={AddPaymentMethod} />
      <Stack.Screen name="Verification" component={Verification} />
      <Stack.Screen name="My Portfolio" component={AvailableCurrencies} />
      <Stack.Screen name="Notification Center" component={Notifications} />
      <Stack.Screen name="Chat" component={Chat} />

      <Stack.Screen name="Buy" component={BuyAmount} />
      <Stack.Screen name="Pay the seller" component={PayTheSeller} />
      <Stack.Screen name="Release Payment" component={ReleaseToBuyer} />

      <Stack.Screen name="Sell" component={SellAmount} />
      <Stack.Screen name="Pay the buyer" component={PayTheBuyer} />
      <Stack.Screen name="Transfer To Seller" component={ReleaseToSeller} />

      <Stack.Screen name="Change Name" component={ChangeName} />
      <Stack.Screen name="Change Password" component={ChangePassword} />
      <Stack.Screen name="Verify Email" component={VerifyEmail} />
    </Stack.Navigator>
  );
};

export default MainStack;

// <Stack.Navigator screenOptions={{ headerShown: false }}>
//   <Stack.Screen name="AuthStack" component={AuthStack} />
//   <Stack.Screen name="AppStack" component={AppStack} />
// </Stack.Navigator>
