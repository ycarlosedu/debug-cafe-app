import { create } from 'zustand';

export enum MENU_STORE {
  DELETE_DIALOG = 'isConfirmDeleteDialogOpen',
}

type Store = {
  [MENU_STORE.DELETE_DIALOG]: boolean;
};

type Actions = {
  handleChangeMenu: (menu: MENU_STORE, isOpen: boolean) => void;
  reset: () => void;
};

const initialState: Store = {
  [MENU_STORE.DELETE_DIALOG]: false,
};

const useMenuStore = create<Store & Actions>((set, get) => ({
  ...initialState,
  handleChangeMenu: (menu: MENU_STORE, isOpen: boolean) => {
    set({
      [menu]: isOpen,
    });
  },
  reset: () => {
    set(initialState);
  },
}));

export default useMenuStore;
