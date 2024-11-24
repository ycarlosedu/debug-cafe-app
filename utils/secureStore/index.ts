import * as SecureStore from 'expo-secure-store';

import { UserStored } from '@/models/user';

export enum SECURE_STORE {
  TOKEN = 'TOKEN',
  USER = 'USER',
}

const toObject = (value?: string | null) => {
  return value ? JSON.parse(value) : {};
};

export const secureStore = {
  setToken: (token: string) => {
    return SecureStore.setItem(SECURE_STORE.TOKEN, token);
  },
  getToken: () => {
    return SecureStore.getItem(SECURE_STORE.TOKEN);
  },
  setUser: (user?: UserStored) => {
    return SecureStore.setItem(SECURE_STORE.USER, user ? JSON.stringify(user) : '');
  },
  getUser: () => {
    const user = SecureStore.getItem(SECURE_STORE.USER);
    return toObject(user) as UserStored;
  },
};
