import { Linking } from 'react-native';
import type { StoreApi, UseBoundStore } from 'zustand';

import {FEE_CAP , FEE_DISCOUNT, FEE_RATE} from "@/core/constants";

export function openLinkInBrowser(url: string) {
  Linking.canOpenURL(url).then((canOpen) => canOpen && Linking.openURL(url));
}

type WithSelectors<S> = S extends { getState: () => infer T }
  ? S & { use: { [K in keyof T]: () => T[K] } }
  : never;

export const createSelectors = <S extends UseBoundStore<StoreApi<object>>>(
  _store: S
) => {
  let store = _store as WithSelectors<typeof _store>;
  store.use = {};
  for (let k of Object.keys(store.getState())) {
    (store.use as any)[k] = () => store((s) => s[k as keyof typeof s]);
  }

  return store;
};

export const maskPhoneNumber =(phoneNumber :string)=> {
  const start = phoneNumber.slice(0, 2);
  const end = phoneNumber.slice(-2);
  const masked = '*'.repeat(phoneNumber.length - 4);
  return `${start}${masked}${end}`;
}

export const formatNumber = (value: string | number) => {
  if (value === 0) return '0.000';
  if (!value || isNaN(Number(value)) ) return '';
  return new Intl.NumberFormat("en-IN", {
    minimumFractionDigits: 3,
    maximumFractionDigits: 3,
  }).format(parseFloat(String(value)));
};
export const reverseNumberFormat = (formattedNumber: string | undefined): number => {
  if (!formattedNumber || isNaN(Number(formattedNumber.replace(/,/g, '')))) {
    return 0;
  }
  const cleanedNumber = formattedNumber.replace(/,/g, '');
  return parseFloat(cleanedNumber) || 0;
};
export const clamp=(value: number, min: number, max: number): number=> {
  return Math.max(min, Math.min(value, max));
}

export const calculateFee=(amount:string): number=> {
  const stripedAmount=reverseNumberFormat(amount)
  if( stripedAmount<20 && stripedAmount>0)
  {
    return FEE_DISCOUNT
  }
  return clamp(stripedAmount * FEE_RATE,0,FEE_CAP )

}
export const calculateTotal=(amount:string): number=> {
  const stripedAmount=reverseNumberFormat(amount)
  return stripedAmount+calculateFee(amount)
}

export const calculateMaxAllowance = (balance: number): number => {
  if (balance <= 0) return 0;

  if (balance < 20) {
    return balance - FEE_DISCOUNT;
  }

  const maxWithoutCap = balance / (1 + FEE_RATE);
  const calculatedFee = maxWithoutCap * FEE_RATE;

  if (calculatedFee > FEE_CAP ) {
    return balance - FEE_CAP ;
  }
  return maxWithoutCap;
};
