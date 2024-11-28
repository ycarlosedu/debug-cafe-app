import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

import { USER_TYPE } from '@/constants';
import { UserStored } from '@/models/user';

export enum SECURE_STORE {
  TOKEN = 'TOKEN',
  USER = 'USER',
  USER_TYPE = 'USER_TYPE',
}

const toObject = (value?: string | null) => {
  return value ? JSON.parse(value) : {};
};

function saveItem(key: SECURE_STORE, value: string) {
  if (Platform.OS === 'web') {
    return localStorage.setItem(key, value);
  }

  SecureStore.setItem(key, value);
}

function getItem(key: SECURE_STORE) {
  if (Platform.OS === 'web') {
    return localStorage.getItem(key);
  }
  return SecureStore.getItem(key);
}

export const secureStore = {
  setToken: (token: string) => {
    return saveItem(SECURE_STORE.TOKEN, token);
  },
  getToken: () => {
    return getItem(SECURE_STORE.TOKEN);
  },
  setUser: (user?: UserStored) => {
    return saveItem(SECURE_STORE.USER, user ? JSON.stringify(user) : '');
  },
  getUser: () => {
    const user = getItem(SECURE_STORE.USER);
    return toObject(user) as UserStored;
  },
  setUserType: (userType: USER_TYPE) => {
    return saveItem(SECURE_STORE.USER_TYPE, userType);
  },
  getUserType: () => {
    return getItem(SECURE_STORE.USER_TYPE) as USER_TYPE;
  },
};
