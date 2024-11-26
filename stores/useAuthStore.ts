import { create } from 'zustand';

import { UserStored } from '@/models/user';
import { secureStore } from '@/utils/secureStore';

type Store = {
  isAuthenticated: boolean;
  user?: UserStored;
};

type Actions = {
  handleLogin: (token: string, user: UserStored) => void;
  handleLogout: () => void;
  handleChangeUserInfos: (user: UserStored) => void;
  reset: () => void;
};

const handleAuth = () => {
  const token = secureStore.getToken();
  const user = secureStore.getUser();
  if (!token || !user) {
    return false;
  }
  return true;
};

const initialState: Store = {
  isAuthenticated: handleAuth(),
  user: secureStore.getUser(),
};

const useAuthStore = create<Store & Actions>((set, get) => ({
  ...initialState,
  handleLogin: (token: string, user: UserStored) => {
    secureStore.setToken(token);
    secureStore.setUser(user);
    set({
      isAuthenticated: handleAuth(),
      user,
    });
  },
  handleLogout: () => {
    secureStore.setToken('');
    secureStore.setUser();
    set({
      isAuthenticated: false,
      user: undefined,
    });
  },
  handleChangeUserInfos: (user: UserStored) => {
    secureStore.setUser(user);
    set({
      user,
    });
  },
  reset: () => {
    set(initialState);
  },
}));

export default useAuthStore;
