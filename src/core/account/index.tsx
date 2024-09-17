import { create } from 'zustand';

import { createSelectors } from '@/core';
import {DEFAULT_BALANCE} from "@/core/constants";

import { getToken, removeToken, setToken } from './utils';

interface AuthState {
  balance: number;
  name: string;
  phone: string;
  transfer: (amount: number) => void;
  reset: () => void;
  hydrate: () => void;
}

const _useAccount = create<AuthState>((set, get) => ({
  balance: DEFAULT_BALANCE,
  name: 'Foulen Fouleni',
  phone:'56565610',
  transfer: (amount) => {
    setToken({balance:amount});
    set({ balance:amount });
  },
  reset: () => {
    removeToken();
    set({ balance: DEFAULT_BALANCE });
  },
  hydrate: () => {
    try {
      const userToken = getToken();
      if (userToken !== null) {
        set({balance:userToken.balance})
      } else {
        get().reset();
      }
    } catch (e) {
      // catch error here
      // Maybe sign_out user!
    }
  },
}));

export const useAccount = createSelectors(_useAccount);

export const transfer = (val:number) => _useAccount.getState().transfer(val);
export const reset = () => _useAccount.getState().reset();
export const hydrateAccount = () => _useAccount.getState().hydrate();
