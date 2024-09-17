import { getItem, removeItem, setItem } from '@/core/storage';

const BALANCE = 'balance';

export type AccountType = {
  balance: number;
};

export const getToken = () => getItem<AccountType>(BALANCE);
export const removeToken = () => removeItem(BALANCE);
export const setToken = (value: AccountType) => setItem<AccountType>(BALANCE, value);
