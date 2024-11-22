import { create } from 'zustand';

import { UserStored } from '@/models/user';

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
  const token = ''; // KeyStorage.getToken();
  const user = ''; // KeyStorage.getUser();
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
    // KeyStorage.setToken(token);
    // KeyStorage.setUser(user);
    set({
      isAuthenticated: handleAuth(),
    });
  },
  handleLogout: ({ needRedirect } = { needRedirect: false }) => {
    // KeyStorage.setToken('');
    // KeyStorage.setUser();
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
