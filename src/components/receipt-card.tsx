import {useLocalSearchParams} from "expo-router";
import React from 'react';
import Animated, {LinearTransition} from "react-native-reanimated";

import Avatar from "@/components/avatar";
import {calculateFee, calculateTotal, generateId, reverseNumberFormat} from "@/core";
import {useAccount} from "@/core/account";
import { Text, View} from "@/ui";
import CurrencyText from "@/ui/curreny-text";

const ReceiptCard = () => {
    const {amount} = useLocalSearchParams<{ amount: string }>();
    const reciever=useAccount().name
    const transaction={
        amount:reverseNumberFormat(amount),
        fee:calculateFee(amount),
        total:calculateTotal(amount)
    }


    return (
        <View className={'gap-4 rounded border border-neutral-100  p-4'}>
            <View className={' items-center justify-center gap-4'}>
                <Avatar/>
                <View className={'items-center gap-1  '}>
                    <CurrencyText amount={transaction.total}/>
                        <Text className={'font-ubuntu text-sm font-normal text-neutral-700'}>{'Money sent'}</Text>
                </View>
            </View>
            <View className={'gap-2 border-t border-neutral-100 py-4 '}>
                <Animated.View className={'flex-row items-center justify-between '} layout={LinearTransition}>
                    <Text className={'font-ubuntuMedium text-base font-medium  text-charcoal-500'}>Receiver</Text>
                    <Text
                        className={'font-ubuntuMedium font-medium text-charcoal-950'}>{reciever}</Text>
                </Animated.View>
                <Animated.View className={'flex-row items-center justify-between '} layout={LinearTransition}>
                    <Text className={'font-ubuntuMedium text-base font-medium  text-charcoal-500'}>Amount</Text>
                    <CurrencyText amount={transaction.amount} variant={'S'}/>
                </Animated.View>
                <Animated.View className={'flex-row items-center justify-between '} layout={LinearTransition}>
                    <Text className={'font-ubuntuMedium text-base font-medium  text-charcoal-500'}>Fee</Text>
                    <CurrencyText amount={transaction.fee} variant={'S'}/>
                </Animated.View>
                <Animated.View className={'flex-row items-center justify-between'} layout={LinearTransition}>
                    <Text className={'font-ubuntuMedium text-base font-medium  text-charcoal-500'}>Total:</Text>
                    <CurrencyText amount={transaction.total} variant={'S'}/>
                </Animated.View>
            </View>
            <View className={'gap-2 border-t border-neutral-100 py-4 '}>
                <Animated.View className={'flex-row items-center justify-between '} layout={LinearTransition}>
                    <Text className={'font-ubuntuMedium text-base font-medium  text-charcoal-500'}>Transaction ID:</Text>
                    <Text
                        className={'font-ubuntuMedium font-medium text-charcoal-950'}>{generateId()}</Text>
                </Animated.View>
            </View>
        </View>
    );
};

export default ReceiptCard;
