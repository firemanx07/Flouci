import {zodResolver} from '@hookform/resolvers/zod';
import React, {useEffect} from 'react';
import {useForm} from 'react-hook-form';
import {showMessage} from "react-native-flash-message";
import Animated, {useAnimatedStyle, useSharedValue, withTiming} from 'react-native-reanimated';
import {z} from 'zod';

import BadgeButton from "@/components/badge-button";
import BalanceCard from "@/components/balance-card";
import DebitInfo from "@/components/debit-info";
import ProfileSection from "@/components/profile-section";
import {calculateMaxAllowance, formatNumber, useKeyboard} from "@/core";
import {useAccount} from "@/core/account";
import {OPERATION_MAX_VALUE} from "@/core/constants";
import {Button, ControlledNumberInput, NumberPlaceholder, View} from '@/ui';
import {Currency} from "@/ui/icons";
import {KeyboardGestureArea, useReanimatedKeyboardAnimation} from "react-native-keyboard-controller";

const schema = z.object({
    amount: z.string(),
});
type FormType = z.infer<typeof schema>;
export default function SendMoney() {
    const balance = useAccount.use.balance()
    const {control, handleSubmit, watch,setValue} = useForm<FormType>({
        resolver: zodResolver(schema),
    });

    const {keyboardHeight, keyboardShown} = useKeyboard({
        onKeyboardWillShow: (metrics) => {
            animatedHeight.value = withTiming(metrics.height, {duration: 200});
        },
        onKeyboardWillHide: () => {
            animatedHeight.value = withTiming(0);
        }
    });
    const amountValue = watch('amount');
    const animatedHeight = useSharedValue(0);
    useEffect(() => {
        animatedHeight.value = withTiming(keyboardShown ? keyboardHeight : 0);
    }, [animatedHeight, keyboardHeight, keyboardShown]);

    const animatedStyle = useAnimatedStyle(() => ({
        marginBottom: animatedHeight.value,
    }));
    const onSubmit = (data: FormType) => {
        console.log(data);
    };
    const handleBalanceLimit=()=>{
        const maxAllowance = calculateMaxAllowance(balance)
        setValue('amount',formatNumber(maxAllowance))
        showMessage({
            message:'insufficient funds' ,
        })
    }


    return (
        <KeyboardGestureArea interpolator="ios">

            <View className="flex-1 pt-6">
                <ProfileSection/>
                <View className={'flex-1 justify-between p-4 pt-8'}>
                    <View className={'gap-3'}>
                        <BalanceCard balance={balance} amount={amountValue} onBalanceLimitReached={handleBalanceLimit}/>
                        <ControlledNumberInput
                            control={control}
                            label=""
                            name={"amount"}
                            forceRTL={true}
                            placeHolderComponent={<NumberPlaceholder/>}
                            rightAccessory={(size) => <Currency width={size} height={size}/>}
                            keyboardType={'number-pad'}
                            maxValue={OPERATION_MAX_VALUE}
                            onMaxValueReached={()=>{
                                showMessage({
                                    message:'Maximum to send is 2K TND' ,
                                })
                            }}
                        />
                        <DebitInfo amount={amountValue}/>
                    </View>
                    <Animated.View className={'gap-[40px]'} style={[animatedStyle]}>
                        {!keyboardShown && <BadgeButton name={'amount'} control={control}/>}
                        <Button
                            label="Send money"
                            onPress={handleSubmit(onSubmit)}
                            testID="add-post-button"
                            variant={"secondary"}
                            fullWidth
                            disabled={!amountValue}
                            size={"lg"}
                        />
                    </Animated.View>
                </View>
            </View>
        </KeyboardGestureArea>
    );
}
