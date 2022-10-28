import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { Store } from '../Store';

export default function ProviderRoute({ children }) {
  const { state } = useContext(Store);
  const { userInfo } = state;
  return userInfo && userInfo.roleName === 'provider' ? (
    children
  ) : (
    <Navigate to="/signin" />
  );
}
