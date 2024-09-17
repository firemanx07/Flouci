import React, {useMemo} from 'react';
import Animated, {FadeInUp, LinearTransition} from 'react-native-reanimated';

import {calculateFee, calculateTotal, formatNumber} from "@/core";
import {DEFAULT_CURRENCY, FEE_DISCOUNT} from "@/core/constants";
import {Text, View} from '@/ui'

const DISCOUNT_MESSAGE='Enjoy your first 20 DT of the day with a fee of 5 millimes.'
const DebitInfo = ({amount}: { amount: string }) => {

    const {fees,total,discountApplied}=useMemo(()=>{
        const appliedFee=calculateFee(amount)
        const total= formatNumber(calculateTotal(amount))
        const discountApplied= appliedFee === FEE_DISCOUNT
        return {fees:formatNumber(appliedFee),total,discountApplied}
    },[amount])
    return (
        <View className={'gap-1'}>
            {discountApplied &&
            <Animated.View className={'justify-center rounded bg-success-100 p-1.5'} entering={FadeInUp} layout={LinearTransition}>
                <Text className={'font-ubuntu text-xs text-success-500'}>{DISCOUNT_MESSAGE}</Text>
            </Animated.View>
            }
            <Animated.View className={'flex-row items-center justify-between '} layout={LinearTransition}>
                <Text className={'font-ubuntu text-base  text-charcoal-700'}>Fees:</Text>
                <Text className={'font-ubuntu text-base  text-neutral-700'}>{fees.concat(' ' + DEFAULT_CURRENCY)}</Text>
            </Animated.View>
            <Animated.View className={'flex-row items-center justify-between'} layout={LinearTransition}>
                <Text className={'font-ubuntu text-base font-black'}>Total:</Text>
                <Text
                    className={'font-ubuntuMedium text-base font-medium text-black'}>{total.concat(' ' + DEFAULT_CURRENCY)}</Text>
            </Animated.View>

        </View>
    );
};

export default DebitInfo;
