import { create } from 'zustand';

import { USER_TYPE } from '@/constants';
import { UserStored } from '@/models/user';
import { secureStore } from '@/utils/secureStore';

type Store = {
  isAuthenticated: boolean;
  isGuest: boolean;
  userType: USER_TYPE;
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
  userType: secureStore.getUserType() || USER_TYPE.CLIENT,
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
  handleChangeUserType: (userType: USER_TYPE) => {
    secureStore.setUserType(userType);
    set({
      userType,
    });
  },
  reset: () => {
    set(initialState);
  },
}));

export default useAuthStore;
