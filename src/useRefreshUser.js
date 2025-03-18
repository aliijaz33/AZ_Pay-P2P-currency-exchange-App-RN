import {useContext} from 'react';
import UserContext from './UserContext';

const useRefreshUser = () => {
  const {refreshUser} = useContext(UserContext);
  return refreshUser;
};

export default useRefreshUser;
