import React from 'react';
import {colors, Text, View} from "@/ui";
import Avatar from "@/components/avatar";
import {calculateFee, calculateTotal, formatNumber, generateId, maskPhoneNumber, reverseNumberFormat} from "@/core";
import {useLocalSearchParams} from "expo-router";
import CurrencyText from "@/ui/curreny-text";
import Animated, {LinearTransition} from "react-native-reanimated";

const ReceiptCard = () => {
    const {amount} = useLocalSearchParams<{ amount: string }>();
    const transaction={
        amount:reverseNumberFormat(amount),
        fee:calculateFee(amount),
        total:calculateTotal(amount)
    }


    return (
        <View className={'px-4 border rounded border-neutral-100  p-4 gap-4'}>
            <View className={' items-center justify-center gap-4'}>
                <Avatar/>
                <View className={'gap-1 items-center '}>
                    <CurrencyText amount={transaction.total}/>
                        <Text className={'font-ubuntu text-sm font-normal text-neutral-700'}>{'Money sent'}</Text>
                </View>
            </View>
            <View className={'border-t border-neutral-100 py-4 gap-2 '}>
                <Animated.View className={'flex-row items-center justify-between '} layout={LinearTransition}>
                    <Text className={'font-ubuntuMedium font-medium text-base  text-charcoal-500'}>Amount:</Text>
                    <CurrencyText amount={transaction.amount} variant={'S'}/>
                </Animated.View>
                <Animated.View className={'flex-row items-center justify-between '} layout={LinearTransition}>
                    <Text className={'font-ubuntuMedium font-medium text-base  text-charcoal-500'}>Fees:</Text>
                    <CurrencyText amount={transaction.fee} variant={'S'}/>
                </Animated.View>
                <Animated.View className={'flex-row items-center justify-between'} layout={LinearTransition}>
                    <Text className={'font-ubuntuMedium font-medium text-base  text-charcoal-500'}>Total:</Text>
                    <CurrencyText amount={transaction.total} variant={'S'}/>
                </Animated.View>
            </View>
            <View className={'border-t border-neutral-100 py-4 gap-2 '}>
                <Animated.View className={'flex-row items-center justify-between '} layout={LinearTransition}>
                    <Text className={'font-ubuntuMedium font-medium text-base  text-charcoal-500'}>Transaction ID:</Text>
                    <Text
                        className={'font-ubuntuMedium font-medium text-charcoal-950'}>{generateId()}</Text>
                </Animated.View>
            </View>
        </View>
    );
};

export default ReceiptCard;
