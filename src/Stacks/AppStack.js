/* eslint-disable prettier/prettier */
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Deposit from '../Screens/Drawer/Depositwithdraw/Deposit';
import MainDrawer from './MainDrawer';

const Stack = createNativeStackNavigator();

const AppStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/* <Stack.Screen name="MainDrawer" component={MainDrawer} /> */}
        <Stack.Screen name="Deposit" component={Deposit} options={{
        headerShown: true, headerStyle: {
          backgroundColor: 'rgba(246,190,0,1)',
        }, headerTitleAlign: 'center',
      }} />
      {/* <Stack.Screen name="Transfer Amount" component={TransferAmount} options={{
        headerShown: true, headerStyle: {
          backgroundColor: 'rgba(246,190,0,1)',
        }, headerTitleAlign: 'center',
      }} />
      <Stack.Screen name="P2P Payment Methods" component={PaymentMethods} options={{
        headerShown: true, headerStyle: {
          backgroundColor: 'rgba(246,190,0,1)',
        }, headerTitleAlign: 'center',
      }} />
      <Stack.Screen name="Select a Payment Method" component={SelectPaymentMethod} options={{
        headerShown: true, headerStyle: {
          backgroundColor: 'rgba(246,190,0,1)',
        }, headerTitleAlign: 'center',
      }} />
      <Stack.Screen name="Add Bank Transfer" component={BankDetails} options={{
        headerShown: true, headerStyle: {
          backgroundColor: 'rgba(246,190,0,1)',
        }, headerTitleAlign: 'center',
      }} />
      <Stack.Screen name="Add Account" component={AddOtherPayment} options={{
        headerShown: true, headerStyle: {
          backgroundColor: 'rgba(246,190,0,1)',
        }, headerTitleAlign: 'center',
      }} />
      <Stack.Screen name="Feedback" component={FeedBack} options={{
        headerShown: true, headerStyle: {
          backgroundColor: 'rgba(246,190,0,1)',
        }, headerTitleAlign: 'center',
      }} />
      <Stack.Screen name="Buy" component={Buy} options={{
        headerShown: true, headerStyle: {
          backgroundColor: 'rgba(246,190,0,1)',
        }, headerTitleAlign: 'center',
      }} />
      <Stack.Screen name="Sell" component={Sell} options={{
        headerShown: true, headerStyle: {
          backgroundColor: 'rgba(246,190,0,1)',
        }, headerTitleAlign: 'center',
      }} />
      <Stack.Screen name="Pay The Seller" component={PayTheSeller} options={{
        headerShown: true, headerStyle: {
          backgroundColor: 'rgba(246,190,0,1)',
        }, headerTitleAlign: 'center',
      }} />
      <Stack.Screen name="Pay The Buyer" component={PayTheBuyer} options={{
        headerShown: true, headerStyle: {
          backgroundColor: 'rgba(246,190,0,1)',
        }, headerTitleAlign: 'center',
      }} />
      <Stack.Screen name="Payment Received" component={PaymentReceived} options={{
        headerShown: true, headerStyle: {
          backgroundColor: 'rgba(246,190,0,1)',
        }, headerTitleAlign: 'center',
      }} />
      <Stack.Screen name="Order Completed" component={OrderConfirm} options={{
        headerShown: true, headerStyle: {
          backgroundColor: 'rgba(246,190,0,1)',
        }, headerTitleAlign: 'center',
      }} />
      <Stack.Screen name="Post a new Add" component={PostAnAdd} options={{
        headerShown: true, headerStyle: {
          backgroundColor: 'rgba(246,190,0,1)',
        }, headerTitleAlign: 'center',
      }} />
      <Stack.Screen name="Confirm Deposit" component={DepositConfirm} options={{
        headerShown: true, headerStyle: {
          backgroundColor: 'rgba(246,190,0,1)',
        }, headerTitleAlign: 'center',
      }} />
      <Stack.Screen name="Pay to AHX" component={PayToAHX} options={{
        headerShown: true, headerStyle: {
          backgroundColor: 'rgba(246,190,0,1)',
        }, headerTitleAlign: 'center',
      }} />
      <Stack.Screen name="Confirm Withdraw" component={WithdrawConfirm} options={{
        headerShown: true, headerStyle: {
          backgroundColor: 'rgba(246,190,0,1)',
        }, headerTitleAlign: 'center',
      }} /> */}

    </Stack.Navigator>
  );
};

export default AppStack;
