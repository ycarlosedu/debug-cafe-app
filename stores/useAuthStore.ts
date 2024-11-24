import { create } from 'zustand';

import { UserStored } from '@/models/user';
import { secureStore } from '@/utils/secureStore';

type Store = {
  isAuthenticated: boolean;
  isGuest: boolean;
};

type Actions = {
  handleLogin: (token: string, user: UserStored) => void;
  handleGuestLogin: () => void;
  handleLogout: () => void;
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
  isGuest: false,
};

const useAuthStore = create<Store & Actions>((set, get) => ({
  ...initialState,
  handleLogin: (token: string, user: UserStored) => {
    secureStore.setToken(token);
    secureStore.setUser(user);
    set({
      isAuthenticated: handleAuth(),
    });
  },
  handleGuestLogin: () => {
    set({
      isGuest: true,
    });
  },
  handleLogout: () => {
    secureStore.setToken('');
    secureStore.setUser();
    set({
      isAuthenticated: false,
      isGuest: false,
    });
  },
  reset: () => {
    set(initialState);
  },
}));

export default useAuthStore;
