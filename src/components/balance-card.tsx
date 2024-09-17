import React, {useEffect, useMemo} from 'react';

import {clamp, formatNumber, reverseNumberFormat} from "@/core";
import {Text, View} from '@/ui'
import {Wallet} from "@/ui/icons";

const DEFAULT_CURRENCY = 'DT'

interface BalanceCardProps {
    balance: number;
    amount: string;
    onBalanceLimitReached: () => void;
}

const BalanceCard = ({balance, amount, onBalanceLimitReached}: BalanceCardProps) => {

    useEffect(() => {
        const parsedAmount = reverseNumberFormat(amount);
        if (parsedAmount > balance) {
            onBalanceLimitReached();
        }
    }, [balance, amount, onBalanceLimitReached]);
    const formattedBalance = useMemo(() => {
        const newBalance = clamp(balance - reverseNumberFormat(amount), 0, balance)
        return formatNumber(newBalance)
    }, [balance, amount])

    return (

        <View
            className={'flex-row items-center justify-center gap-1 self-center rounded-pill bg-neutral-100 px-3 py-1'}>
            <View className={'flex-row items-center justify-center'}>
                <Wallet width={16} height={14}/>
                <Text className={'font-ubuntu text-sm font-normal text-neutral-700'}>Balance:</Text>
            </View>
            <Text
                className={'font-ubuntu text-sm font-medium text-black'}>{formattedBalance + ' ' + DEFAULT_CURRENCY}</Text>
        </View>
    );
};

export default BalanceCard;
