import React, {createContext, useEffect, useState, useCallback} from 'react';
import {Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserContext = createContext();

export const UserProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [forceUpdate, setForceUpdate] = useState(0);

  const fetchUser = useCallback(async () => {
    try {
      setLoading(true);
      const userToken = await AsyncStorage.getItem('user');
      if (!userToken) {
        console.log('No user token found in AsyncStorage');
        setUser(null);
        return;
      }
      let response = await fetch('http://10.0.2.2:4200/login');
      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }
      let data = await response.json();
      const {users} = data;

      const userTokenData = users.find(user => user.email === userToken);
      if (!userTokenData) {
        throw new Error('User data not found');
      }
      //console.log('From User Context file UserData---->', userTokenData);
      setUser(userTokenData);
    } catch (error) {
      console.error('Error retrieving user data:', error);
      if (user !== null) {
        Alert.alert('Error', 'Failed to login. Please try again later.');
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUser();
  }, [fetchUser, forceUpdate]);

  const refreshUser = useCallback(() => {
    setForceUpdate(prev => prev + 1);
  }, []);

  return (
    <UserContext.Provider value={{user, setUser, refreshUser, loading}}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
