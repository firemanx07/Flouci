import React, {useMemo} from 'react';

import {calculateFee, calculateTotal, formatNumber} from "@/core";
import {DEFAULT_CURRENCY} from "@/core/constants";
import {Text, View} from '@/ui'


const DebitInfo = ({amount}: { amount: string }) => {

    const {fees,total}=useMemo(()=>{
        const appliedFee=calculateFee(amount)
        const total= formatNumber(calculateTotal(amount))
        return {fees:formatNumber(appliedFee),total}
    },[amount])
    return (
        <View className={'gap-1'}>
            <View className={'flex-row items-center justify-between'}>
                <Text className={'font-ubuntu text-base  text-neutral-700'}>Fees:</Text>
                <Text className={'font-ubuntu text-base  text-neutral-700'}>{fees.concat(' ' + DEFAULT_CURRENCY)}</Text>
            </View>
            <View className={'flex-row items-center justify-between'}>
                <Text className={'font-ubuntu text-base font-black'}>Total:</Text>
                <Text
                    className={'font-ubuntuMedium text-base font-medium text-black'}>{total.concat(' ' + DEFAULT_CURRENCY)}</Text>
            </View>

        </View>
    );
};

export default DebitInfo;
