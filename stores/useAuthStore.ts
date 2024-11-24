import { create } from 'zustand';

import { UserStored } from '@/models/user';
import { secureStore } from '@/utils/secureStore';

type Store = {
  isAuthenticated: boolean;
  needRedirect: boolean;
};

type LogoutProps = {
  needRedirect?: boolean;
};

type Actions = {
  handleLogin: (token: string, user: UserStored) => void;
  handleLogout: (logoutOptions?: LogoutProps) => void;
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
  needRedirect: false,
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
  handleLogout: ({ needRedirect } = { needRedirect: false }) => {
    secureStore.setToken('');
    secureStore.setUser();
    set({
      isAuthenticated: false,
      needRedirect,
    });
  },
  reset: () => {
    set(initialState);
  },
}));

export default useAuthStore;
